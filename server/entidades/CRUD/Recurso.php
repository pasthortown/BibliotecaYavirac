<?php
class Recurso
{
   public $id;
   public $idTipo;
   public $idAutor;
   public $idCategoria;
   public $idProductora;
   public $titulo;
   public $codigoISBN;
   public $descripcion;
   public $contenido;
   public $fecha;

   function __construct($id,$idTipo,$idAutor,$idCategoria,$idProductora,$titulo,$codigoISBN,$descripcion,$contenido,$fecha){
      $this->id = $id;
      $this->idTipo = $idTipo;
      $this->idAutor = $idAutor;
      $this->idCategoria = $idCategoria;
      $this->idProductora = $idProductora;
      $this->titulo = $titulo;
      $this->codigoISBN = $codigoISBN;
      $this->descripcion = $descripcion;
      $this->contenido = $contenido;
      $this->fecha = $fecha;
   }
}
?>