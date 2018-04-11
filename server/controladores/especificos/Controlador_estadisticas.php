<?php
include_once('../controladores/Controlador_Base.php');
class Controlador_estadisticas extends Controlador_Base
{
   function ejemplares_tipo($args)
   {
      $parametros = array();
      $sql = "SELECT TipoRecurso.descripcion as tipo, COUNT(TipoRecurso.descripcion) as cuenta FROM Recurso INNER JOIN TipoRecurso ON Recurso.idTipo = TipoRecurso.id GROUP BY tipo;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function ejemplares_solicitados_no_devueltos($args)
   {
      $parametros = array();
      $sql = "SELECT TipoRecurso.descripcion as tipo, COUNT(TipoRecurso.descripcion) as cuenta FROM Recurso INNER JOIN TipoRecurso ON Recurso.idTipo = TipoRecurso.id GROUP BY tipo;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function ejemplares_mas_solicitados($args)
   {
      $parametros = array();
      $sql = "SELECT TipoRecurso.descripcion as tipo, COUNT(TipoRecurso.descripcion) as cuenta FROM Recurso INNER JOIN TipoRecurso ON Recurso.idTipo = TipoRecurso.id GROUP BY tipo;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function ejemplares_por_estado($args)
   {
      $parametros = array();
      $sql = "SELECT TipoRecurso.descripcion as tipo, COUNT(TipoRecurso.descripcion) as cuenta FROM Recurso INNER JOIN TipoRecurso ON Recurso.idTipo = TipoRecurso.id GROUP BY tipo;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function ejemplares_categoria_unesco($args)
   {
      $parametros = array();
      $sql = "SELECT TipoRecurso.descripcion as tipo, COUNT(TipoRecurso.descripcion) as cuenta FROM Recurso INNER JOIN TipoRecurso ON Recurso.idTipo = TipoRecurso.id GROUP BY tipo;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}