<?php
class RecursoTag
{
   public $id;
   public $idRecurso;
   public $idTag;

   function __construct($id,$idRecurso,$idTag){
      $this->id = $id;
      $this->idRecurso = $idRecurso;
      $this->idTag = $idTag;
   }
}
?>