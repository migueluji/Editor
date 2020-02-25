class Game {

    constructor(game, engine) {

        this.engine = engine; /** */

        /** Almacenamiento en memoria de los datos crudos del juego.
         * --------------------------------------------------------------------- */
        this.data               = game;

        /** Propiedades del juego
         * --------------------------------------------------------------------- */
        this.displayWidth       = game.displayWidth         || 800;                 /** Para la ejecucion en el player. */
        this.displayHeight      = game.displayHeight        || 600;                 /** Para la ejecucion en el player. */
        this._stageOrigin       = { x: this.displayWidth / 2, y: this.displayHeight / 2 };
        this.backgroundColor    = game.backgroundColor      || 0xffffff;  /** */
        this.cameraX            = game.cameraX              || 0.00;      /** */
        this.cameraY            = game.cameraY              || 0.00;      /** */
        this.cameraZoom         = game.cameraZoom           || 0.00;      /** */
        this.cameraAngle        = game.cameraAngle          || 0.00;      /** */
        /** Gestion de escenas
         * --------------------------------------------------------------------- */
        this.sceneList          = game.sceneList;                                       /** */
        this.activeSceneNumber  = 0;                                                    /** */
        this.activeScene        = Object.keys(game.sceneList)[this.activeSceneNumber];  /** */

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
        
        /** Propiedades custom del juego.
         * --------------------------------------------------------------------- */
        for(var i in game) { if(this[i] == null) { this[i] = game[i]; } }

        /** Añadimos los nombres de escenas a la lista
         * --------------------------------------------------------------------- */
        for(var i in game.sceneList) {

            this.sceneList[i].name = i;
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

    get displayWidth() { return this._displayWidth; }
    set displayWidth(value) {
        this._displayWidth = value;
        //console.log("Display Width:", this._displayWidth, "Display Height: ", this._displayHeight || 480);
        this.engine.render.renderer.resize(this._displayWidth, this._displayHeight || 480);
    }

    get displayHeight() { return this._displayHeight; }
    set displayHeight(value) {
        this._displayHeight = value;
        //console.log("Display Width:", this._displayWidth, "Display Height: ", this._displayHeight);
        this.engine.render.renderer.resize(this._displayWidth, this._displayHeight);
    }

    get backgroundColor() { return this._backgroundColor; }
    set backgroundColor(value) {
        this._backgroundColor = Util.colorFormat(value);
        //console.log(this._backgroundColor);
        //console.log("Background Color:", this._backgroundColor);
        this.engine.render.renderer.backgroundColor = this._backgroundColor;
    }

    get cameraX() { return this._cameraX; }
    set cameraX(value) {
        this._cameraX = value;
        //console.log("Camera X:", this._cameraX);
        //this.engine.render.stage.position.x = this._stageOrigin.x - this._cameraX;
        this.engine.render.stage.position.x = this._stageOrigin.x - this._cameraX;
        
        for(var i = 0; i < this.engine.render.onScreenList.length; i++) {

            this.engine.render.onScreenList[i].x = this._cameraX + this.engine.render.onScreenList[i].originalPositionX;
        }
    }

    get cameraY() { return this._cameraY; }
    set cameraY(value) {
        this._cameraY = value;
        //console.log("Camera Y:", this._cameraY);
        this.engine.render.stage.position.y = this._stageOrigin.y + this._cameraY;
        
        for(var i = 0; i < this.engine.render.onScreenList.length; i++) {

            this.engine.render.onScreenList[i].y = this._cameraY + this.engine.render.onScreenList[i].originalPositionY;
        }
    }

    get cameraAngle() { return this._cameraAngle; }
    set cameraAngle(value) {
        this._cameraAngle = value;
        //console.log("Camera Angle:", this._cameraAngle);
        this.engine.render.stage.rotation = Util.degToRad(this._cameraAngle);
    }

    get cameraZoom() { return this._cameraZoom; }
    set cameraZoom(value) {
        this._cameraZoom = value;
        //console.log("Camera Zoom:", this._cameraZoom);
        this.engine.render.stage.scale.set(this._cameraZoom);
    }
}