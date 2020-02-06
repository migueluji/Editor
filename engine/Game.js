class Game {

    constructor(game) {

        /** Almacenamiento en memoria de los datos crudos del juego.
         * --------------------------------------------------------------------- */
        this.data               = game;

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
}