<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>Gamesonomy Editor</title>
	
	<link rel="stylesheet" type="text/css" href="https://unpkg.com/material-components-web@10.0.0/dist/material-components-web.min.css"></link>

	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<link rel="stylesheet" href="editor.css"></link>
	<link rel="stylesheet" href="scripts.css"></link>

	<script src="https://pixijs.download/release/pixi.min.js"></script>

	<script src="App.js"></script>
	<script src="Editor.js"></script>
	<script src="Game.js"></script>
	<script src="Scene.js"></script>
	<script src="Actor.js"></script>
	<script src="Script.js"></script>
	<script src="File.js"></script>
	<script src="Node.js"></script>
	<script src="Utils.js"></script>

	<script src="./views/EditorView.js"></script>
	<script src="./views/AppBarView.js"></script>
	<script src="./views/SideSheetView.js"></script>

	<script src="./canvas/canvasView.js"></script>
	<script src="./canvas/displayActor.js"></script>

	<script src="./scriptCanvas/ScriptCanvasView.js"></script>
	<script src="./scriptCanvas/NodeView.js"></script>
	<script src="./scriptCanvas/ChipView.js"></script>
	<script src="./scriptCanvas/CardView.js"></script>
	<script src="./scriptCanvas/EmptyNodeView.js"></script>
	<script src="./scriptCanvas/IfView.js"></script>
	<script src="./scriptCanvas/DoView.js"></script>
	<script src="./scriptCanvas/ParametersView.js"></script>
	<script src="./scriptCanvas/FieldView.js"></script>

	<script src="./dialogs/RenameDialogView.js"></script>
	<script src="./dialogs/NewPropertyDialogView.js"></script>
	<script src="./dialogs/DoSelectionView.js"></script>
	<script src="./dialogs/IfSelectionView.js"></script>
	<script src="./dialogs/ChoosePropertyView.js"></script>
	<script src="./dialogs/AssetSelectionView.js"></script>
	<script src="./dialogs/AssetView.js"></script>
	<script src="./dialogs/TagSelectionView.js"></script>
	<script src="./dialogs/TagView.js"></script>
	<script src="./dialogs/NewTagDialogView.js"></script>
	<script src="./dialogs/LoadingView.js"></script>

	<script src="./drawer/DrawerHeaderView.js"></script>
	<script src="./drawer/DrawerScenesView.js"></script>
	<script src="./drawer/SceneView.js"></script>

	<script src="./cast/CastView.js"></script>
	<script src="./cast/ActorView.js"></script>

	<script src="./gameProperties/GamePropertiesView.js"></script>
	<script src="./gameProperties/GamePropertiesSettingsView.js"></script>
	<script src="./gameProperties/GamePropertiesSoundView.js"></script>
	<script src="./gameProperties/GamePropertiesPhysicsView.js"></script>

	<script src="./actorProperties/ActorPropertiesView.js"></script>
	<script src="./actorProperties/ActorPropertiesSettingsView.js"></script>
	<script src="./actorProperties/ActorPropertiesSpriteView.js"></script>
	<script src="./actorProperties/ActorPropertiesTextView.js"></script>
	<script src="./actorProperties/ActorPropertiesSoundView.js"></script>
	<script src="./actorProperties/ActorPropertiesPhysicsView.js"></script>

	<script src="./newProperties/NewPropertiesView.js"></script>
	<script src="./newProperties/NewPropertyView.js"></script>

	<script src="./actorScripts/ActorScriptsView.js"></script>
	<script src="./actorScripts/ScriptView.js"></script>

	<script src="./commands/History.js"></script>
	<script src="./commands/Command.js"></script>
	<script src="./commands/CmdManager.js"></script>
	<script src="./commands/AddSceneCmd.js"></script>
	<script src="./commands/DuplicateSceneCmd.js"></script>
	<script src="./commands/MoveSceneCmd.js"></script>
	<script src="./commands/RemoveSceneCmd.js"></script>
	<script src="./commands/RenameSceneCmd.js"></script>
	<script src="./commands/ChangeGamePropertyCmd.js"></script>
	<script src="./commands/AddGamePropertyCmd.js"></script>
	<script src="./commands/RemoveGamePropertyCmd.js"></script>
	<script src="./commands/AddTagCmd.js"></script>
	<script src="./commands/AddActorCmd.js"></script>
	<script src="./commands/RemoveActorCmd.js"></script>
	<script src="./commands/DuplicateActorCmd.js"></script>
	<script src="./commands/RenameActorCmd.js"></script>
	<script src="./commands/MoveActorCmd.js"></script>
	<script src="./commands/ChangeActorPropertyCmd.js"></script>
	<script src="./commands/AddActorPropertyCmd.js"></script>
	<script src="./commands/RemoveActorPropertyCmd.js"></script>
	<script src="./commands/AddScriptCmd.js"></script>
	<script src="./commands/RenameScriptCmd.js"></script>
	<script src="./commands/DuplicateScriptCmd.js"></script>
	<script src="./commands/RemoveScriptCmd.js"></script>
	<script src="./commands/MoveScriptCmd.js"></script>
	<script src="./commands/AddNodeCmd.js"></script>
	<script src="./commands/RemoveNodeCmd.js"></script>
	<script src="./commands/MoveNodeCmd.js"></script>
	<script src="./commands/ChangeNodeCmd.js"></script>
	<script src="./commands/RemoveTagCmd.js"></script>
	
</head>
<body>
	<script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>
	<script>

		window.onbeforeunload = () => "";
	/*    
		var userId="<?php echo $_POST['iduser'];?>";
		var userName="<?php echo $_POST['nameuser'];?>";
		var gameId="<?php echo $_POST['idgame'];?>";
		var gameName="<?php echo $_POST['gamename'];?>";
		var gameFolder="<?php echo $_POST['gamefolder'];?>";
		var serverGamesFolder="https://<?php echo $_SERVER['SERVER_NAME'];?>/games-js";
	*/
	//	userId=1455;
	//	userName="Editor";
		gameId=Utils.id();
		serverGamesFolder="http://localhost/games";

	//	gameFolder="prueba";
	//	gameFolder="box-doger";
	// 	gameFolder="bird";
	//	gameFolder="flying-plane";
	//	gameFolder="asteroids";
	//	gameFolder="arkanoid";
	//	gameFolder="alien-invasion";
	//	gameFolder="babe-plataformer";
	//  gameFolder="ludumdare46-carlos";
		gameFolder="tetris";
	//	gameFolder="prehistoric";
	//	gameFolder="pirate-bomb";

		var app=new App(serverGamesFolder,gameFolder);
		
	</script>
	<script type="text/javascript">
		let type = "WebGL"
		if(!PIXI.utils.isWebGLSupported()){
			type = "canvas"
		}
		PIXI.utils.sayHello(type);
	</script>
</body>
</html>