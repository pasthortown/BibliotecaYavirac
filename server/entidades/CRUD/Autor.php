<?php
class Autor
{
   public $id;
   public $nombres;
   public $apellidos;
   public $urlWeb;

   function __construct($id,$nombres,$apellidos,$urlWeb){
      $this->id = $id;
      $this->nombres = $nombres;
      $this->apellidos = $apellidos;
      $this->urlWeb = $urlWeb;
   }
}
?>