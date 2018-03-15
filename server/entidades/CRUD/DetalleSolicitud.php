<?php
class DetalleSolicitud
{
   public $id;
   public $idSolicitud;
   public $idRecurso;

   function __construct($id,$idSolicitud,$idRecurso){
      $this->id = $id;
      $this->idSolicitud = $idSolicitud;
      $this->idRecurso = $idRecurso;
   }
}
?>