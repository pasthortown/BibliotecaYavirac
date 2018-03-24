<?php
include_once('../controladores/Controlador_Base.php');
class Controlador_etiquetas extends Controlador_Base
{
   function leer($args)
   {
      $id = $args["id"];
      if ($id==""){
         $sql = "SELECT Recurso.*, CONCAT(Autor.apellidos, ' ', Autor.nombres) as 'Autor', Productora.nombre as 'Productora', Ejemplar.codigo as 'Codigo', CategoriaRecurso.descripcion as 'Categoria', TipoRecurso.descripcion as 'TipoRecurso' FROM Recurso INNER JOIN Autor ON Recurso.idAutor = Autor.id INNER JOIN Productora ON Recurso.idProductora = Productora.id INNER JOIN CategoriaRecurso ON Recurso.idCategoria = CategoriaRecurso.id INNER JOIN TipoRecurso ON Recurso.idTipo = TipoRecurso.id INNER JOIN Ejemplar ON Ejemplar.idRecurso = Recurso.id ORDER BY Recurso.titulo, Ejemplar.codigo ASC;";
      }else{
      $parametros = array($id);
         $sql = "SELECT Recurso.*, CONCAT(Autor.apellidos, ' ', Autor.nombres) as 'Autor', Productora.nombre as 'Productora', Ejemplar.codigo as 'Codigo', CategoriaRecurso.descripcion as 'Categoria', TipoRecurso.descripcion as 'TipoRecurso' FROM Recurso INNER JOIN Autor ON Recurso.idAutor = Autor.id INNER JOIN Productora ON Recurso.idProductora = Productora.id INNER JOIN CategoriaRecurso ON Recurso.idCategoria = CategoriaRecurso.id INNER JOIN TipoRecurso ON Recurso.idTipo = TipoRecurso.id INNER JOIN Ejemplar ON Ejemplar.idRecurso = Recurso.id WHERE Recurso.id = ? ORDER BY Recurso.titulo, Ejemplar.codigo ASC;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}