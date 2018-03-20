<?php
include_once('../controladores/Controlador_Base.php');
class Controlador_catalogo extends Controlador_Base
{
   function obtener_tags($args)
   {
      $idRecurso = $args["id"];
      $parametros = array($idRecurso);
      $sql = "SELECT Tag.* FROM Tag INNER JOIN RecursoTag ON RecursoTag.idTag = Tag.id INNER JOIN Recurso ON Recurso.id = RecursoTag.idRecurso WHERE RecursoTag.idRecurso = ?;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}