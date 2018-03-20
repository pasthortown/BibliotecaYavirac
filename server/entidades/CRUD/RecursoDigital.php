<?php
class RecursoDigital
{
   public $id;
   public $idRecurso;
   public $contenido;

   function __construct($id,$idRecurso,$contenido){
      $this->id = $id;
      $this->idRecurso = $idRecurso;
      $this->contenido = $contenido;
   }
}
?>