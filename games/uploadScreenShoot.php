<?php

    $gameFolder= $_GET['gameFolder'];
	
	$dstDir = "./".$gameFolder;
	echo $dstDir.' - ';
	if (!file_exists($dstDir)){
		mkdir($dstDir);
    }
	if(move_uploaded_file($_FILES['asset-file']['tmp_name'], $dstDir."/".$_FILES['asset-file']['name']))
		echo '- Upload ok';
	else
		echo ' - Error';

?>
  