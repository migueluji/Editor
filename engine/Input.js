class Input {

    constructor(engine) {

        this.engine     = engine;               /** */
        this.game       = this.engine.game;     /** */

        this.actorList  = [];                                       /** */

        this.keyList    = {};                                       /** */
        this.pointer    = {down: false, up: true, over: false, tap: false};   /** */

        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));

        this.setPointerInteraction(this.engine.render);
    }
    
    setActorInput(actor) {

        /** Comprobamos si es un actor interactivo. */
        if(actor.interactiveOn) {

            /** Añadimos la propiedad de control de eventos de pointer en el actor*/
            actor.pointer = {down: false, up: true, over: false, tap: false};

            /** Comprobamos si tiene un sprite render asignado, si no lo creamos. */
            if(actor.sprite == null) {

                /** Creamos el sprite contenedor. */
                actor.sprite = new PIXI.Sprite();
                actor.sprite.anchor.set(0.5001); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
                actor.sprite.angle = actor.angle;
                
                /** Añadimos el sprite al contenedor de screen */
                if(actor.screen) {

                    actor.originalPositionX = actor.x;
                    actor.originalPositionY = actor.y; 

                    this.engine.render.onScreenList.push(actor);
                }
                
                /** Añadimos el sprite al stage */
                this.engine.render.stage.addChild(actor.sprite);

                /** Añadimos el actor a la lista del motor de render */
                this.engine.render.spriteList.push(actor);
            }

            /** Configuramos las propiedades del motor de Render */
            actor.sprite.interactive = true;
            actor.sprite.buttonMode = true;

            /** Añadimos los listeners */
            actor.sprite.on("pointerdown", this.actorPointerDownHandler.bind(this, actor));
            actor.sprite.on("pointerupoutside", this.actorPointerUpHandler.bind(this, actor));
            actor.sprite.on("pointerup", this.actorPointerUpHandler.bind(this, actor));
            actor.sprite.on("pointerover", this.actorPointerOverHandler.bind(this, actor));
            actor.sprite.on("pointerout", this.actorPointerOutHandler.bind(this, actor));

            /** Si ademas tiene un sprite de texto */
            if(actor.textSprite != null) {

                /** Configuramos las propiedades del motor de Render */
                actor.textSprite.interactive = true;
                actor.textSprite.buttonMode = true;

                /** Añadimos los listeners */
                actor.textSprite.on("pointerdown", this.actorPointerDownHandler.bind(this, actor));
                actor.textSprite.on("pointerupoutside", this.actorPointerUpHandler.bind(this, actor));
                actor.textSprite.on("pointerup", this.actorPointerUpHandler.bind(this, actor));
                actor.textSprite.on("pointerover", this.actorPointerOverHandler.bind(this, actor));
                actor.textSprite.on("pointerout", this.actorPointerOutHandler.bind(this, actor));
            }

            /** Añadimos el actor a la lista del motor de input */
            this.actorList.push(actor);
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
        this.pointer.tap  = true;
    }

    pointerUpHandler() {

        this.pointer.down = false;
        this.pointer.up   = true;
        this.pointer.tap  = false;
    }

    pointerMoveHandler(event) {

        this.engine.game.mouseX = Math.floor(event.data.global.x - this.engine.render.renderer.width / 2 + this.engine.game.cameraX);
        this.engine.game.mouseY = -1 * Math.floor(event.data.global.y - this.engine.render.renderer.height / 2 - this.engine.game.cameraY);
    }

    actorPointerDownHandler(actor) { 

        actor.pointer.down = true;  
        actor.pointer.up = false;   
        actor.pointer.tap = true; 
    }
   
    actorPointerUpHandler(actor) { 
        
        actor.pointer.down = false; 
        actor.pointer.up = true;   
        actor.pointer.tap = false; 
    }

    actorPointerOverHandler(actor) { 
        
        actor.pointer.over = true; 
    }

    actorPointerOutHandler(actor) { 
        
        actor.pointer.over = false; 
    }

    keyDownHandler(event) {

        event.preventDefault();

        if(this.keyList.hasOwnProperty(event.code)) {

            this.keyList[event.code].down       = !this.keyList[event.code].pressed
            this.keyList[event.code].up         = false
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

        this.pointer.tap  = false;

        for(var i in this.keyList) {

            this.keyList[i].down = false;
            this.keyList[i].up   = false;
        }
        
        for(var i in this.actorList) {
            
            this.actorList[i].pointer.tap    = false;
        }
    }

    destroyActor(actor) {

        if(actor.interactiveOn) { actor.sprite.interactive = false; } /** Si es interactivo, lo eliminamos de las listas de actualizacion del motor de render. */
        this.actorList = Util.removeByID(this.actorList, actor.ID); /** Eliminamos el actor de la lista de actores del motor de input */
    }

    sleep(actor) {

        if(actor.interactiveOn) { 
            
            if(actor.spriteOn) { actor.sprite.interactive = false; }
            if(actor.textOn) { actor.textSprite.interactive = false; }
        }
    }

    awake(actor) {

        if(actor.interactiveOn) { 
            
            if(actor.spriteOn) { actor.sprite.interactive = true; }
            if(actor.textOn) { actor.textSprite.interactive = true; }
        }
    }
}