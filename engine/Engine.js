class Engine {

    /* ----------------------------------------
     *  CONSTRUCTOR
     *  * ---------------------------------------- */
    constructor(game) {

        this.physics        = new Physics(this);    /** */
        this.render         = new Render(this);     /** */
        this.input          = new Input(this);      /** */
        this.audio          = new Audio(this);      /** */
        this.logic          = new Logic(this);      /** */

        this.game           = new Game(game, this); /** */

        this.actorList      = {};                   /** Diccionario de referencia de los actores presentes en el juego. */
        this.sceneList      = {};                   /** Necesitamos guardar los datos crudos de las escenas activas para acceder al Cast cuando queremos spawnear un actor. */
        
        this.spawnList      = [];                   /** Lista auxiliar para la creacion de nuevos actores (spawn) tras cada iteraccion del ciclo de juego. */
        this.destroyList    = [];                   /** Lista auxilair para la eliminacion de actores tras cada iteracion del ciclo de juego. */
        
        this.nextScene      = null;                 /** Propiedad auxiliar de control para activar una nueva escena. */
        this.removeScene    = false;                /** Propiedad auxiliar de control para eliminar la ultima escena. */

        this.addScene(this.game.sceneList[this.game.activeScene]); /** Añadimos la primera escena. */
    }

    /* ----------------------------------------
     *  GAME LOOP
     * ---------------------------------------- */
    gameLoop() {

        this.physics.run();
        this.logic.run();
        this.render.run();

        this.resetEngine();

        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    resetEngine() {

        this.updateScenes();    /** Gestion de los cambios de escena (si fuera necesario). */
        this.input.reset();     /** Resetear las propiedades de input (mouse, keys, etc). */ 
        this.logic.reset();     /** Resetear las propiedades de logica (deltaTime, timer, etc). */ 
        this.spawnActors();     /** Spawnear los actores determinados por la lista. */ 
        this.destroyActors();   /** Eliminar los actores determinados por la lista. */ 
    }

    /* ----------------------------------------
     *  SCENE MANAGEMENT
     * ---------------------------------------- */
    addScene(scene) {

        /** Actualizar la lista de escenas activas y la lista auxiliar de carga de actores. */
        this.sceneList[scene.name]  = {};

        /** Creacion de los actores en la memoria del motor. */
        for(var i in scene.actorList) {
            
            /** Si es un actor activo */
            if(!scene.actorList[i].sleeping) {

                this.actorList[scene.actorList[i].ID] = new Actor(scene.actorList[i], this);          
            }
            
            this.sceneList[this.game.activeScene][scene.actorList[i].ID] = scene.actorList[i];
        }

        this.logic.compileExpressions();    /** Compilamos las expresiones logicas de los nuevos actores. */
        this.render.compileTexts();         /** Compilamos los textos de los nuevos actores. */
    }
    
    /* ----------------------------------------
     *  SPAWN MANAGEMENT
     * ---------------------------------------- */
    addSpawnedActor(actorName, x, y, angle) {

        let _name   = "Spawn_of_" + actorName + "_" + Util.random();
        let _actor  = Object.assign({}, this.game.sceneList[this.game.activeScene].actorList[actorName]);

        _actor.sleeping = false;
        _actor.name     = _name;
        _actor.ID       = _name;
        _actor.x        = x;
        _actor.y        = y; 
        _actor.angle    = angle;

        this.spawnList.push(_actor);
    }

    spawnActors() {

        for(var i = 0; i < this.spawnList.length; i++) {

            this.actorList[this.spawnList[i].ID] = new Actor(this.spawnList[i], this);
        }

        this.spawnList = [];                /** Vaciamos la lista de actores a spawnear. */

        this.logic.compileExpressions();    /** Compilamos las expresiones logicas de los nuevos actores. */
        this.render.compileTexts();         /** Compilamos los textos de los nuevos actores. */
    }

    /* ----------------------------------------
     *  DESTROY MANAGEMENT
     * ---------------------------------------- */
    addDestroyedActor(actor) {

        this.destroyList.push(actor);
    }

    destroyActors() {

        for(var i = 0; i < this.destroyList.length; i++) {

            /** Destruimos las referencias y las estructuras de datos relativas al actor en cada modulo del motor
             * --------------------------------------------------------------- * ---------------------------------------- */
            this.physics.destroyActor(this.destroyList[i]);     // Eliminar el actor de las fisicas
            this.render.destroyActor(this.destroyList[i]);      // Eliminar el actor del render
            this.input.destroyActor(this.destroyList[i]);       // Eliminar el actor del input
            this.audio.destroyActor(this.destroyList[i]);       // Eliminar el actor del audio
            this.logic.destroyActor(this.destroyList[i]);       // Eliminar el actor de la logica

            /** Eliminar el actor de la listas del engine 
             * --------------------------------------------------------------- * ---------------------------------------- */ 
            Util.destroy(this.actorList, this.destroyList[i].ID);
            Util.destroy(this.sceneList[this.game.activeScene], this.destroyList[i].ID);

            /** Destruimos todas las propiedades del actor
             * --------------------------------------------------------------- * ---------------------------------------- */
            this.destroyList[i].destroy();
            this.destroyList[i] = null;
        }

        this.destroyList = [];
    }

    /* ----------------------------------------
     *  ADD SCENE HANDLERS
     * ---------------------------------------- */
    

    addSceneHandler(scene, stop) {

        this.nextScene = {scene: scene, stop: stop};
    }

    /* ----------------------------------------
     *  DESTROY SCENE HANDLERS
     * ---------------------------------------- */
    destroyScene(scene) {

        for(var i in scene) {

            this.addDestroyedActor(scene[i]);
        }

        Util.deepDestroy(scene);
        delete this.sceneList[scene.name];
    }

    clearScenes() {

        for(var i in this.sceneList) {

            this.destroyScene(this.sceneList[i]);
        }

        this.spawnList  = [];
        this.enableList  = [];
        this.disableList = [];

        this.destroyActors();   // eliminar los actores determinados por la lista

        this.sceneList = {};
    }

    popScene() {

        var sceneName = Util.getLastKey(this.sceneList);
        this.destroyScene(this.sceneList[sceneName]);
        this.destroyActors();   // eliminar los actores determinados por la lista
        delete this.sceneList[sceneName];
        this.enableScene();
        this.removeScene = false;
    }

    /* ----------------------------------------
     *  CHANGE SCENE HANDLERS
     * ---------------------------------------- */
    changeSceneHandler(scene) {

        this.nextScene = {scene: scene};
    } 

    /* ----------------------------------------
     *  DESTROY SCENE HANDLERS
     * ---------------------------------------- */
    removeSceneHandler() {

        this.removeScene = true;
    }

    /* ----------------------------------------
     *  SCENE HANDLERS
     * ---------------------------------------- */
    updateScenes() {

        // Comprobamos si tenemos que eliminar la ultima escena.
        if(this.removeScene) {

            this.popScene();
        }

        // Comprobamos si tenemos que añadir una escena.
        if(this.nextScene != null) {

            if(this.nextScene.stop == undefined) {

                this.clearScenes();
            }
            else {

                if(this.nextScene.stop) {

                    this.disableScene();

                    

                    this.spawnList  = [];
                }
            }

            // Añadimos la nueva escena.
            this.game.activeScene       = this.nextScene.scene;
            this.game.activeSceneNumber = this.game.sceneList[this.nextScene.scene].number;
            this.addScene(this.game.sceneList[this.nextScene.scene]);
            this.nextScene              = null;
        }
    }

    disableScene() {

        var scene = Util.getLastElement(this.sceneList);

        for(var i in scene) {

            this.addDisabledActor(scene[i]);
        }

        this.game.activeScene = Util.getLastKey(this.sceneList);
    }

    enableScene() {

        var sceneName = Util.getLastKey(this.sceneList);
        var scene = this.sceneList[sceneName];

        for(var i in scene) {

            this.addEnabledActor(scene[i]);
        }

        this.game.activeScene = sceneName;
    }
}