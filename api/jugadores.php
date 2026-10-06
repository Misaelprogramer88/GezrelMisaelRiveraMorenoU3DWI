<?php
// api/jugadores.php - Gestión de Jugadores individuales
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $equipoId = isset($_GET['equipo_id']) ? intval($_GET['equipo_id']) : null;
    if ($equipoId) {
        $stmt = $pdo->prepare("SELECT * FROM jugadores WHERE equipo_id = ? ORDER BY numero ASC");
        $stmt->execute([$equipoId]);
    } else {
        $stmt = $pdo->query("SELECT j.*, e.nombre as equipo_nombre, e.color_hex FROM jugadores j JOIN equipos e ON j.equipo_id = e.id ORDER BY e.nombre ASC, j.numero ASC");
    }
    sendResponse(['status' => 'success', 'data' => $stmt->fetchAll()]);
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $equipoId = intval($input['equipo_id'] ?? 0);
    $nombre = trim($input['nombre'] ?? '');
    $numero = intval($input['numero'] ?? 0);
    $posicion = trim($input['posicion'] ?? 'Delantero');

    if (!$equipoId || empty($nombre)) {
        sendResponse(['status' => 'error', 'message' => 'Faltan datos obligatorios (equipo_id y nombre)'], 400);
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO jugadores (equipo_id, nombre, numero, posicion) VALUES (?, ?, ?, ?)");
        $stmt->execute([$equipoId, $nombre, $numero, $posicion]);
        sendResponse(['status' => 'success', 'message' => 'Jugador agregado correctamente', 'id' => $pdo->lastInsertId()], 201);
    } catch (\Exception $e) {
        sendResponse(['status' => 'error', 'message' => 'Error al agregar jugador: ' . $e->getMessage()], 500);
    }
}

if ($method === 'DELETE') {
    $jugadorId = isset($_GET['id']) ? intval($_GET['id']) : null;

    if (!$jugadorId) {
        sendResponse(['status' => 'error', 'message' => 'ID de jugador no especificado'], 400);
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM jugadores WHERE id = ?");
        $stmt->execute([$jugadorId]);
        sendResponse(['status' => 'success', 'message' => 'Jugador eliminado']);
    } catch (\Exception $e) {
        sendResponse(['status' => 'error', 'message' => 'Error al eliminar jugador: ' . $e->getMessage()], 500);
    }
}
