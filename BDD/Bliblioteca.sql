DROP DATABASE Biblioteca;
CREATE DATABASE Biblioteca DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

use Biblioteca;

CREATE TABLE Solicitud (
  id INT NOT NULL AUTO_INCREMENT ,
  idPersona INT NOT NULL,
  fechaSolicitud DATETIME NOT NULL ,
  fechaMax DATETIME NOT NULL,
  fechaDevolucion DATETIME NULL,
  PRIMARY KEY (id)
);

CREATE TABLE RecursoDigital (
  id INT NOT NULL AUTO_INCREMENT,
  idRecurso INT NOT NULL,
  tipoArchivo VARCHAR(255) NULL,
  nombreArchivo VARCHAR(255) NULL,
  adjunto LONGBLOB NULL,
  PRIMARY KEY (id) 
) ENGINE myISAM;

CREATE TABLE DetalleSolicitud (
  id INT NOT NULL AUTO_INCREMENT,
  idSolicitud INT NOT NULL,
  idRecurso INT NOT NULL,
  PRIMARY KEY (id)
) ;

CREATE TABLE Recurso (
  id INT NOT NULL AUTO_INCREMENT,
  idTipo INT NOT NULL,
  idAutor INT NULL,
  idCategoria INT NULL,
  idProductora INT NULL,
  titulo VARCHAR (100) NULL,
  codigoISBN VARCHAR(25) NULL,
  descripcion TEXT NULL,
  contenido TEXT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE RecursoTag (
  id INT NOT NULL AUTO_INCREMENT,
  idRecurso INT NULL,
  idTag INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Tag (
  id INT NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE Ejemplar (
  id INT NOT NULL AUTO_INCREMENT,
  codigo VARCHAR(100) NULL,
  idRecurso INT NULL,
  fechaRegistro DATETIME NULL,
  idEstado INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Productora (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  urlWeb VARCHAR(300) NULL,
  PRIMARY KEY (id));


CREATE TABLE Estado (
  id INT NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE CategoriaRecurso (
  id INT NOT NULL AUTO_INCREMENT,
  codigo VARCHAR(20) NOT NULL,
  descripcion VARCHAR(100) NOT NULL,
  codigoPadre VARCHAR(20) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Autor (
  id INT NOT NULL AUTO_INCREMENT,
  nombres VARCHAR(50) NULL,
  apellidos VARCHAR(50) NULL,
  urlWeb VARCHAR(300) NULL,
  PRIMARY KEY (id)
) ;

CREATE TABLE TipoRecurso (
  id INT NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
) ;

CREATE TABLE ComentariosSugerencias (
  id INT NOT NULL AUTO_INCREMENT,
  idPersona INT NOT NULL,
  idRecurso INT NOT NULL,
  fecha DATETIME NOT NULL,
  contenido TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE FotoPortada (
	id INT NOT NULL AUTO_INCREMENT,
  idRecurso INT NULL,
  tipoArchivo VARCHAR(255) NULL,
  nombreArchivo VARCHAR(255) NULL,
  adjunto LONGBLOB NULL,
  PRIMARY KEY (id)
) ENGINE myISAM;

CREATE TABLE LogMailSender (
   id INT NOT NULL AUTO_INCREMENT,
   fecha DATETIME NULL,
   FromEmail VARCHAR(1024) NULL,
   FromAlias VARCHAR(1024) NULL,
   ReplyEmail VARCHAR(1024) NULL,
   ReplyAlias VARCHAR(1024) NULL,
   ToEmail VARCHAR(1024) NULL,
   ToAlias VARCHAR(1024) NULL,
   Asunto VARCHAR(1024) NULL,
   Mensaje TEXT NULL,
   EstadoEnvio VARCHAR(20) NULL,
   PRIMARY KEY (id)
);