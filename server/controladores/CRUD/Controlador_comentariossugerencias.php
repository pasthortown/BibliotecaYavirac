<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/ComentariosSugerencias.php');
class Controlador_comentariossugerencias extends Controlador_Base
{
   function crear($args)
   {
      $comentariossugerencias = new ComentariosSugerencias($args["id"],$args["idPersona"],$args["idRecurso"],$args["fecha"],$args["contenido"]);
      $sql = "INSERT INTO ComentariosSugerencias (idPersona,idRecurso,fecha,contenido) VALUES (?,?,?,?);";
      $fechaNoSQLTime = strtotime($comentariossugerencias->fecha);
      $fechaSQLTime = date("Y-m-d H:i:s", $fechaNoSQLTime);
      $comentariossugerencias->fecha = $fechaSQLTime;
      $parametros = array($comentariossugerencias->idPersona,$comentariossugerencias->idRecurso,$comentariossugerencias->fecha,$comentariossugerencias->contenido);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $comentariossugerencias = new ComentariosSugerencias($args["id"],$args["idPersona"],$args["idRecurso"],$args["fecha"],$args["contenido"]);
      $parametros = array($comentariossugerencias->idPersona,$comentariossugerencias->idRecurso,$comentariossugerencias->fecha,$comentariossugerencias->contenido,$comentariossugerencias->id);
      $sql = "UPDATE ComentariosSugerencias SET idPersona = ?,idRecurso = ?,fecha = ?,contenido = ? WHERE id = ?;";
      $fechaNoSQLTime = strtotime($comentariossugerencias->fecha);
      $fechaSQLTime = date("Y-m-d H:i:s", $fechaNoSQLTime);
      $comentariossugerencias->fecha = $fechaSQLTime;
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
      $sql = "DELETE FROM ComentariosSugerencias WHERE id = ?;";
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
         $sql = "SELECT * FROM ComentariosSugerencias ORDER BY fecha DESC;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM ComentariosSugerencias WHERE id = ? ORDER BY fecha DESC;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT * FROM ComentariosSugerencias ORDER BY fecha DESC LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($args)
   {
      $registrosPorPagina = $args["registros_por_pagina"];
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM ComentariosSugerencias;";
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
            $sql = "SELECT * FROM ComentariosSugerencias WHERE $nombreColumna = ? ORDER BY fecha DESC LIMIT 5;";
            break;
         case "inicia":
            $sql = "SELECT * FROM ComentariosSugerencias WHERE $nombreColumna ORDER BY fecha DESC LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT * FROM ComentariosSugerencias WHERE $nombreColumna ORDER BY fecha DESC LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT * FROM ComentariosSugerencias WHERE $nombreColumna ORDER BY fecha DESC LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}