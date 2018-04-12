<?php
include_once('../controladores/Controlador_Base.php');
class Controlador_estadisticas extends Controlador_Base
{
   function ejemplares_tipo($args)
   {
      $parametros = array();
      $sql = "SELECT TipoRecurso.descripcion as tipo, COUNT(TipoRecurso.descripcion) as cuenta FROM Recurso INNER JOIN TipoRecurso ON Recurso.idTipo = TipoRecurso.id GROUP BY tipo ORDER BY cuenta DESC;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function ejemplares_solicitados_no_devueltos($args)
   {
      $parametros = array();
      $sql = "SELECT TipoRecurso.descripcion as tipo, COUNT(Recurso.id) as cuenta FROM Recurso INNER JOIN TipoRecurso ON Recurso.idTipo=TipoRecurso.id INNER JOIN DetalleSolicitud ON DetalleSolicitud.idRecurso=Recurso.id INNER JOIN Solicitud ON DetalleSolicitud.idSolicitud=Solicitud.id WHERE YEAR(fechaDevolucion)<2000 GROUP BY idTipo ORDER BY cuenta DESC;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function uso_biblioteca($args)
   {
      $parametros = array();
      $sql = "SELECT DATE_FORMAT(fechaSolicitud ,'%m') as fecha, COUNT(fechaSolicitud) as cuenta FROM Solicitud WHERE YEAR(fechaSolicitud)= YEAR(now()) GROUP BY fecha ORDER BY fecha ASC;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function uso_biblioteca_mes($args)
   {
      $parametros = array();
      $sql = "SELECT DATE_FORMAT(fechaSolicitud ,'%a %d') as fecha, COUNT(fechaSolicitud) as cuenta FROM Solicitud WHERE MONTH(fechaSolicitud)= MONTH(now()) GROUP BY fecha ORDER BY fecha ASC;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function ejemplares_por_estado($args)
   {
      $parametros = array();
      $sql = "SELECT Estado.descripcion as estado, COUNT(Estado.descripcion) as cuenta FROM Recurso INNER JOIN TipoRecurso ON Recurso.idTipo=TipoRecurso.id INNER JOIN Ejemplar ON Recurso.id=Ejemplar.idRecurso INNER JOIN Estado ON Ejemplar.idEstado=Estado.id GROUP BY Estado.id ORDER BY cuenta DESC;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function top_10_recursos($args)
   {
      $parametros = array();
      $sql = "SELECT Recurso.*, CONCAT(Autor.apellidos, ' ', Autor.nombres) as 'Autor', Productora.nombre as 'Productora', CategoriaRecurso.codigo as 'Codigo', CategoriaRecurso.descripcion as 'Categoria', TipoRecurso.descripcion as 'TipoRecurso', CONCAT(CategoriaRecurso.codigo,', ', Autor.apellidos,', ', Autor.nombres, ' (', YEAR(Recurso.fecha), '). ', Recurso.titulo, '. (', Recurso.ciudadPublicacion, ').') as 'Bibliografia' FROM Recurso INNER JOIN (SELECT Recurso.id as recurso, COUNT(Recurso.id) as cuenta FROM Recurso INNER JOIN DetalleSolicitud ON DetalleSolicitud.idRecurso=Recurso.id GROUP BY recurso ORDER BY cuenta DESC LIMIT 10) a ON a.recurso = Recurso.id INNER JOIN Autor ON Recurso.idAutor = Autor.id INNER JOIN Productora ON Recurso.idProductora = Productora.id INNER JOIN CategoriaRecurso ON Recurso.idCategoria = CategoriaRecurso.id INNER JOIN TipoRecurso ON Recurso.idTipo = TipoRecurso.id;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function ejemplares_categoria_unesco($args)
   {
      $parametros = array();
      $sql = "SELECT DISTINCT CategoriaRecurso.descripcion as categoria, a.cuenta FROM CategoriaRecurso INNER JOIN (SELECT SUBSTR(CategoriaRecurso.codigo,1,1) as idCategoria, COUNT(Recurso.id) as cuenta FROM Recurso INNER JOIN CategoriaRecurso on CategoriaRecurso.id=Recurso.idCategoria GROUP BY idCategoria) a ON CategoriaRecurso.id = a.idCategoria ORDER BY cuenta DESC;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}