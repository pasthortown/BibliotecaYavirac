<?php
class Solicitud
{
   public $id;
   public $idPersona;
   public $fechaSolicitud;
   public $fechaMax;
   public $fechaDevolucion;

   function __construct($id,$idPersona,$fechaSolicitud,$fechaMax,$fechaDevolucion){
      $this->id = $id;
      $this->idPersona = $idPersona;
      $this->fechaSolicitud = $fechaSolicitud;
      $this->fechaMax = $fechaMax;
      $this->fechaDevolucion = $fechaDevolucion;
   }
}
?>