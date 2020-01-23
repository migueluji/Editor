<?php
	 //require_once('../wp-load.php');
	 
	/*$gameDriveId=get_post_meta($_GET['gameid'], 'drive_folder_id', true);	
		
	$service=gamesonomy_drive_get_google_drive_service();
	$jsonId=gamesonomy_drive_get_file_id_by_name($service, 'game.json', $gameDriveId);
	
	$file=gamesonomy_drive_download_file($service, $jsonId);
	
	echo $file->getBody()->getContents();
	*/
	
	$gameFolder='./'.$_GET['gameFolder'];
	$jsonFile=$gameFolder.'/game.json';	
	if (file_exists($jsonFile)) {
	   	
		$respuesta=json_decode(file_get_contents($jsonFile, FILE_USE_INCLUDE_PATH));
		
		//consultar listas de imagenes y sonidos y añadir a respuesta-json en imageList y soundList
		$imageList=scandir($gameFolder.'/images');
		$soundList=scandir($gameFolder.'/sounds');

		if($imageList){
		  $listaImagenes=array();
		   foreach($imageList as $image){
    		   if($image=='.' || $image=='..')
    		   		continue;
		
			    $data['name']=$image;
				array_push($listaImagenes, $data);
		   }
		   
		   $respuesta->imageList=$listaImagenes;
		  // $respuesta->imageList=substr($listaImagenes, 0, -2).']';
		}
		
		if($soundList){
		    $listaSonidos=array();
    		 foreach($soundList as $sound){
        		   if($sound=='.' || $sound=='..')
        		   		continue;
    		
    			    $data['name']=$sound;
    				array_push($listaSonidos, $data);
    		}
				
		     $respuesta->soundList=$listaSonidos;	
		}
		//Something to write to txt log
        /*  $log  = $respuesta;
          //Save string to log, use FILE_APPEND to append.
          file_put_contents('./log_'.date("j.n.Y").'.log', $log, FILE_APPEND);
		  */
		echo json_encode($respuesta);
    } else {
        echo "{}";
    }
	
?>
