<?php
// api/torneo.php - Gestión del Torneo y Generación de Llaves (Bracket)
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $stmt = $pdo->query("
        SELECT t.*, e.nombre as campeon_nombre, e.color_hex as campeon_color 
        FROM torneos t 
        LEFT JOIN equipos e ON t.campeon_id = e.id 
        ORDER BY t.id DESC LIMIT 1
    ");
    $torneo = $stmt->fetch();

    if (!$torneo) {
        $pdo->query("INSERT INTO torneos (nombre, estado) VALUES ('Torneo Relámpago Apertura 2026', 'registro')");
        $stmt = $pdo->query("SELECT * FROM torneos ORDER BY id DESC LIMIT 1");
        $torneo = $stmt->fetch();
    }

    $stmtEquipos = $pdo->query("SELECT COUNT(*) as total FROM equipos");
    $totalEquipos = $stmtEquipos->fetch()['total'];

    $partidos = [];
    if ($torneo['estado'] !== 'registro') {
        $stmtP = $pdo->prepare("
            SELECT 
                p.*,
                e1.nombre as equipo1_nombre, e1.color_hex as equipo1_color, e1.escudo_icon as equipo1_escudo,
                e2.nombre as equipo2_nombre, e2.color_hex as equipo2_color, e2.escudo_icon as equipo2_escudo,
                eg.nombre as ganador_nombre
            FROM partidos p
            LEFT JOIN equipos e1 ON p.equipo1_id = e1.id
            LEFT JOIN equipos e2 ON p.equipo2_id = e2.id
            LEFT JOIN equipos eg ON p.ganador_id = eg.id
            WHERE p.torneo_id = ?
            ORDER BY p.ronda ASC, p.id ASC
        ");
        $stmtP->execute([$torneo['id']]);
        $rawPartidos = $stmtP->fetchAll();

        foreach ($rawPartidos as $pt) {
            $rondaKey = $pt['fase_nombre'];
            if (!isset($partidos[$rondaKey])) {
                $partidos[$rondaKey] = [];
            }
            $partidos[$rondaKey][] = $pt;
        }
    }

    sendResponse([
        'status' => 'success',
        'torneo' => $torneo,
        'total_equipos' => $totalEquipos,
        'bracket' => $partidos
    ]);
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $action = $input['action'] ?? '';

    $stmtTorneo = $pdo->query("SELECT * FROM torneos ORDER BY id DESC LIMIT 1");
    $torneo = $stmtTorneo->fetch();
    $torneoId = $torneo['id'];

    if ($action === 'iniciar') {
        $stmtE = $pdo->query("SELECT id, nombre FROM equipos");
        $equipos = $stmtE->fetchAll();
        $numEquipos = count($equipos);

        if ($numEquipos < 4) {
            sendResponse(['status' => 'error', 'message' => 'Se requieren al menos 4 equipos para iniciar el torneo.'], 400);
        }

        if ($numEquipos >= 8) {
            $numEquipos = 8;
        } else {
            $numEquipos = 4;
        }

        shuffle($equipos);
        $equiposParticipantes = array_slice($equipos, 0, $numEquipos);

        try {
            $pdo->beginTransaction();

            $pdo->prepare("DELETE FROM goles WHERE partido_id IN (SELECT id FROM partidos WHERE torneo_id = ?)")->execute([$torneoId]);
            $pdo->prepare("DELETE FROM partidos WHERE torneo_id = ?")->execute([$torneoId]);

            if ($numEquipos === 8) {
                // ESTRUCTURA DE 8 EQUIPOS (3 RONDAS: Cuartos, Semifinales, Gran Final)
                $stmtIns = $pdo->prepare("INSERT INTO partidos (torneo_id, ronda, fase_nombre, estado) VALUES (?, 3, 'Gran Final', 'pendiente')");
                $stmtIns->execute([$torneoId]);
                $finalId = $pdo->lastInsertId();

                $stmtIns = $pdo->prepare("INSERT INTO partidos (torneo_id, ronda, fase_nombre, siguiente_partido_id, posicion_siguiente, estado) VALUES (?, 2, 'Semifinal', ?, ?, 'pendiente')");
                
                $stmtIns->execute([$torneoId, $finalId, 'equipo1']);
                $semi1Id = $pdo->lastInsertId();

                $stmtIns->execute([$torneoId, $finalId, 'equipo2']);
                $semi2Id = $pdo->lastInsertId();

                $stmtCuartos = $pdo->prepare("INSERT INTO partidos (torneo_id, ronda, fase_nombre, equipo1_id, equipo2_id, siguiente_partido_id, posicion_siguiente, estado) VALUES (?, 1, 'Cuartos de Final', ?, ?, ?, ?, 'pendiente')");

                $stmtCuartos->execute([$torneoId, $equiposParticipantes[0]['id'], $equiposParticipantes[1]['id'], $semi1Id, 'equipo1']);
                $stmtCuartos->execute([$torneoId, $equiposParticipantes[2]['id'], $equiposParticipantes[3]['id'], $semi1Id, 'equipo2']);
                $stmtCuartos->execute([$torneoId, $equiposParticipantes[4]['id'], $equiposParticipantes[5]['id'], $semi2Id, 'equipo1']);
                $stmtCuartos->execute([$torneoId, $equiposParticipantes[6]['id'], $equiposParticipantes[7]['id'], $semi2Id, 'equipo2']);

            } else {
                // ESTRUCTURA DE 4 EQUIPOS
                $stmtIns = $pdo->prepare("INSERT INTO partidos (torneo_id, ronda, fase_nombre, estado) VALUES (?, 2, 'Gran Final', 'pendiente')");
                $stmtIns->execute([$torneoId]);
                $finalId = $pdo->lastInsertId();

                $stmtSemis = $pdo->prepare("INSERT INTO partidos (torneo_id, ronda, fase_nombre, equipo1_id, equipo2_id, siguiente_partido_id, posicion_siguiente, estado) VALUES (?, 1, 'Semifinal', ?, ?, ?, ?, 'pendiente')");

                $stmtSemis->execute([$torneoId, $equiposParticipantes[0]['id'], $equiposParticipantes[1]['id'], $finalId, 'equipo1']);
                $stmtSemis->execute([$torneoId, $equiposParticipantes[2]['id'], $equiposParticipantes[3]['id'], $finalId, 'equipo2']);
            }

            $stmtUpd = $pdo->prepare("UPDATE torneos SET estado = 'en_curso', campeon_id = NULL WHERE id = ?");
            $stmtUpd->execute([$torneoId]);

            $pdo->commit();
            sendResponse(['status' => 'success', 'message' => "Torneo iniciado con éxito con $numEquipos equipos en sorteo aleatorio!"]);
        } catch (\Exception $e) {
            $pdo->rollBack();
            sendResponse(['status' => 'error', 'message' => 'Error al generar el torneo: ' . $e->getMessage()], 500);
        }
    }

    if ($action === 'reiniciar') {
        try {
            $pdo->beginTransaction();
            $pdo->prepare("DELETE FROM goles WHERE partido_id IN (SELECT id FROM partidos WHERE torneo_id = ?)")->execute([$torneoId]);
            $pdo->prepare("DELETE FROM partidos WHERE torneo_id = ?")->execute([$torneoId]);
            $pdo->prepare("UPDATE torneos SET estado = 'registro', campeon_id = NULL WHERE id = ?")->execute([$torneoId]);
            $pdo->commit();

            sendResponse(['status' => 'success', 'message' => 'Torneo reiniciado correctamente.']);
        } catch (\Exception $e) {
            $pdo->rollBack();
            sendResponse(['status' => 'error', 'message' => 'Error al reiniciar el torneo: ' . $e->getMessage()], 500);
        }
    }

    sendResponse(['status' => 'error', 'message' => 'Acción no válida'], 400);
}
