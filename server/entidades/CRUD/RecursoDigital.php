<?php
class RecursoDigital
{
   public $id;
   public $idRecurso;
   public $tipoArchivo;
   public $nombreArchivo;
   public $adjunto;

   function __construct($id,$idRecurso,$tipoArchivo,$nombreArchivo,$adjunto){
      $this->id = $id;
      $this->idRecurso = $idRecurso;
      $this->tipoArchivo = $tipoArchivo;
      $this->nombreArchivo = $nombreArchivo;
      $this->adjunto = $adjunto;
   }
}
?>