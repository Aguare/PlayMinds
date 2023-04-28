CREATE DATABASE play_minds;
CREATE USER 'minds'@'localhost' IDENTIFIED BY 'minds.123';
GRANT ALL PRIVILEGES ON play_minds .* TO 'minds'@'localhost';
USE play_minds;


CREATE TABLE insignea(
    id_insignea INT PRIMARY KEY AUTO_INCREMENT,
    nombre      VARCHAR(150)
);

CREATE TABLE usuario(
    correo VARCHAR(45) PRIMARY KEY NOT NULL,
    nombre VARCHAR(150),
    pass   VARCHAR(100),
    rol    ENUM('PROFESOR','ALUMNO','ADMIN'),
    punteo INT,
);

CREATE TABLE insignea_usuarios(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(45),
    fecha   DATE,
    correo VARCHAR(45),
    FOREIGN KEY (correo) REFERENCES usuario(correo)
);

CREATE TABLE etiqueta(
    id_etiqueta INT PRIMARY KEY AUTO_INCREMENT,
    nombre_etiqueta VARCHAR(45)
);

CREATE TABLE juego(
    id_juego VARCHAR(45) PRIMARY KEY,
    nombre   VARCHAR(45),
    tipo    ENUM('MEMORIA','AHORCADO','TARJETA','QUIZ')
    descripcion VARCHAR(400)
);

CREATE TABLE etiqueta_juego (
    id_etiqueta INT PRIMARY KEY AUTO_INCREMENT,
    nombre_etiqueta VARCHAR(45),
    id_juego VARCHAR(45),
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego) 
);

CREATE TABLE juego_realizado(
    id_juego_realizado INT PRIMARY KEY AUTO_INCREMENT,
    punteo INT,
    correo VARCHAR(45),
    id_juego VARCHAR(45),
    FOREIGN KEY (correo) REFERENCES usuario(correo),
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego)  
);

CREATE TABLE imagen(
    id_imagen INT PRIMARY KEY AUTO_INCREMENT,
    direccion_img VARCHAR(150),
    id_juego VARCHAR(45),
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego)  
);

CREATE TABLE frase(
    id_frase INT PRIMARY KEY AUTO_INCREMENT,
    frase VARCHAR(400),
    id_juego VARCHAR(45),
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego)  
);

CREATE TABLE pregunta(
    id_pregunta INT PRIMARY KEY AUTO_INCREMENT,
    pregunta VARCHAR(100),
    id_juego VARCHAR(45),
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego)
);

CREATE TABLE respuesta(
    id_respuesta INT PRIMARY KEY AUTO_INCREMENT,
    respuesta VARCHAR(100),
    tipo      ENUM('CORRECTA','INCORRECTA'),
    id_pregunta   INT,
    FOREIGN KEY (id_pregunta) REFERENCES pregunta(id_pregunta)
);
