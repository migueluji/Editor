<?php
	 
	$subDir = $_GET["assetFolder"];	
    $gameFolder= $_GET['gameFolder'];
	
	$dstDir = "./".$gameFolder."/".$subDir;
	echo $dstDir.' - ';
	if (!file_exists($dstDir)){
		mkdir($dstDir);
    }
	if(move_uploaded_file($_FILES['file']['tmp_name'], $dstDir."/".$_FILES['file']['name']))
		echo '- Upload ok';
	else
		echo ' - Error';

?>
  