<?php
// api/goleadores.php - Tabla de Máximos Goleadores (Pichichi)
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $stmt = $pdo->query("
        SELECT 
            j.id as jugador_id,
            j.nombre as jugador_nombre,
            j.numero as jugador_numero,
            j.posicion as jugador_posicion,
            e.id as equipo_id,
            e.nombre as equipo_nombre,
            e.color_hex as equipo_color,
            e.escudo_icon as equipo_escudo,
            COUNT(g.id) as total_goles
        FROM goles g
        JOIN jugadores j ON g.jugador_id = j.id
        JOIN equipos e ON g.equipo_id = e.id
        WHERE g.tipo != 'autogol'
        GROUP BY j.id, e.id
        ORDER BY total_goles DESC, j.nombre ASC
    ");
    $goleadores = $stmt->fetchAll();

    sendResponse(['status' => 'success', 'data' => $goleadores]);
}
