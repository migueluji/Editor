class Game {

    constructor(game) {

        /** Almacenamiento en memoria de los datos crudos del juego.
         * --------------------------------------------------------------------- */
        this.data               = game;

        console.log(this.data);

        /** Gestion de escenas
         * --------------------------------------------------------------------- */
        this.sceneList          = game.sceneList;                                       /** */
        this.activeSceneNumber  = 0;                                                    /** */
        this.activeScene        = Object.keys(game.sceneList)[this.activeSceneNumber];  /** */

        console.log(this.activeScene);

        /** Propiedades de lectura para la ejecucion
         * --------------------------------------------------------------------- */
        this.FPS                = 0.0;      /** */
        this.deltaTime          = 0.0;      /** */
        this.elapsedTime        = 0.0;      /** */
        
        this.mouseX             = 0;        /** */
        this.mouseY             = 0;        /** */

        this.latitude           = null;     /** */
        this.longitude          = null;     /** */

        this.accelerometerX     = null;     /** */
        this.accelerometerY     = null;     /** */
        this.accelerometerZ     = null;     /** */

        /** Propiedades del juego */
        this.backgroundColor    = game.backgroundColor    || 0xffffff;  /** */
        this.cameraX            = game.cameraX            || 0.00;      /** */
        this.cameraY            = game.cameraY            || 0.00;      /** */
        this.cameraZoom         = game.cameraZoom         || 0.00;      /** */
        this.cameraAngle        = game.cameraAngle        || 0.00;      /** */

        console.log(this.cameraX);

        /** Final del juego
         * --------------------------------------------------------------------- */
        this.exit = false;

        /** Añadimos los nombres de escenas a la lista
         * --------------------------------------------------------------------- */
        for(var i in game.sceneList) {

            this.sceneList[i].name = i;
        }
        
        /** Precarga de propiedades 
         * --------------------------------------------------------------------- */
        for(var i in game) {

            this[i] = game[i];
        }
    }

    
    /** ###############################################################################
     *  Control sobre el cambio de propiedades en ejecucion.
     *  ############################################################################### */

    get activeScene() { return this._activeScene; }
    set activeScene(value) {

        this._activeScene = value;
    }

    get activeSceneNumber() { return this._activeSceneNumber; }
    set activeSceneNumber(value) {

        this._activeSceneNumber = value;
    }

    get exit() { return this._exit; }
    set exit(value) {

        this._exit = value;

        if(this._exit) {

            // TODO: Eliminar todas las escenas activas.
        }
    }

    get FPS() { return this._FPS; }
    set FPS(value) {

        this._FPS = value;

        // TODO: Cambiar la propiedad FPS del request animation frame. (Seguramente hara falta un FPS auxiliar, para permitir establecer el maximo y leer el actual)
    }

    get backgroundColor() { return this._backgroundColor; }
    set backgroundColor(value) {

        this._backgroundColor = Util.colorFormat(value);

        if(player.engine != null) {

            //console.log("ENTRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", player.engine.render, this._backgroundColor);
            player.engine.render.renderer.backgroundColor = this._backgroundColor;
        }
        
        
    }

    get cameraX() { return this._cameraX; }
    set cameraX(value) {

        this._cameraX = value;

        if(player.engine != null) {
            
            console.log(player.engine.render.stage.position.x, this._cameraX, player.engine.render.stageOrigin);

            player.engine.render.stage.position.x = player.engine.render.stageOrigin.x - this._cameraX;
        }
    }

    get cameraY() { return this._cameraY; }
    set cameraY(value) {

        this._cameraY = value;

        if(player.engine != null) {

            player.engine.render.stage.position.y = player.engine.render.stageOrigin.y + this._cameraY;
        }
    }

    get cameraAngle() { return this._cameraAngle; }
    set cameraAngle(value) {

        this._cameraAngle = value;

        if(player.engine != null) {

            player.engine.render.stage.rotation = Util.degToRad(-this._cameraAngle);
        }
    }

    get cameraZoom() { return this._cameraZoom; }
    set cameraZoom(value) {

        this._cameraZoom = value;

        if(player.engine != null) {

            player.engine.render.stage.scale.set(this._cameraZoom);
        }
    }
}