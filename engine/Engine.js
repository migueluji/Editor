class Engine {

    /* ····································································
     *  CONSTRUCTOR
    ···································································· */
    constructor(game) {

        this.game       = new Game(game);               /** */

        this.physics    = new Physics(game);            /** */
        this.render     = new Render(game);             /** */
        this.input      = new Input(game, this.render); /** */
        this.audio      = new Audio(game);              /** */
        this.logic      = new Logic(game);              /** */

        this.logic.setScope(this);                      /** Actualizar el scope con la informacion de Game y del Engine para la evaluacion de la logica. */

        this.actorList  = {};                           /** */
        this.sceneList  = {};                           /** Necesitamos guardar los datos crudos de las escenas activas para acceder al Cast cuando queremos spawnear un actor. */

        this.spawnedActorsList      = [];               /** */
        this.spawnedNodesList       = [];               /** */
        this.destroyedActorsList    = [];               /** */
        this.enabledActorsList      = [];               /** Lista auxiliar de control para los cambios en la propiedad live. */
        this.disabledActorsList     = [];               /** Lista auxiliar de control para los cambios en la propiedad live. */
        
        this.nextScene              = null;             /** Propiedad auxiliar de control para activar una nueva escena. */
        this.removeScene            = false;            /** Propiedad auxiliar de control para eliminar la ultima escena. */

        this.addScene(this.game.sceneList[this.game.activeScene]); /** Añadimos la primera escena. */


        /** DEBUG */
            this.stats = new Stats();
            this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
            this.stats.dom.style.marginLeft = "350px"; //para debug del [0, 0] (BORRAR SIN PROBLEMA)
            this.stats.dom.style.marginTop = "50px"; //para debug del [0, 0] (BORRAR SIN PROBLEMA)
		    document.body.appendChild(this.stats.dom);
        /** FIN DEBUG */
    }

    /* ····································································
     *  GAME LOOP
    ···································································· */
    gameLoop() {

        /** DEBUG */
            this.stats.begin();
        /** FIN DEBUG */

        this.physics.run();
        this.logic.run();
        this.render.run();

        this.resetEngine();

        /** DEBUG */
            this.stats.end();
        /** FIN DEBUG */

        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    resetEngine() {

        this.updateScenes();

        this.input.reset();     // resetar las propiedades de input
        this.logic.reset();     // resetar las propiedades de logica
        this.spawnActors();     // spawnear los actores determinados por la lista
        this.destroyActors();   // eliminar los actores determinados por la lista
        this.enableActors();    // activar los actores deshabilitados en la lista
        this.disableActors();   // desactivar los actores activados en la lista
    }

    /* ····································································
     *  NEW ACTOR HANDLERS
    ···································································· */
    addActor(actor) {

        var _actor = new Actor(actor);
        this.setActorID(_actor);
        
        this.physics.setActorPhysics(_actor);    // Añadir el actor al motor de fisicas.
        this.render.setActorRender(_actor);      // Añadir el actor al motor de render. 
        this.input.setActorInput(_actor);        // Añadir el actor al motor de input.
        this.audio.setActorAudio(_actor);        // Añadir el actor al motor de audio.
        this.logic.setActorLogic(_actor);        // Añadir el actor al motor de logica.
        
        this.actorList[_actor.ID] = _actor;
        this.sceneList[this.game.activeScene][_actor.ID] = _actor;
    }

    setActorID(actor) {

        actor.scene = this.game.activeScene;
        actor.ID    = actor.scene + "_" + actor.name;
    }

    /* ····································································
     *  SPAWN ACTOR HANDLERS
    ···································································· */
    addSpawnedActor(actor, x, y, angle) {

        var spawnedActor = Object.assign({}, this.game.sceneList[this.game.activeScene].actorList[actor]); // De momento es la 0, porque no admitimos mas. Para mas capas hay que hacer un bucle.

        spawnedActor.live = true;
        spawnedActor.name = "Copy_of_" + actor + "_" + Util.random(); // TODO: Este random deberia venir de una funcion UTIL
        spawnedActor.x = x;
        spawnedActor.y = y; 
        spawnedActor.angle = angle; 

        this.spawnedActorsList.push(spawnedActor);
    }

    spawnActors() {

        for(var i = 0; i < this.spawnedActorsList.length; i++) {

            this.addActor(this.spawnedActorsList[i]);
            this.logic.compileExpressions();
            this.spawnedActorsList[i] = null;
        }

        this.spawnedActorsList = [];
    }

    /* ····································································
     *  DESTROY ACTOR HANDLERS
    ···································································· */
    addDestroyedActor(actor) {

        this.destroyedActorsList.push(actor);

        //console.log("-- Destroyed Actors: ", this.destroyedActorsList);
    }

    destroyActors() {

        for(var i = 0; i < this.destroyedActorsList.length; i++) {

            /** Destruimos las referencias y las estructuras de datos relativas al actor en cada modulo del motor
             * ------------------------------------------------------------------------------------------------------- */
            this.physics.destroyActor(this.destroyedActorsList[i]); // Eliminar el actor de las fisicas
            this.render.destroyActor(this.destroyedActorsList[i]);  // Eliminar el actor del render
            this.input.destroyActor(this.destroyedActorsList[i]);   // Eliminar el actor del input
            this.audio.destroyActor(this.destroyedActorsList[i]);   // Eliminar el actor del audio
            this.logic.destroyActor(this.destroyedActorsList[i]);   // Eliminar el actor de la logica

            /** Eliminar el actor de la listas del engine 
             * ------------------------------------------------------------------------------------------------------- */ 
            Util.destroy(this.actorList, this.destroyedActorsList[i].ID);
            Util.destroy(this.sceneList[this.game.activeScene], this.destroyedActorsList[i].ID);

            /** Destruimos todas las propiedades del actor
             * ------------------------------------------------------------------------------------------------------- */
            this.destroyedActorsList[i].destroy();
            this.destroyedActorsList[i] = null;
        }

        this.destroyedActorsList = [];
    }

    /* ····································································
     *  ENABLE ACTOR HANDLERS
    ···································································· */
    addEnabledActor(actor) {

        this.enabledActorsList.push(actor);
    }

    enableActors() {

        for(var i = 0; i < this.enabledActorsList.length; i++) {

            this.enableActor(this.enabledActorsList[i]);
        }

        this.enabledActorsList = [];
    }

    enableActor(actor) {

        this.physics.enableActor(actor);    // Añadir el actor al motor de fisicas.
        //this.render.setActorRender(actor);    // El motor de render no es necesario, ya que en gamesonomy.com se mantiene la imagen.
        this.input.setActorInput(actor);        // Añadir el actor al motor de input.
        this.logic.enableActor(actor);        // Añadir el actor al motor de logica.
    }

    /* ····································································
     *  DISABLE ACTOR HANDLERS
    ···································································· */
    addDisabledActor(actor) {

        this.disabledActorsList.push(actor);
    }

    disableActors() {

        for(var i = 0; i < this.disabledActorsList.length; i++) {

            this.disableActor(this.disabledActorsList[i]);
        }

        this.disabledActorsList = [];
    }

    disableActor(actor) {

        this.physics.disableActor(actor);   // Eliminar el actor de las fisicas
        //this.render.destroyActor(actor);  // El motor de render no es necesario, ya que en gamesonomy.com se mantiene la imagen.
        this.input.destroyActor(actor);     // Eliminar el actor del input
        this.logic.disableActor(actor);     // Eliminar el actor de la logica
    }

    /* ····································································
     *  ADD SCENE HANDLERS
    ···································································· */
    addScene(scene) {

        this.sceneList[scene.name] = {};            /** Actualizar la lista de escenas activas */
        
        for(var i in scene.actorList) {             /** Creamos los actores en el motor */

            if(scene.actorList[i].live != false) {  /** Si es un actor activo */

                scene.actorList[i].name = i;
                this.addActor(scene.actorList[i]);
            }
        }

        this.logic.compileExpressions();            /** Compilar las expresiones una vez cargados todos los datos en memoria */
    }

    addSceneHandler(scene, stop) {

        this.nextScene = {scene: scene, stop: stop};
    }

    /* ····································································
     *  DESTROY SCENE HANDLERS
    ···································································· */
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

        this.spawnedActorsList  = [];
        this.enabledActorsList  = [];
        this.disabledActorsList = [];

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

    /* ····································································
     *  CHANGE SCENE HANDLERS
    ···································································· */
    changeSceneHandler(scene) {

        this.nextScene = {scene: scene};
    }

    /* ····································································
     *  DESTROY SCENE HANDLERS
    ···································································· */
    removeSceneHandler() {

        this.removeScene = true;
    }

    /* ····································································
     *  SCENE HANDLERS
    ···································································· */
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

                    

                    this.spawnedActorsList  = [];
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