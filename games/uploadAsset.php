<?php
	// require_once('../wp-load.php');
	 
	$subDir = $_GET["assetFolder"];	
    $gameFolder= $_GET['gameFolder'];
	
	$dstDir = "./".$gameFolder."/".$subDir;
	echo $dstDir.' - ';
	if (!file_exists($dstDir)){
		mkdir($dstDir);
    }
	if(move_uploaded_file($_FILES['asset-file']['tmp_name'], $dstDir."/".$_FILES['asset-file']['name']))
		echo '- Upload ok';
	else
		echo ' - Error';

	/*
	$service=gamesonomy_drive_get_google_drive_service();
	$folderId=get_post_meta($gameId, 'drive_'.$subDir.'_folder_id', true);
	
	gamesonomy_drive_delete_file($service, gamesonomy_drive_get_file_id_by_name($service, $_FILES['asset-file']['name'], $folderId));
	gamesonomy_drive_upload_file($service, $folderId, $dstDir, $_FILES['asset-file']['name']);
	
	unlink($dstDir."/".$_FILES['asset-file']['name']);
	*/
?>
  