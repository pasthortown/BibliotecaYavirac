<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/CategoriaRecurso.php');
class Controlador_categoriarecurso extends Controlador_Base
{
   function crear($args)
   {
      $categoriarecurso = new CategoriaRecurso($args["id"],$args["codigo"],$args["descripcion"],$args["codigoPadre"]);
      $sql = "INSERT INTO CategoriaRecurso (codigo,descripcion,codigoPadre) VALUES (?,?,?);";
      $parametros = array($categoriarecurso->codigo,$categoriarecurso->descripcion,$categoriarecurso->codigoPadre);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $categoriarecurso = new CategoriaRecurso($args["id"],$args["codigo"],$args["descripcion"],$args["codigoPadre"]);
      $parametros = array($categoriarecurso->codigo,$categoriarecurso->descripcion,$categoriarecurso->codigoPadre,$categoriarecurso->id);
      $sql = "UPDATE CategoriaRecurso SET codigo = ?,descripcion = ?,codigoPadre = ? WHERE id = ?;";
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
      $sql = "DELETE FROM CategoriaRecurso WHERE id = ?;";
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
         $sql = "SELECT * FROM CategoriaRecurso;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM CategoriaRecurso WHERE id = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT * FROM CategoriaRecurso LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($args)
   {
      $registrosPorPagina = $args["registros_por_pagina"];
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM CategoriaRecurso;";
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
            $sql = "SELECT * FROM CategoriaRecurso WHERE $nombreColumna = ?;";
            break;
         case "inicia":
            $sql = "SELECT * FROM CategoriaRecurso WHERE $nombreColumna LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT * FROM CategoriaRecurso WHERE $nombreColumna LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT * FROM CategoriaRecurso WHERE $nombreColumna LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}