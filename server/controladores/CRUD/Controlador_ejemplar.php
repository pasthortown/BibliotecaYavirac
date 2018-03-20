<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/Ejemplar.php');
class Controlador_ejemplar extends Controlador_Base
{
   function crear($args)
   {
      $ejemplar = new Ejemplar($args["id"],$args["codigo"],$args["idRecurso"],$args["fechaRegistro"],$args["idEstado"]);
      $sql = "INSERT INTO Ejemplar (codigo,idRecurso,fechaRegistro,idEstado) VALUES (?,?,?,?);";
      $fechaRegistroNoSQLTime = strtotime($ejemplar->fechaRegistro);
      $fechaRegistroSQLTime = date("Y-m-d H:i:s", $fechaRegistroNoSQLTime);
      $ejemplar->fechaRegistro = $fechaRegistroSQLTime;
      $parametros = array($ejemplar->codigo,$ejemplar->idRecurso,$ejemplar->fechaRegistro,$ejemplar->idEstado);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $ejemplar = new Ejemplar($args["id"],$args["codigo"],$args["idRecurso"],$args["fechaRegistro"],$args["idEstado"]);
      $parametros = array($ejemplar->codigo,$ejemplar->idRecurso,$ejemplar->fechaRegistro,$ejemplar->idEstado,$ejemplar->id);
      $sql = "UPDATE Ejemplar SET codigo = ?,idRecurso = ?,fechaRegistro = ?,idEstado = ? WHERE id = ?;";
      $fechaRegistroNoSQLTime = strtotime($ejemplar->fechaRegistro);
      $fechaRegistroSQLTime = date("Y-m-d H:i:s", $fechaRegistroNoSQLTime);
      $ejemplar->fechaRegistro = $fechaRegistroSQLTime;
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
      $sql = "DELETE FROM Ejemplar WHERE id = ?;";
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
         $sql = "SELECT * FROM Ejemplar;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM Ejemplar WHERE id = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT * FROM Ejemplar LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($args)
   {
      $registrosPorPagina = $args["registros_por_pagina"];
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM Ejemplar;";
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
            $sql = "SELECT * FROM Ejemplar WHERE $nombreColumna = ?;";
            break;
         case "inicia":
            $sql = "SELECT * FROM Ejemplar WHERE $nombreColumna LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT * FROM Ejemplar WHERE $nombreColumna LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT * FROM Ejemplar WHERE $nombreColumna LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}