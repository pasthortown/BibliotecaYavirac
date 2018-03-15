<?php
class Recurso
{
   public $id;
   public $idTipo;
   public $idAutor;
   public $idCategoria;
   public $idProductora;
   public $codigoISBN;
   public $observaciones;
   public $idEstado;

   function __construct($id,$idTipo,$idAutor,$idCategoria,$idProductora,$codigoISBN,$observaciones,$idEstado){
      $this->id = $id;
      $this->idTipo = $idTipo;
      $this->idAutor = $idAutor;
      $this->idCategoria = $idCategoria;
      $this->idProductora = $idProductora;
      $this->codigoISBN = $codigoISBN;
      $this->observaciones = $observaciones;
      $this->idEstado = $idEstado;
   }
}
?>