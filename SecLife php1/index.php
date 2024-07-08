<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST") {    
     $json = file_get_contents('php://input');
     $data = json_decode($json);
       foreach($data as $key=>$value){
          echo $key . " : " . $value . "\n";
        }
  }	 
?>
