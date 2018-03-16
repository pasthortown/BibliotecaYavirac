<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/RecursoTag.php');
class Controlador_recursotag extends Controlador_Base
{
   function crear($args)
   {
      $recursotag = new RecursoTag($args["id"],$args["idRecurso"],$args["idTag"]);
      $sql = "INSERT INTO RecursoTag (idRecurso,idTag) VALUES (?,?);";
      $parametros = array($recursotag->idRecurso,$recursotag->idTag);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $recursotag = new RecursoTag($args["id"],$args["idRecurso"],$args["idTag"]);
      $parametros = array($recursotag->idRecurso,$recursotag->idTag,$recursotag->id);
      $sql = "UPDATE RecursoTag SET idRecurso = ?,idTag = ? WHERE id = ?;";
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
      $sql = "DELETE FROM RecursoTag WHERE id = ?;";
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
         $sql = "SELECT * FROM RecursoTag;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM RecursoTag WHERE id = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT * FROM RecursoTag LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($args)
   {
      $registrosPorPagina = $args["registros_por_pagina"];
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM RecursoTag;";
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
            $sql = "SELECT * FROM RecursoTag WHERE $nombreColumna = ?;";
            break;
         case "inicia":
            $sql = "SELECT * FROM RecursoTag WHERE $nombreColumna LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT * FROM RecursoTag WHERE $nombreColumna LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT * FROM RecursoTag WHERE $nombreColumna LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}