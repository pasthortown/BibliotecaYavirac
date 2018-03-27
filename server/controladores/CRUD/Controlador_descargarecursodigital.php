<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/DescargaRecursoDigital.php');
class Controlador_descargarecursodigital extends Controlador_Base
{
   function crear($args)
   {
      $descargarecursodigital = new DescargaRecursoDigital($args["id"],$args["idPersona"],$args["idRecursoDigital"],$args["fechaDescarga"]);
      $sql = "INSERT INTO DescargaRecursoDigital (idPersona,idRecursoDigital,fechaDescarga) VALUES (?,?,?);";
      $fechaDescargaNoSQLTime = strtotime($descargarecursodigital->fechaDescarga);
      $fechaDescargaSQLTime = date("Y-m-d H:i:s", $fechaDescargaNoSQLTime);
      $descargarecursodigital->fechaDescarga = $fechaDescargaSQLTime;
      $parametros = array($descargarecursodigital->idPersona,$descargarecursodigital->idRecursoDigital,$descargarecursodigital->fechaDescarga);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $descargarecursodigital = new DescargaRecursoDigital($args["id"],$args["idPersona"],$args["idRecursoDigital"],$args["fechaDescarga"]);
      $parametros = array($descargarecursodigital->idPersona,$descargarecursodigital->idRecursoDigital,$descargarecursodigital->fechaDescarga,$descargarecursodigital->id);
      $sql = "UPDATE DescargaRecursoDigital SET idPersona = ?,idRecursoDigital = ?,fechaDescarga = ? WHERE id = ?;";
      $fechaDescargaNoSQLTime = strtotime($descargarecursodigital->fechaDescarga);
      $fechaDescargaSQLTime = date("Y-m-d H:i:s", $fechaDescargaNoSQLTime);
      $descargarecursodigital->fechaDescarga = $fechaDescargaSQLTime;
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
      $sql = "DELETE FROM DescargaRecursoDigital WHERE id = ?;";
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
         $sql = "SELECT * FROM DescargaRecursoDigital;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM DescargaRecursoDigital WHERE id = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT * FROM DescargaRecursoDigital LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($args)
   {
      $registrosPorPagina = $args["registros_por_pagina"];
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM DescargaRecursoDigital;";
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
            $sql = "SELECT * FROM DescargaRecursoDigital WHERE $nombreColumna = ?;";
            break;
         case "inicia":
            $sql = "SELECT * FROM DescargaRecursoDigital WHERE $nombreColumna LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT * FROM DescargaRecursoDigital WHERE $nombreColumna LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT * FROM DescargaRecursoDigital WHERE $nombreColumna LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}