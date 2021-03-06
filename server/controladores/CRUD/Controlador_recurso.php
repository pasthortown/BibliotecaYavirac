<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/Recurso.php');
class Controlador_recurso extends Controlador_Base
{
   function crear($args)
   {
      $recurso = new Recurso($args["id"],$args["idTipo"],$args["idAutor"],$args["idCategoria"],$args["idProductora"],$args["titulo"],$args["codigoISBN"],$args["descripcion"],$args["contenido"], $args["fecha"], $args["idPaisPublicacion"], $args["ciudadPublicacion"]);
      $sql = "INSERT INTO Recurso (idTipo,idAutor,idCategoria,idProductora,titulo,codigoISBN,descripcion,contenido, fecha, idPaisPublicacion, ciudadPublicacion) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
      $fechaRegistroNoSQLTime = strtotime($recurso->fecha);
      $fechaRegistroSQLTime = date("Y-m-d H:i:s", $fechaRegistroNoSQLTime);
      $recurso->fecha = $fechaRegistroSQLTime;
      $parametros = array($recurso->idTipo,$recurso->idAutor,$recurso->idCategoria,$recurso->idProductora,$recurso->titulo,$recurso->codigoISBN,$recurso->descripcion,$recurso->contenido,$recurso->fecha,$recurso->idPaisPublicacion,$recurso->ciudadPublicacion);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $recurso = new Recurso($args["id"],$args["idTipo"],$args["idAutor"],$args["idCategoria"],$args["idProductora"],$args["titulo"],$args["codigoISBN"],$args["descripcion"],$args["contenido"],$args["fecha"], $args["idPaisPublicacion"], $args["ciudadPublicacion"]);
      $fechaRegistroNoSQLTime = strtotime($recurso->fecha);
      $fechaRegistroSQLTime = date("Y-m-d H:i:s", $fechaRegistroNoSQLTime);
      $recurso->fecha = $fechaRegistroSQLTime;
      $parametros = array($recurso->idTipo,$recurso->idAutor,$recurso->idCategoria,$recurso->idProductora,$recurso->titulo,$recurso->codigoISBN,$recurso->descripcion,$recurso->contenido,$recurso->fecha,$recurso->idPaisPublicacion,$recurso->ciudadPublicacion,$recurso->id);
      $sql = "UPDATE Recurso SET idTipo = ?,idAutor = ?,idCategoria = ?,idProductora = ?,titulo = ?,codigoISBN = ?,descripcion = ?,contenido = ?,fecha = ?,idPaisPublicacion = ?,ciudadPublicacion = ? WHERE id = ?;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function borrar($args)
   {
      $id = $args["id"];
      $parametros = array($id);
      $sql = "DELETE FROM Recurso WHERE id = ?;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function leer($args)
   {
      $id = $args["id"];
      if ($id==""){
         $sql = "SELECT Recurso.*, CONCAT(Autor.apellidos, ' ', Autor.nombres) as 'Autor', Productora.nombre as 'Productora', CategoriaRecurso.codigo as 'Codigo', CategoriaRecurso.descripcion as 'Categoria', TipoRecurso.descripcion as 'TipoRecurso', CONCAT(CategoriaRecurso.codigo,', ', Autor.apellidos,', ', Autor.nombres, ' (', YEAR(Recurso.fecha), '). ', Recurso.titulo, '. (', Recurso.ciudadPublicacion, ').') as 'Bibliografia' FROM Recurso INNER JOIN Autor ON Recurso.idAutor = Autor.id INNER JOIN Productora ON Recurso.idProductora = Productora.id INNER JOIN CategoriaRecurso ON Recurso.idCategoria = CategoriaRecurso.id INNER JOIN TipoRecurso ON Recurso.idTipo = TipoRecurso.id ORDER BY Recurso.titulo ASC;";
      }else{
      $parametros = array($id);
         $sql = "SELECT Recurso.*, CONCAT(Autor.apellidos, ' ', Autor.nombres) as 'Autor', Productora.nombre as 'Productora', CategoriaRecurso.codigo as 'Codigo', CategoriaRecurso.descripcion as 'Categoria', TipoRecurso.descripcion as 'TipoRecurso', CONCAT(CategoriaRecurso.codigo,', ', Autor.apellidos,', ', Autor.nombres, ' (', YEAR(Recurso.fecha), '). ', Recurso.titulo, '. (', Recurso.ciudadPublicacion, ').') as 'Bibliografia' FROM Recurso INNER JOIN Autor ON Recurso.idAutor = Autor.id INNER JOIN Productora ON Recurso.idProductora = Productora.id INNER JOIN CategoriaRecurso ON Recurso.idCategoria = CategoriaRecurso.id INNER JOIN TipoRecurso ON Recurso.idTipo = TipoRecurso.id WHERE Recurso.id = ? ORDER BY Recurso.titulo ASC;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT Recurso.*, CONCAT(Autor.apellidos, ' ', Autor.nombres) as 'Autor', Productora.nombre as 'Productora', CategoriaRecurso.codigo as 'Codigo', CategoriaRecurso.descripcion as 'Categoria', TipoRecurso.descripcion as 'TipoRecurso', CONCAT(CategoriaRecurso.codigo,', ', Autor.apellidos,', ', Autor.nombres, ' (', YEAR(Recurso.fecha), '). ', Recurso.titulo, '. (', Recurso.ciudadPublicacion, ').') as 'Bibliografia' FROM Recurso INNER JOIN Autor ON Recurso.idAutor = Autor.id INNER JOIN Productora ON Recurso.idProductora = Productora.id INNER JOIN CategoriaRecurso ON Recurso.idCategoria = CategoriaRecurso.id INNER JOIN TipoRecurso ON Recurso.idTipo = TipoRecurso.id ORDER BY Recurso.titulo ASC LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($args)
   {
      $registrosPorPagina = $args["registros_por_pagina"];
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM Recurso;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta[0];
   }

   function leer_filtrado($args)
   {
      $nombreColumna = $args["columna"];
      $tipoFiltro = $args["tipo_filtro"];
      $filtro = $args["filtro"];
      switch ($tipoFiltro){
         case "coincide":
            $parametros = array($filtro);
            $sql = "SELECT Recurso.*, CONCAT(Autor.apellidos, ' ', Autor.nombres) as 'Autor', Productora.nombre as 'Productora', CategoriaRecurso.codigo as 'Codigo', CategoriaRecurso.descripcion as 'Categoria', TipoRecurso.descripcion as 'TipoRecurso', CONCAT(CategoriaRecurso.codigo,', ', Autor.apellidos,', ', Autor.nombres, ' (', YEAR(Recurso.fecha), '). ', Recurso.titulo, '. (', Recurso.ciudadPublicacion, ').') as 'Bibliografia' FROM Recurso INNER JOIN Autor ON Recurso.idAutor = Autor.id INNER JOIN Productora ON Recurso.idProductora = Productora.id INNER JOIN CategoriaRecurso ON Recurso.idCategoria = CategoriaRecurso.id INNER JOIN TipoRecurso ON Recurso.idTipo = TipoRecurso.id WHERE $nombreColumna = ? ORDER BY Recurso.titulo ASC;";
            break;
         case "inicia":
            $sql = "SELECT Recurso.*, CONCAT(Autor.apellidos, ' ', Autor.nombres) as 'Autor', Productora.nombre as 'Productora', CategoriaRecurso.codigo as 'Codigo', CategoriaRecurso.descripcion as 'Categoria', TipoRecurso.descripcion as 'TipoRecurso', CONCAT(CategoriaRecurso.codigo,', ', Autor.apellidos,', ', Autor.nombres, ' (', YEAR(Recurso.fecha), '). ', Recurso.titulo, '. (', Recurso.ciudadPublicacion, ').') as 'Bibliografia' FROM Recurso INNER JOIN Autor ON Recurso.idAutor = Autor.id INNER JOIN Productora ON Recurso.idProductora = Productora.id INNER JOIN CategoriaRecurso ON Recurso.idCategoria = CategoriaRecurso.id INNER JOIN TipoRecurso ON Recurso.idTipo = TipoRecurso.id WHERE $nombreColumna ORDER BY Recurso.titulo ASC LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT Recurso.*, CONCAT(Autor.apellidos, ' ', Autor.nombres) as 'Autor', Productora.nombre as 'Productora', CategoriaRecurso.codigo as 'Codigo', CategoriaRecurso.descripcion as 'Categoria', TipoRecurso.descripcion as 'TipoRecurso', CONCAT(CategoriaRecurso.codigo,', ', Autor.apellidos,', ', Autor.nombres, ' (', YEAR(Recurso.fecha), '). ', Recurso.titulo, '. (', Recurso.ciudadPublicacion, ').') as 'Bibliografia' FROM Recurso INNER JOIN Autor ON Recurso.idAutor = Autor.id INNER JOIN Productora ON Recurso.idProductora = Productora.id INNER JOIN CategoriaRecurso ON Recurso.idCategoria = CategoriaRecurso.id INNER JOIN TipoRecurso ON Recurso.idTipo = TipoRecurso.id WHERE $nombreColumna ORDER BY Recurso.titulo ASC LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT Recurso.*, CONCAT(Autor.apellidos, ' ', Autor.nombres) as 'Autor', Productora.nombre as 'Productora', CategoriaRecurso.codigo as 'Codigo', CategoriaRecurso.descripcion as 'Categoria', TipoRecurso.descripcion as 'TipoRecurso', CONCAT(CategoriaRecurso.codigo,', ', Autor.apellidos,', ', Autor.nombres, ' (', YEAR(Recurso.fecha), '). ', Recurso.titulo, '. (', Recurso.ciudadPublicacion, ').') as 'Bibliografia' FROM Recurso INNER JOIN Autor ON Recurso.idAutor = Autor.id INNER JOIN Productora ON Recurso.idProductora = Productora.id INNER JOIN CategoriaRecurso ON Recurso.idCategoria = CategoriaRecurso.id INNER JOIN TipoRecurso ON Recurso.idTipo = TipoRecurso.id WHERE $nombreColumna ORDER BY Recurso.titulo ASC LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function buscar($args) {
      $filtro = $args["filtro"];
      $filtro = strtoupper($filtro);
      $sql = "SELECT DISTINCT Recurso.*, CONCAT(Autor.apellidos, ' ', Autor.nombres) as 'Autor', Productora.nombre as 'Productora', CategoriaRecurso.codigo as 'Codigo', CategoriaRecurso.descripcion as 'Categoria', TipoRecurso.descripcion as 'TipoRecurso', CONCAT(CategoriaRecurso.codigo,', ', Autor.apellidos,', ', Autor.nombres, ' (', YEAR(Recurso.fecha), '). ', Recurso.titulo, '. (', Recurso.ciudadPublicacion, ').') as 'Bibliografia' FROM Recurso INNER JOIN Autor ON Recurso.idAutor = Autor.id INNER JOIN Productora ON Recurso.idProductora = Productora.id INNER JOIN CategoriaRecurso ON Recurso.idCategoria = CategoriaRecurso.id INNER JOIN TipoRecurso ON Recurso.idTipo = TipoRecurso.id INNER JOIN RecursoTag ON RecursoTag.idRecurso = Recurso.id INNER JOIN Tag ON Tag.id = RecursoTag.idTag WHERE (UPPER(Recurso.titulo) like '%$filtro%') OR (UPPER(Recurso.descripcion) like '%$filtro%') OR (UPPER(Recurso.contenido) like '%$filtro%') OR (UPPER(Autor.nombres) like '%$filtro%') OR (UPPER(Autor.apellidos) like '%$filtro%') OR (UPPER(Tag.descripcion) like '%$filtro%') ORDER BY Recurso.titulo ASC;";
      $parametros = array($filtro);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function existeEjemplar($args) {
      $sql = "SELECT idRecurso, count(idRecurso) as 'Ejemplares' FROM Ejemplar GROUP BY idRecurso;";
      $parametros = array();
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function pedidos($args) {
      $sql = "SELECT idRecurso, count(idRecurso) as 'Ejemplares' FROM DetalleSolicitud INNER JOIN Solicitud ON DetalleSolicitud.idSolicitud = Solicitud.id WHERE YEAR(Solicitud.fechaDevolucion)=1969 GROUP BY idRecurso;";
      $parametros = array();
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}