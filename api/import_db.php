<?php
// api/import_db.php - Script de instalación automática de la base de datos

$sqlFile = 'C:/xampp/htdocs/GezrelMisaelRiveraMorenoU2/database.sql';

if (!file_exists($sqlFile)) {
    die("Error: No se encontró el archivo database.sql");
}

$sql = file_get_contents($sqlFile);

try {
    $pdo = new PDO('mysql:host=localhost', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Ejecutar las instrucciones SQL
    $pdo->exec($sql);
    
    echo "¡Base de datos 'torneo_relampago' instalada e importada con éxito con los 8 equipos de prueba!";
} catch (PDOException $e) {
    echo "Error al instalar la base de datos: " . $e->getMessage();
}
