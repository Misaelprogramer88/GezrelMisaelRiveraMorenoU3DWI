<?php
// api/equipos.php - CRUD de Equipos y Jugadores
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $equipoId = isset($_GET['id']) ? intval($_GET['id']) : null;

    if ($equipoId) {
        $stmt = $pdo->prepare("SELECT * FROM equipos WHERE id = ?");
        $stmt->execute([$equipoId]);
        $equipo = $stmt->fetch();

        if (!$equipo) {
            sendResponse(['status' => 'error', 'message' => 'Equipo no encontrado'], 404);
        }

        $stmtJugadores = $pdo->prepare("SELECT * FROM jugadores WHERE equipo_id = ? ORDER BY numero ASC");
        $stmtJugadores->execute([$equipoId]);
        $equipo['jugadores'] = $stmtJugadores->fetchAll();

        sendResponse(['status' => 'success', 'data' => $equipo]);
    } else {
        $stmt = $pdo->query("
            SELECT e.*, COUNT(j.id) as total_jugadores 
            FROM equipos e 
            LEFT JOIN jugadores j ON e.id = j.equipo_id 
            GROUP BY e.id 
            ORDER BY e.id ASC
        ");
        $equipos = $stmt->fetchAll();

        foreach ($equipos as &$eq) {
            $stmtJ = $pdo->prepare("SELECT * FROM jugadores WHERE equipo_id = ? ORDER BY numero ASC");
            $stmtJ->execute([$eq['id']]);
            $eq['jugadores'] = $stmtJ->fetchAll();
        }

        sendResponse(['status' => 'success', 'data' => $equipos]);
    }
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $nombre = trim($input['nombre'] ?? '');
    $color_hex = trim($input['color_hex'] ?? '#00ff87');
    $escudo_icon = trim($input['escudo_icon'] ?? 'shield');
    $jugadores = $input['jugadores'] ?? [];

    if (empty($nombre)) {
        sendResponse(['status' => 'error', 'message' => 'El nombre del equipo es obligatorio'], 400);
    }

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare("INSERT INTO equipos (nombre, color_hex, escudo_icon) VALUES (?, ?, ?)");
        $stmt->execute([$nombre, $color_hex, $escudo_icon]);
        $equipoId = $pdo->lastInsertId();

        if (!empty($jugadores) && is_array($jugadores)) {
            $stmtJ = $pdo->prepare("INSERT INTO jugadores (equipo_id, nombre, numero, posicion) VALUES (?, ?, ?, ?)");
            foreach ($jugadores as $j) {
                $jNombre = trim($j['nombre'] ?? '');
                $jNumero = intval($j['numero'] ?? 0);
                $jPosicion = trim($j['posicion'] ?? 'Delantero');
                if (!empty($jNombre)) {
                    $stmtJ->execute([$equipoId, $jNombre, $jNumero, $jPosicion]);
                }
            }
        }

        $pdo->commit();
        sendResponse(['status' => 'success', 'message' => 'Equipo registrado correctamente', 'id' => $equipoId], 201);
    } catch (\Exception $e) {
        $pdo->rollBack();
        sendResponse(['status' => 'error', 'message' => 'Error al guardar equipo: ' . $e->getMessage()], 500);
    }
}

if ($method === 'DELETE') {
    $equipoId = isset($_GET['id']) ? intval($_GET['id']) : null;

    if (!$equipoId) {
        sendResponse(['status' => 'error', 'message' => 'ID de equipo no especificado'], 400);
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM equipos WHERE id = ?");
        $stmt->execute([$equipoId]);
        sendResponse(['status' => 'success', 'message' => 'Equipo eliminado correctamente']);
    } catch (\Exception $e) {
        sendResponse(['status' => 'error', 'message' => 'Error al eliminar equipo: ' . $e->getMessage()], 500);
    }
}
