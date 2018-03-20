<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/RecursoDigital.php');
class Controlador_recursodigital extends Controlador_Base
{
   function crear($args)
   {
      $recursodigital = new RecursoDigital($args["id"],$args["idRecurso"],$args["contenido"]);
      $sql = "INSERT INTO RecursoDigital (idRecurso,contenido) VALUES (?,?);";
      $parametros = array($recursodigital->idRecurso,$recursodigital->contenido);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $recursodigital = new RecursoDigital($args["id"],$args["idRecurso"],$args["contenido"]);
      $parametros = array($recursodigital->idRecurso,$recursodigital->contenido,$recursodigital->id);
      $sql = "UPDATE RecursoDigital SET idRecurso = ?,contenido = ? WHERE id = ?;";
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
      $sql = "DELETE FROM RecursoDigital WHERE id = ?;";
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
         $sql = "SELECT * FROM RecursoDigital;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM RecursoDigital WHERE id = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT * FROM RecursoDigital LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($args)
   {
      $registrosPorPagina = $args["registros_por_pagina"];
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM RecursoDigital;";
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
            $sql = "SELECT * FROM RecursoDigital WHERE $nombreColumna = ?;";
            break;
         case "inicia":
            $sql = "SELECT * FROM RecursoDigital WHERE $nombreColumna LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT * FROM RecursoDigital WHERE $nombreColumna LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT * FROM RecursoDigital WHERE $nombreColumna LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}