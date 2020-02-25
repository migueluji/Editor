class Input {

    constructor(engine) {

        this.engine         = engine;               /** */
        this.game           = this.engine.game;     /** */

        this.actorList  = {};                                       /** */

        this.keyList    = {};                                       /** */
        this.pointer    = {down: false, up: true, isOver: false};   /** */

        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));

        this.setPointerInteraction(this.engine.render);
    }
    
    setActorInput(actor) {

        /** Comprobamos si es un actor interactivo. */
        if(actor.interactiveOn) {

            /** Añadimos la propiedad de control de eventos de pointer en el actor*/
            actor.pointer = {down: false, up: true, isOver: false};

            /** Comprobamos si tiene un sprite render asignado, si no lo creamos. */
            if(actor.render == null) {

                /** Creamos el sprite contenedor. */
                actor.render = new PIXI.Sprite();
                actor.render.anchor.set(0.5001); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
                actor.render.angle = actor.angle;
                
                /** Añadimos el sprite al contenedor de screen */
                if(actor.screen) {

                    actor.originalPositionX = actor.x;
                    actor.originalPositionY = actor.y; 

                    this.engine.render.onScreenList[actor.ID] = actor;
                }
                
                /** Añadimos el sprite al stage */
                this.engine.render.stage.addChild(actor.render);

                /** Añadimos el actor a la lista del motor de render */
                this.engine.render.actorList[actor.ID] = actor;
            }

            /** Configuramos las propiedades del motor de Render */
            actor.render.interactive = true;
            actor.render.buttonMode = true;

            /** Añadimos los listeners */
            actor.render.on("pointerdown", this.actorPointerDownHandler.bind(this, actor));
            actor.render.on("pointerupoutside", this.actorPointerUpHandler.bind(this, actor));
            actor.render.on("pointerup", this.actorPointerUpHandler.bind(this, actor));
            actor.render.on("pointerover", this.actorPointerOverHandler.bind(this, actor));
            actor.render.on("pointerout", this.actorPointerOutHandler.bind(this, actor));

            /** Añadimos el actor a la lista del motor de input */
            this.actorList[actor.ID] = actor;
        }
    }

    setPointerInteraction(render) {

        render.stage.interactive = true;
        render.stage.hitArea = new PIXI.Rectangle(-render.renderer.width / 2, -render.renderer.height / 2, render.renderer.width, render.renderer.height);

        render.stage.on("pointerdown", this.pointerDownHandler.bind(this));
        render.stage.on("pointerupoutside", this.pointerUpHandler.bind(this));
        render.stage.on("pointerup", this.pointerUpHandler.bind(this));
        render.stage.on("pointermove", this.pointerMoveHandler.bind(this));
    }

    pointerDownHandler() {

        this.pointer.down = true;
        this.pointer.up   = false;
    }

    pointerUpHandler() {

        this.pointer.down = false;
        this.pointer.up   = true;
    }

    pointerMoveHandler(event) {

        this.engine.game.mouseX = Math.floor(event.data.global.x - this.engine.render.renderer.width / 2 + this.engine.render.cameraX);
        this.engine.game.mouseY = Math.floor(event.data.global.y - this.engine.render.renderer.height / 2 - this.engine.render.cameraY);
    }

    actorPointerDownHandler(actor) {

        //console.log("---------------------------------- DOWN", actor);

        actor.pointer.down = true;
        actor.pointer.up   = false;
    }

    actorPointerUpHandler(actor) {

        //console.log("---------------------------------- UP", actor);

        actor.pointer.down = false;
        actor.pointer.up   = true;
    }

    actorPointerOverHandler(actor) {

        //console.log("---------------------------------- IS OVER TRUE", actor);

        actor.pointer.isOver = true;
    }

    actorPointerOutHandler(actor) {

        //console.log("---------------------------------- IS OVER FALSE", actor);

        actor.pointer.isOver = false;
    }

    keyDownHandler(event) {

        event.preventDefault();

        //console.log(event);

        if(this.keyList.hasOwnProperty(event.code)) {

            this.keyList[event.code].down       = true;
            this.keyList[event.code].up         = false;
            this.keyList[event.code].pressed    = true;
        }
    }

    keyUpHandler(event) {

        event.preventDefault();

        if(this.keyList.hasOwnProperty(event.code)) {

            this.keyList[event.code].down       = false;
            this.keyList[event.code].up         = true;
            this.keyList[event.code].pressed    = false;
        }
    }

    reset() {

        for(var i in this.keyList) {

            this.keyList[i].down = false;
            this.keyList[i].up = true;
        }
        
        for(var i in this.actorList) {

            this.actorList[i].pointer.down   = false;
            this.actorList[i].pointer.up     = true;
            this.actorList[i].pointer.isOver = false;
        }
    }

    destroyActor(actor) {

        /** Si es interactivo, lo eliminamos de las listas de actualizacion del motor de render. */
        if(actor.interactiveOn) {

            this.engine.render.destroyActor(actor);
        }

        /** Eliminamos el actor de la lista de actores del motor de input */
        Util.destroy(this.actorList, actor.ID);
    }
}