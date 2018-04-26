use Biblioteca;
INSERT INTO `TipoRecurso` (`id`,`descripcion`) VALUES (1,'Libro Físico');
INSERT INTO `TipoRecurso` (`id`,`descripcion`) VALUES (2,'Libro Electrónico');
INSERT INTO `TipoRecurso` (`id`,`descripcion`) VALUES (3,'Maqueta');
INSERT INTO `TipoRecurso` (`id`,`descripcion`) VALUES (4,'Disco Óptico');
INSERT INTO `TipoRecurso` (`id`,`descripcion`) VALUES (5,'Computadora');
INSERT INTO `TipoRecurso` (`id`,`descripcion`) VALUES (6,'Revista Física');
INSERT INTO `TipoRecurso` (`id`,`descripcion`) VALUES (7,'Revista Electrónica');
INSERT INTO `TipoRecurso` (`id`,`descripcion`) VALUES (8,'Video');
INSERT INTO `TipoRecurso` (`id`,`descripcion`) VALUES (9,'Audio');


INSERT INTO Estado (descripcion) VALUES ('Nuevo');
INSERT INTO Estado (descripcion) VALUES ('Usado');
INSERT INTO Estado (descripcion) VALUES ('Deteriorado');
INSERT INTO Estado (descripcion) VALUES ('Requiere ser Reemplazado');