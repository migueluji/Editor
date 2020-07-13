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
			var _player = new Player({source: parentGamesFolder + "/" + gameFolder, data: localStorage.getItem("localStorage_GameData")});



			// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Map


			/*var actor1 = { x: 1, y: 0, script: { parameters: "timer" }, collider: "box"};
			var actor2 = { x: 23, y: 32, script: { parameters: "node" }, collider: "circle"};

			var array = [["actor1", actor1], ["actor2", actor2]];
			var map = new Map(array);

			console.log(map.get("clave1")); // devuelve "valor1"

			// Usando la función Array.from para transformar el mapa a un Array 2D clave-valor.
			console.log(Array.from(map)); // Muestra exactamente el mismo Array que kvArray

			// O usando los iteradores de claves o valores y convirtiendo a array.
			console.log(Array.from(map.keys())); // Muestra ["clave1", "clave2"]

			for(var [clave, valor] of map) {

				console.log(clave, valor);
			}

			console.log(map.get("actor1"));*/


		</script>

	</body>

</html>