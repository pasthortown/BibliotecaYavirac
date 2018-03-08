<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/Recurso.php');
class Controlador_recurso extends Controlador_Base
{
   function crear($args)
   {
      $recurso = new Recurso($args["id"],$args["idTipo"],$args["idAutor"],$args["idCategoria"],$args["idProductora"],$args["codigoISBN"],$args["observaciones"],$args["idEstado"]);
      $sql = "INSERT INTO Recurso (idTipo,idAutor,idCategoria,idProductora,codigoISBN,observaciones,idEstado) VALUES (?,?,?,?,?,?,?);";
      $parametros = array($recurso->idTipo,$recurso->idAutor,$recurso->idCategoria,$recurso->idProductora,$recurso->codigoISBN,$recurso->observaciones,$recurso->idEstado);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $recurso = new Recurso($args["id"],$args["idTipo"],$args["idAutor"],$args["idCategoria"],$args["idProductora"],$args["codigoISBN"],$args["observaciones"],$args["idEstado"]);
      $parametros = array($recurso->idTipo,$recurso->idAutor,$recurso->idCategoria,$recurso->idProductora,$recurso->codigoISBN,$recurso->observaciones,$recurso->idEstado,$recurso->id);
      $sql = "UPDATE Recurso SET idTipo = ?,idAutor = ?,idCategoria = ?,idProductora = ?,codigoISBN = ?,observaciones = ?,idEstado = ? WHERE id = ?;";
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
         $sql = "SELECT * FROM Recurso;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM Recurso WHERE id = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT * FROM Recurso LIMIT $desde,$registrosPorPagina;";
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
            $sql = "SELECT * FROM Recurso WHERE $nombreColumna = ?;";
            break;
         case "inicia":
            $sql = "SELECT * FROM Recurso WHERE $nombreColumna LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT * FROM Recurso WHERE $nombreColumna LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT * FROM Recurso WHERE $nombreColumna LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}