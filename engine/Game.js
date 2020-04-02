class Game {

    constructor(game, engine) {

        /**
         * Asignacion del motor
         * --------------------------------------------------------------------- */
        this.engine             = engine;

        /** Almacenamiento en memoria de los datos crudos del juego.
         * --------------------------------------------------------------------- */
        this.data               = game;
        this.loaded             = false;

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

        /** Propiedades fisicas del juego
         * --------------------------------------------------------------------- */
        this.physicsOn          = game.physicsOn            || true;    /** */
        this.gravityX           = game.gravityX             || 0.0;     /** */
        this.gravityY           = game.gravityY             || 0.0;     /** */

        /** Propiedades de audio del juego
         * --------------------------------------------------------------------- */
        this.soundOn            = game.soundOn              || true;    /** */
        this.soundFile          = game.sound                || "";      /** */
        this.pan                = game.pan                  || 0.0;     /** */
        this.volume             = game.volume               || 1.0;     /** */
        this.playSound          = game.playSound            || false;   /** */
        this.loop               = game.loop                 || false;   /** */

        /** Propiedades de lectura para la ejecucion
         * --------------------------------------------------------------------- */
        this.FPS                = 0.0;      /** */
        this.deltaTime          = 0.025;      /** */
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

        /**
         * Actualizacion de la variable de control de la carga de informacion
         * --------------------------------------------------------------------- */
        this.loaded = true;
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
        this.engine.render.renderer.resize(this._displayWidth, this._displayHeight || 480);
    }

    get displayHeight() { return this._displayHeight; }
    set displayHeight(value) {
        this._displayHeight = value;
        this.engine.render.renderer.resize(this._displayWidth, this._displayHeight);
    }

    get backgroundColor() { return this._backgroundColor; }
    set backgroundColor(value) {
        this._backgroundColor = Util.colorFormat(value);
        this.engine.render.renderer.backgroundColor = this._backgroundColor;
    }

    get cameraX() { return this._cameraX; }
    set cameraX(value) {
        this._cameraX = value;
        
        this.engine.render.stage.position.x = this._stageOrigin.x - this._cameraX;
        
        for(var i = 0; i < this.engine.render.onScreenList.length; i++) {

            this.engine.render.onScreenList[i].x = this._cameraX + this.engine.render.onScreenList[i].originalPositionX;
        }
    }

    get cameraY() { return this._cameraY; }
    set cameraY(value) {
        this._cameraY = value;
        
        this.engine.render.stage.position.y = this._stageOrigin.y + this._cameraY;
        
        for(var i = 0; i < this.engine.render.onScreenList.length; i++) {

            this.engine.render.onScreenList[i].y = this._cameraY + this.engine.render.onScreenList[i].originalPositionY;
        }
    }

    get cameraAngle() { return this._cameraAngle; }
    set cameraAngle(value) {
        this._cameraAngle = value;
        this.engine.render.stage.rotation = Util.degToRad(this._cameraAngle);
    }

    get cameraZoom() { return this._cameraZoom; }
    set cameraZoom(value) {
        this._cameraZoom = value;
        this.engine.render.stage.scale.set(this._cameraZoom);
    }

    get gravityX() { return this._gravityX; }
    set gravityX(value) {
        this._gravityX = value;
        this.engine.physics.world.m_gravity.Set(this._gravityX, this._gravityY);
    }

    get gravityY() { return this._gravityY; }
    set gravityY(value) {
        this._gravityY = value;
        this.engine.physics.world.m_gravity.Set(this._gravityX, this._gravityY);
    }

    get soundOn() { return this._soundOn; }
    set soundOn(value) {
        this._soundOn = value;
    }

    get soundFile() { return this._soundFile; }
    set soundFile(value) {
        this._soundFile = value;

        if(this.loaded && this._soundOn) {
            this.engine.audio.setSound(this._soundFile);
        }
    }

    get pan() { return this._pan; }
    set pan(value) {
        this._pan = Util.clamp(value, -1.0, 1.0);

        if(this.loaded && this._soundOn) {
            this.engine.audio.sound.stereo = this._pan;
        }
    } 

    get volume() { return this._volume; }
    set volume(value) {
        this._volume = Util.clamp(value, 0.0, 1.0);

        if(this.loaded && this._soundOn) {
            this.engine.audio.sound.volume = this._volume;
        }
    } 

    get playSound() { return this._playSound; }
    set playSound(value) {
        this._playSound = value;

        if(this.loaded && this._soundOn) {
            this.engine.audio.sound.autoplay = this._playSound;
        }
    }  

    get loop() { return this._loop; }
    set loop(value) {
        this._loop = value;

        if(this.loaded && this._soundOn) {
            this.engine.audio.sound.loop = this._loop;
        }
    } 
}