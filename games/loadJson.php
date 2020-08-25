<?php

	$gameFolder='./'.$_GET['gameFolder'];
	if (!file_exists($gameFolder))
		mkdir($gameFolder);
    
	$jsonFile=$gameFolder.'/game.json';
	if (file_exists($jsonFile)) {
		$respuesta=json_decode(file_get_contents($jsonFile, FILE_USE_INCLUDE_PATH));
	} 
	else {
		$respuesta=json_decode("{}");
	}
	
	//consultar listas de imagenes y sonidos y añadir a respuesta-json en imageList y soundList
	if (file_exists($gameFolder.'/images')){
		$imageList=scandir($gameFolder.'/images');

		if($imageList){
			$listaImagenes=array();
			foreach($imageList as $image){
				if($image=='.' || $image=='..')
						continue;
		
				$data['name']=$image;
				array_push($listaImagenes, $data);
			}
			
			if($listaImagenes)
				$respuesta->imageList=$listaImagenes;
		}
	}
		
	if (file_exists($gameFolder.'/sounds')){
		$soundList=scandir($gameFolder.'/sounds');

		if($soundList){
			$listaSonidos=array();

			foreach($soundList as $sound){
				if($sound=='.' || $sound=='..')
						continue;
			
					$data['name']=$sound;
					array_push($listaSonidos, $data);
			}
			
			if($listaSonidos)
				$respuesta->soundList=$listaSonidos;	
		}
	}
	echo json_encode($respuesta);

?>
