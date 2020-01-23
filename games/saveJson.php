<?php 
    $gamesFolder = '.';
		
	header("Content-Type: application/json");

     // build a PHP variable from JSON sent using POST method	 
	 $gameId=$_GET['gameId'];
	 $gameFolder=$_GET['gameFolder'];
	 
	 $gameFolder=$gamesFolder.'/'.$gameFolder;
	 
	 $jsonContent=file_get_contents("php://input");

      if(!is_dir($gameFolder)){
      	 mkdir($gameFolder);
      }
      	
      $fp = fopen($gameFolder.'/game.json', 'w');
      if(fwrite($fp, $jsonContent) === FALSE)
        	$response="Server Error!";	
      else
        	$response="Game Saved!";
        
	 fclose($fp);

     if (file_exists('../wp-load.php')){
            require_once('../wp-load.php');

			$my_post = array(
                 'ID'           => $gameId,
                 'post_title'   => $v['name']
             );
            
          // Update the post into the database
 		  	wp_update_post( $my_post );
    }
	
	echo $response;
