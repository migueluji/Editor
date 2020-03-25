<!DOCTYPE HTML>

<html>
	
	<head>

		<style type="text/css">
			
			* {
				margin:0;
				padding:0;
			}

			html, body {
				width:100%;
				height:100%;
				background: #333333;
			}
 
			canvas {
				display:block; 
                position: absolute;
				top: 50%;
				left: 50%;
				transform: translateX(-50%) translateY(-50%);
			}

		</style>
	
		<title>Gamesonomy Engine</title>
	
	</head>
	
	<body>

		<script src="libraries/math.js"></script>
		<script src="https://pixijs.download/release/pixi.min.js"></script>
		<script src="libraries/box2d.min.js"></script>
		<script src="libraries/howler.min.js"></script>

        <script src="Player.js"></script>

        <script src="File.js"></script>
		<script src="Engine.js"></script>

		<script src="Game.js"></script>
		
        <script src="Util.js"></script>

        <script src="Physics.js"></script>
        <script src="Input.js"></script>
        <script src="Logic.js"></script>
        <script src="Audio.js"></script>
        <script src="Render.js"></script>

		<script src="Actor.js"></script>
		
		<script src="If.js"></script>
		<script src="Do.js"></script>

		<script>
		
			//console.log(localStorage.getItem("localStorage_GameData"));
			var parentGamesFolder="<?php echo $_POST['parentGamesFolder'];?>";
            var gameFolder="<?php echo $_POST['gameFolder'];?>";
			var player = new Player({source: parentGamesFolder + "/" + gameFolder, data: localStorage.getItem("localStorage_GameData")});

		</script>

	</body>

</html>