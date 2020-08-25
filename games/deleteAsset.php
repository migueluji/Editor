<?php
	 
	$subDir = $_GET["assetFolder"];	
    $gameFolder= $_GET['gameFolder'];
	$fileName=$_GET['filename'];
	
	$dstAsset = "./".$gameFolder."/".$subDir."/".$fileName;

	if (unlink($dstAsset))
		echo "success=1";
	else
		echo "success=0";
?>