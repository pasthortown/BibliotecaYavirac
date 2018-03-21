<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/Productora.php');
class Controlador_productora extends Controlador_Base
{
   function crear($args)
   {
      $productora = new Productora($args["id"],$args["nombre"],$args["urlWeb"]);
      $sql = "INSERT INTO Productora (nombre,urlWeb) VALUES (?,?);";
      $parametros = array($productora->nombre,$productora->urlWeb);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $productora = new Productora($args["id"],$args["nombre"],$args["urlWeb"]);
      $parametros = array($productora->nombre,$productora->urlWeb,$productora->id);
      $sql = "UPDATE Productora SET nombre = ?,urlWeb = ? WHERE id = ?;";
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
      $sql = "DELETE FROM Productora WHERE id = ?;";
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
         $sql = "SELECT * FROM Productora ORDER BY nombre ASC;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM Productora WHERE id = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT * FROM Productora ORDER BY nombre ASC LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($args)
   {
      $registrosPorPagina = $args["registros_por_pagina"];
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM Productora;";
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
            $sql = "SELECT * FROM Productora WHERE $nombreColumna = ? ORDER BY nombre ASC;";
            break;
         case "inicia":
            $sql = "SELECT * FROM Productora WHERE $nombreColumna ORDER BY nombre ASC LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT * FROM Productora WHERE $nombreColumna ORDER BY nombre ASC LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT * FROM Productora WHERE $nombreColumna ORDER BY nombre ASC LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}