<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/Solicitud.php');
class Controlador_solicitud extends Controlador_Base
{
   function crear($args)
   {
      $solicitud = new Solicitud($args["id"],$args["idPersona"],$args["fechaSolicitud"],$args["fechaMax"],$args["fechaDevolucion"]);
      $sql = "INSERT INTO Solicitud (idPersona,fechaSolicitud,fechaMax,fechaDevolucion) VALUES (?,?,?,?);";
      $fechaSolicitudNoSQLTime = strtotime($solicitud->fechaSolicitud);
      $fechaSolicitudSQLTime = date("Y-m-d H:i:s", $fechaSolicitudNoSQLTime);
      $solicitud->fechaSolicitud = $fechaSolicitudSQLTime;
      $fechaMaxNoSQLTime = strtotime($solicitud->fechaMax);
      $fechaMaxSQLTime = date("Y-m-d H:i:s", $fechaMaxNoSQLTime);
      $solicitud->fechaMax = $fechaMaxSQLTime;
      $fechaDevolucionNoSQLTime = strtotime($solicitud->fechaDevolucion);
      $fechaDevolucionSQLTime = date("Y-m-d H:i:s", $fechaDevolucionNoSQLTime);
      $solicitud->fechaDevolucion = $fechaDevolucionSQLTime;
      $parametros = array($solicitud->idPersona,$solicitud->fechaSolicitud,$solicitud->fechaMax,$solicitud->fechaDevolucion);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         $sql = "SELECT id FROM Solicitud WHERE idPersona = '$solicitud->idPersona' AND fechaSolicitud = '$solicitud->fechaSolicitud';";
         $parametros = array();
         $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
         return $respuesta;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $solicitud = new Solicitud($args["id"],$args["idPersona"],$args["fechaSolicitud"],$args["fechaMax"],$args["fechaDevolucion"]);
      $sql = "UPDATE Solicitud SET idPersona = ?,fechaSolicitud = ?,fechaMax = ?,fechaDevolucion = ? WHERE id = ?;";
      $fechaSolicitudNoSQLTime = strtotime($solicitud->fechaSolicitud);
      $fechaSolicitudSQLTime = date("Y-m-d H:i:s", $fechaSolicitudNoSQLTime);
      $solicitud->fechaSolicitud = $fechaSolicitudSQLTime;
      $fechaMaxNoSQLTime = strtotime($solicitud->fechaMax);
      $fechaMaxSQLTime = date("Y-m-d H:i:s", $fechaMaxNoSQLTime);
      $solicitud->fechaMax = $fechaMaxSQLTime;
      $fechaDevolucionNoSQLTime = strtotime($solicitud->fechaDevolucion);
      $fechaDevolucionSQLTime = date("Y-m-d H:i:s", $fechaDevolucionNoSQLTime);
      $solicitud->fechaDevolucion = $fechaDevolucionSQLTime;
      $parametros = array($solicitud->idPersona,$solicitud->fechaSolicitud,$solicitud->fechaMax,$solicitud->fechaDevolucion,$solicitud->id);
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
      $sql = "DELETE FROM Solicitud WHERE id = ?;";
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
         $sql = "SELECT Biblioteca.Solicitud.*, CONCAT(ignug.Persona.identificacion,'-',Biblioteca.Solicitud.id) as 'Codigo' FROM Solicitud INNER JOIN ignug.Persona ON Biblioteca.Solicitud.idPersona = ignug.Persona.id;";
      }else{
      $parametros = array($id);
         $sql = "SELECT Biblioteca.Solicitud.*, CONCAT(ignug.Persona.identificacion,'-',Biblioteca.Solicitud.id) as 'Codigo' FROM Solicitud INNER JOIN ignug.Persona ON Biblioteca.Solicitud.idPersona = ignug.Persona.id WHERE Biblioteca.Solicitud.id = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT Biblioteca.Solicitud.*, CONCAT(ignug.Persona.identificacion,'-',Biblioteca.Solicitud.id) as 'Codigo' FROM Solicitud INNER JOIN ignug.Persona ON Biblioteca.Solicitud.idPersona = ignug.Persona.id LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($args)
   {
      $registrosPorPagina = $args["registros_por_pagina"];
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM Solicitud;";
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
            $sql = "SELECT Biblioteca.Solicitud.*, CONCAT(ignug.Persona.identificacion,'-',Biblioteca.Solicitud.id) as 'Codigo' FROM Solicitud INNER JOIN ignug.Persona ON Biblioteca.Solicitud.idPersona = ignug.Persona.id WHERE Biblioteca.Solicitud.$nombreColumna = ?;";
            break;
         case "inicia":
            $sql = "SELECT Biblioteca.Solicitud.*, CONCAT(ignug.Persona.identificacion,'-',Biblioteca.Solicitud.id) as 'Codigo' FROM Solicitud INNER JOIN ignug.Persona ON Biblioteca.Solicitud.idPersona = ignug.Persona.id WHERE Biblioteca.Solicitud.$nombreColumna LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT Biblioteca.Solicitud.*, CONCAT(ignug.Persona.identificacion,'-',Biblioteca.Solicitud.id) as 'Codigo' FROM Solicitud INNER JOIN ignug.Persona ON Biblioteca.Solicitud.idPersona = ignug.Persona.id WHERE Biblioteca.Solicitud.$nombreColumna LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT Biblioteca.Solicitud.*, CONCAT(ignug.Persona.identificacion,'-',Biblioteca.Solicitud.id) as 'Codigo' FROM Solicitud INNER JOIN ignug.Persona ON Biblioteca.Solicitud.idPersona = ignug.Persona.id WHERE Biblioteca.Solicitud.$nombreColumna LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}