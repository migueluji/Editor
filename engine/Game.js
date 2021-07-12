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
        this.physicsOn          = game.physicsOn;                       /** */
        this.gravityX           = game.gravityX             || 0.0;     /** */
        this.gravityY           = game.gravityY             || 0.0;     /** */

        /** Propiedades de audio del juego
         * --------------------------------------------------------------------- */
        this.soundOn            = game.soundOn;                         /** */
        this.pan                = game.pan                  || 0.0;     /** */
        this.volume             = game.volume               || 1.0;     /** */
        this.playSound          = game.playSound            || false;   /** */
        this.loop               = game.loop                 || false;   /** */
        this.soundtrack         = game.soundtrack           || "";      /** */

        /** Propiedades de lectura para la ejecucion
         * --------------------------------------------------------------------- */
        this.FPS                = 0.0;      /** */
        this.deltaTime          = 0.025;    /** */
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

        /** Añadimos los nombres y los numeros de escenas a la lista
         * --------------------------------------------------------------------- */
        var number = 0;
        for(var i in game.sceneList) { this.sceneList[i].name = i; this.sceneList[i].number = number; number++; }

        /**
         * Marcamos los actores que se van a spawnear (orden de visualizacion)
         * --------------------------------------------------------------------- */
        this.markSpawns();

        /**
         * Actualizacion de la variable de control de la carga de informacion
         * --------------------------------------------------------------------- */
        this.loaded = true;
    }

    markSpawns() {

        for(var i in this.sceneList) {

            var spawnList = [];
            
            for(var j in this.sceneList[i].actorList) {

                Util.findSpawns(this.sceneList[i].actorList[j].scriptList, spawnList);
            }

            spawnList = Util.removeDuplicates(spawnList);

            for(var j = 0; j < spawnList.length; j++) {

                for(var k in this.sceneList[i].actorList) {

                    if(spawnList[j] == this.sceneList[i].actorList[k].name) {

                        this.sceneList[i].actorList[k].spawn = true;
                    }
                }
            }
        }
    }

    resetCamera() {

        this.cameraX = this.data.cameraX;
        this.cameraY = this.data.cameraY;
    }

    updateCamera() {

        this.cameraX = this.cameraX;
        this.cameraY = this.cameraY;
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

        if(this.loaded) { this._activeScene = Util.getElementByPropertyValue(this.sceneList, "number", this._activeSceneNumber).name; }
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
        this.engine.render.renderer.resize(this._displayWidth, this._displayHeight);
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
        this.engine.render.stage.hitArea = new PIXI.Rectangle(this._cameraX - this._displayWidth / 2, this._cameraY - this._displayHeight / 2, this._displayWidth, this._displayHeight);
        
        for(var i = 0; i < this.engine.render.onScreenList.length; i++) {

            this.engine.render.onScreenList[i].x = this._cameraX + this.engine.render.onScreenList[i].originalPositionX;
        }
    }

    get cameraY() { return this._cameraY; }
    set cameraY(value) {
        this._cameraY = value;
        
        this.engine.render.stage.position.y = this._stageOrigin.y + this._cameraY;
        this.engine.render.stage.hitArea = new PIXI.Rectangle(this._cameraX - this._displayWidth / 2, this._cameraY - this._displayHeight / 2, this._displayWidth, this._displayHeight);

        
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

    get physicsOn() { return this._physicsOn; }
    set physicsOn(value) {
        
        if(this._physicsOn != value) {

            if(value) { this.engine.physics.awakeRigidbodies(); }
            else { this.engine.physics.sleepRigidbodies(); }
        }
        
        this._physicsOn = value;
    }

    get gravityX() { return this._gravityX; }
    set gravityX(value) {
        this._gravityX = value;
        this.engine.physics.world.m_gravity.x = this._gravityX;
    }

    get gravityY() { return this._gravityY; }
    set gravityY(value) {
        this._gravityY = value;
        this.engine.physics.world.m_gravity.y = this._gravityY;
    }

    get soundOn() { return this._soundOn; }
    set soundOn(value) {
        this._soundOn = value;
    }

    get soundtrack() { return this._soundtrack; }
    set soundtrack(value) {
        this._soundtrack = value;

        if(this._soundOn) {

            this.engine.audio.setSound(this._soundtrack, true, this.volume, this.pan, this.loop);
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