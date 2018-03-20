<?php
class Ejemplar
{
   public $id;
   public $codigo;
   public $idRecurso;
   public $fechaRegistro;
   public $idEstado;

   function __construct($id,$codigo,$idRecurso,$fechaRegistro,$idEstado){
      $this->id = $id;
      $this->codigo = $codigo;
      $this->idRecurso = $idRecurso;
      $this->fechaRegistro = $fechaRegistro;
      $this->idEstado = $idEstado;
   }
}
?>