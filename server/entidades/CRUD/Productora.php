<?php
class Productora
{
   public $id;
   public $nombre;
   public $urlWeb;

   function __construct($id,$nombre,$urlWeb){
      $this->id = $id;
      $this->nombre = $nombre;
      $this->urlWeb = $urlWeb;
   }
}
?>