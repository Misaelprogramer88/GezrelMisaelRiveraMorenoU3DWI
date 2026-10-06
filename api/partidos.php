<?php
// api/partidos.php - Guardar resultados, penales, avance en el bracket y goles por partido
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $partidoId = isset($_GET['id']) ? intval($_GET['id']) : null;

    if ($partidoId) {
        $stmt = $pdo->prepare("
            SELECT p.*, 
                   e1.nombre as equipo1_nombre, e1.color_hex as equipo1_color, e1.escudo_icon as equipo1_escudo,
                   e2.nombre as equipo2_nombre, e2.color_hex as equipo2_color, e2.escudo_icon as equipo2_escudo,
                   eg.nombre as ganador_nombre
            FROM partidos p
            LEFT JOIN equipos e1 ON p.equipo1_id = e1.id
            LEFT JOIN equipos e2 ON p.equipo2_id = e2.id
            LEFT JOIN equipos eg ON p.ganador_id = eg.id
            WHERE p.id = ?
        ");
        $stmt->execute([$partidoId]);
        $partido = $stmt->fetch();

        if (!$partido) {
            sendResponse(['status' => 'error', 'message' => 'Partido no encontrado'], 404);
        }

        $stmtG = $pdo->prepare("
            SELECT g.*, j.nombre as jugador_nombre, j.numero as jugador_numero, e.nombre as equipo_nombre
            FROM goles g
            JOIN jugadores j ON g.jugador_id = j.id
            JOIN equipos e ON g.equipo_id = e.id
            WHERE g.partido_id = ?
            ORDER BY g.minuto ASC
        ");
        $stmtG->execute([$partidoId]);
        $partido['goles_registrados'] = $stmtG->fetchAll();

        sendResponse(['status' => 'success', 'data' => $partido]);
    } else {
        $stmt = $pdo->query("
            SELECT p.*, 
                   e1.nombre as equipo1_nombre, e1.color_hex as equipo1_color, e1.escudo_icon as equipo1_escudo,
                   e2.nombre as equipo2_nombre, e2.color_hex as equipo2_color, e2.escudo_icon as equipo2_escudo,
                   eg.nombre as ganador_nombre
            FROM partidos p
            LEFT JOIN equipos e1 ON p.equipo1_id = e1.id
            LEFT JOIN equipos e2 ON p.equipo2_id = e2.id
            LEFT JOIN equipos eg ON p.ganador_id = eg.id
            ORDER BY p.ronda ASC, p.id ASC
        ");
        sendResponse(['status' => 'success', 'data' => $stmt->fetchAll()]);
    }
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $action = $input['action'] ?? 'guardar_resultado';

    if ($action === 'guardar_resultado') {
        $partidoId = intval($input['partido_id'] ?? 0);
        $goles1 = intval($input['goles_equipo1'] ?? 0);
        $goles2 = intval($input['goles_equipo2'] ?? 0);
        $penales1 = isset($input['penales_equipo1']) ? intval($input['penales_equipo1']) : null;
        $penales2 = isset($input['penales_equipo2']) ? intval($input['penales_equipo2']) : null;
        $goleadores = $input['goleadores'] ?? [];

        if (!$partidoId) {
            sendResponse(['status' => 'error', 'message' => 'ID de partido no válido'], 400);
        }

        $stmtP = $pdo->prepare("SELECT * FROM partidos WHERE id = ?");
        $stmtP->execute([$partidoId]);
        $partido = $stmtP->fetch();

        if (!$partido) {
            sendResponse(['status' => 'error', 'message' => 'El partido especificado no existe'], 404);
        }

        if (empty($partido['equipo1_id']) || empty($partido['equipo2_id'])) {
            sendResponse(['status' => 'error', 'message' => 'No se puede jugar un partido sin ambos equipos clasificados'], 400);
        }

        $ganadorId = null;
        if ($goles1 > $goles2) {
            $ganadorId = $partido['equipo1_id'];
        } elseif ($goles2 > $goles1) {
            $ganadorId = $partido['equipo2_id'];
        } else {
            if ($penales1 === null || $penales2 === null || $penales1 === $penales2) {
                sendResponse(['status' => 'error', 'message' => 'En caso de empate se debe definir un ganador mediante la tanda de penales con puntuación diferente'], 400);
            }
            $ganadorId = ($penales1 > $penales2) ? $partido['equipo1_id'] : $partido['equipo2_id'];
        }

        try {
            $pdo->beginTransaction();

            $stmtUpd = $pdo->prepare("
                UPDATE partidos 
                SET goles_equipo1 = ?, goles_equipo2 = ?, penales_equipo1 = ?, penales_equipo2 = ?, ganador_id = ?, estado = 'jugado' 
                WHERE id = ?
            ");
            $stmtUpd->execute([$goles1, $goles2, $penales1, $penales2, $ganadorId, $partidoId]);

            $pdo->prepare("DELETE FROM goles WHERE partido_id = ?")->execute([$partidoId]);
            if (!empty($goleadores) && is_array($goleadores)) {
                $stmtGol = $pdo->prepare("INSERT INTO goles (partido_id, jugador_id, equipo_id, minuto, tipo) VALUES (?, ?, ?, ?, ?)");
                foreach ($goleadores as $g) {
                    $jId = intval($g['jugador_id'] ?? 0);
                    $eId = intval($g['equipo_id'] ?? 0);
                    $min = intval($g['minuto'] ?? 0);
                    $tipo = trim($g['tipo'] ?? 'normal');
                    if ($jId && $eId) {
                        $stmtGol->execute([$partidoId, $jId, $eId, $min, $tipo]);
                    }
                }
            }

            if (!empty($partido['siguiente_partido_id'])) {
                $sigId = $partido['siguiente_partido_id'];
                $posSig = $partido['posicion_siguiente'];

                if ($posSig === 'equipo1') {
                    $stmtProm = $pdo->prepare("UPDATE partidos SET equipo1_id = ? WHERE id = ?");
                    $stmtProm->execute([$ganadorId, $sigId]);
                } else {
                    $stmtProm = $pdo->prepare("UPDATE partidos SET equipo2_id = ? WHERE id = ?");
                    $stmtProm->execute([$ganadorId, $sigId]);
                }
            }

            if ($partido['fase_nombre'] === 'Gran Final') {
                $stmtCamp = $pdo->prepare("UPDATE torneos SET estado = 'finalizado', campeon_id = ? WHERE id = ?");
                $stmtCamp->execute([$ganadorId, $partido['torneo_id']]);
            }

            $pdo->commit();
            sendResponse(['status' => 'success', 'message' => 'Resultado del partido guardado correctamente', 'ganador_id' => $ganadorId]);
        } catch (\Exception $e) {
            $pdo->rollBack();
            sendResponse(['status' => 'error', 'message' => 'Error al guardar resultado: ' . $e->getMessage()], 500);
        }
    }
}
