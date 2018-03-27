<?php
class DescargaRecursoDigital
{
   public $id;
   public $idPersona;
   public $idRecursoDigital;
   public $fechaDescarga;

   function __construct($id,$idPersona,$idRecursoDigital,$fechaDescarga){
      $this->id = $id;
      $this->idPersona = $idPersona;
      $this->idRecursoDigital = $idRecursoDigital;
      $this->fechaDescarga = $fechaDescarga;
   }
}
?>