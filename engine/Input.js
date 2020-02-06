class Input {

    constructor(game, render) {

        this.actorList  = {};                                       /** */

        this.keyList    = {};                                       /** */
        this.pointer    = {down: false, up: true, isOver: false};   /** */

        this.render = render;

        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));

        this.setPointerInteraction(render);
    }
    
    setActorInput(actor) {

        /** Añadimos la propiedad de control de eventos de pointer en el actor*/
        actor.pointer = {down: false, up: true, isOver: false};

        /** Configuramos las propiedades del motor de Render */
        actor.sprite.interactive = true;
        actor.sprite.buttonMode = true;

        /** Añadimos los listeners */
        actor.sprite.on("pointerdown", this.actorPointerDownHandler.bind(this, actor));
        actor.sprite.on("pointerupoutside", this.actorPointerUpHandler.bind(this, actor));
        actor.sprite.on("pointerup", this.actorPointerUpHandler.bind(this, actor));
        actor.sprite.on("pointerover", this.actorPointerOverHandler.bind(this, actor));
        actor.sprite.on("pointerout", this.actorPointerOutHandler.bind(this, actor));

        /** Añadimos el actor a la lista del motor de input */
        this.actorList[actor.ID] = actor;
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

        player.engine.game.mouseX = Math.floor(event.data.global.x - this.render.renderer.width / 2 + this.render.cameraX);
        player.engine.game.mouseY = Math.floor(event.data.global.y - this.render.renderer.height / 2 - this.render.cameraY);
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
    }

    destroyActor(actor) {

        /** Eliminamos el actor de la lista de actores del motor de input 
         * ----------------------------------------------------------------------- */
        delete this.actorList[actor.ID];
    }
}