-- ========================================================
-- Base de Datos para Aplicación "Torneo Relámpago"
-- Servidor: MySQL / MariaDB (XAMPP)
-- ========================================================

CREATE DATABASE IF NOT EXISTS `torneo_relampago` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `torneo_relampago`;

-- Desactivar llaves foráneas para limpieza
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `goles`;
DROP TABLE IF EXISTS `partidos`;
DROP TABLE IF EXISTS `torneos`;
DROP TABLE IF EXISTS `jugadores`;
DROP TABLE IF EXISTS `equipos`;
SET FOREIGN_KEY_CHECKS = 1;

-- --------------------------------------------------------
-- Tabla `equipos`
-- --------------------------------------------------------
CREATE TABLE `equipos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(100) NOT NULL,
  `color_hex` VARCHAR(7) NOT NULL DEFAULT '#00ff87',
  `escudo_icon` VARCHAR(50) NOT NULL DEFAULT 'shield',
  `creado_en` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla `jugadores`
-- --------------------------------------------------------
CREATE TABLE `jugadores` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `equipo_id` INT NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `numero` INT NOT NULL,
  `posicion` VARCHAR(50) DEFAULT 'Delantero',
  FOREIGN KEY (`equipo_id`) REFERENCES `equipos`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla `torneos`
-- --------------------------------------------------------
CREATE TABLE `torneos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(100) NOT NULL,
  `estado` ENUM('registro', 'en_curso', 'finalizado') DEFAULT 'registro',
  `campeon_id` INT NULL,
  `creado_en` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`campeon_id`) REFERENCES `equipos`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla `partidos`
-- --------------------------------------------------------
CREATE TABLE `partidos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `torneo_id` INT NOT NULL,
  `ronda` INT NOT NULL DEFAULT 1,
  `fase_nombre` VARCHAR(50) NOT NULL,
  `equipo1_id` INT NULL,
  `equipo2_id` INT NULL,
  `goles_equipo1` INT NULL,
  `goles_equipo2` INT NULL,
  `penales_equipo1` INT NULL,
  `penales_equipo2` INT NULL,
  `ganador_id` INT NULL,
  `siguiente_partido_id` INT NULL,
  `posicion_siguiente` ENUM('equipo1', 'equipo2') NULL,
  `estado` ENUM('pendiente', 'jugado') DEFAULT 'pendiente',
  `fecha_programada` DATETIME NULL,
  FOREIGN KEY (`torneo_id`) REFERENCES `torneos`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`equipo1_id`) REFERENCES `equipos`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`equipo2_id`) REFERENCES `equipos`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`ganador_id`) REFERENCES `equipos`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`siguiente_partido_id`) REFERENCES `partidos`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla `goles`
-- --------------------------------------------------------
CREATE TABLE `goles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `partido_id` INT NOT NULL,
  `jugador_id` INT NOT NULL,
  `equipo_id` INT NOT NULL,
  `minuto` INT DEFAULT 0,
  `tipo` ENUM('normal', 'penal', 'autogol') DEFAULT 'normal',
  FOREIGN KEY (`partido_id`) REFERENCES `partidos`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`jugador_id`) REFERENCES `jugadores`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`equipo_id`) REFERENCES `equipos`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Datos de prueba iniciales (8 Equipos con Plantillas)
-- --------------------------------------------------------

INSERT INTO `equipos` (`id`, `nombre`, `color_hex`, `escudo_icon`) VALUES
(1, 'Rayo Vallecano FC', '#ff0055', 'zap'),
(2, 'Los Galácticos FC', '#00d2ff', 'star'),
(3, 'Pumas del Norte', '#ffaa00', 'target'),
(4, 'Atlético San Pancho', '#00ff87', 'shield'),
(5, 'Tigres del Barrio', '#ff5500', 'flame'),
(6, 'Deportivo Huracán', '#9d00ff', 'wind'),
(7, 'Real Bañil', '#e2e8f0', 'award'),
(8, 'Vikingos FC', '#0070f3', 'compass');

INSERT INTO `jugadores` (`equipo_id`, `nombre`, `numero`, `posicion`) VALUES
-- Rayo Vallecano FC
(1, 'Carlos "La Joya" Gómez', 10, 'Delantero'),
(1, 'Mateo Hernández', 9, 'Delantero'),
(1, 'Lucas Morales', 7, 'Medio'),
(1, 'Santiago Ruiz', 4, 'Defensa'),
(1, 'Diego "Muro" López', 1, 'Portero'),

-- Los Galácticos FC
(2, 'Alejandro "CR7" Silva', 7, 'Delantero'),
(2, 'Gabriel Mendoza', 10, 'Medio'),
(2, 'Rodrigo Torres', 11, 'Delantero'),
(2, 'Adrián Castro', 3, 'Defensa'),
(2, 'Esteban Ramos', 1, 'Portero'),

-- Pumas del Norte
(3, 'Javier "Chicharito" Pérez', 9, 'Delantero'),
(3, 'Oscar Vargas', 8, 'Medio'),
(3, 'Fernando Aguilar', 14, 'Medio'),
(3, 'Hugo Benítez', 2, 'Defensa'),
(3, 'Manuel Castillo', 12, 'Portero'),

-- Atlético San Pancho
(4, 'Daniel "Donas" Guerrero', 10, 'Delantero'),
(4, 'Kevin Fernández', 11, 'Delantero'),
(4, 'Jorge "Koke" Navarro', 6, 'Medio'),
(4, 'Alan Martínez', 5, 'Defensa'),
(4, 'Roberto "Araña" Guzmán', 1, 'Portero'),

-- Tigres del Barrio
(5, 'Iván "Tigre" Ramírez', 9, 'Delantero'),
(5, 'Sebastián Delgado', 7, 'Delantero'),
(5, 'Emilio "Samba" Flores', 10, 'Medio'),
(5, 'César Ortiz', 4, 'Defensa'),
(5, 'Marcos "Porterazo" Reyes', 1, 'Portero'),

-- Deportivo Huracán
(6, 'Gonzalo "Rayo" Varela', 11, 'Delantero'),
(6, 'Leonardo Blanco', 8, 'Medio'),
(6, 'Andrés "Zurdo" Molina', 10, 'Medio'),
(6, 'Erick Jiménez', 3, 'Defensa'),
(6, 'Martín Peña', 1, 'Portero'),

-- Real Bañil
(7, 'Felipe "Maestro" Cabrera', 10, 'Medio'),
(7, 'Julio "Tanque" Paredes', 9, 'Delantero'),
(7, 'David Salazar', 7, 'Delantero'),
(7, 'Samuel Rivas', 5, 'Defensa'),
(7, 'Tomás "Gato" Medina', 1, 'Portero'),

-- Vikingos FC
(8, 'Bjorn "Vikingo" Hansen', 9, 'Delantero'),
(8, 'Ignacio "Acha" Romero', 4, 'Defensa'),
(8, 'Raúl "Martillo" Suazo', 8, 'Medio'),
(8, 'Vicente Cruz', 11, 'Delantero'),
(8, 'Héctor "Guardián" Acosta', 1, 'Portero');

-- Torneo Inicial por defecto
INSERT INTO `torneos` (`id`, `nombre`, `estado`) VALUES
(1, 'Torneo Relámpago Apertura 2026', 'registro');
