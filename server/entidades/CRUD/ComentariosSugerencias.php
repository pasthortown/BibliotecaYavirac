<?php
class ComentariosSugerencias
{
   public $id;
   public $idPersona;
   public $idRecurso;
   public $fecha;
   public $contenido;

   function __construct($id,$idPersona,$idRecurso,$fecha,$contenido){
      $this->id = $id;
      $this->idPersona = $idPersona;
      $this->idRecurso = $idRecurso;
      $this->fecha = $fecha;
      $this->contenido = $contenido;
   }
}
?>