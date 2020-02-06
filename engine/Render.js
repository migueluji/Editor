class Render {

    constructor(render) {

        this.width              = render.displayWidth       || window.innerWidth;   /** Para la ejecucion en el editor. */
        this.height             = render.displayHeight      || window.innerHeight;  /** Para la ejecucion en el editor. */
        this.displayWidth       = render.displayWidth       || 800;                 /** Para la ejecucion en el player. */
        this.displayHeight      = render.displayHeight      || 600;                 /** Para la ejecucion en el player. */
        this.backgroundColor    = render.backgroundColor    || 0xffffff;            /** */
        this.cameraX            = render.cameraX            || 0.00;                /** */
        this.cameraY            = render.cameraY            || 0.00;                /** */
        this.cameraZoom         = render.cameraZoom         || 0.00;                /** */
        this.cameraAngle        = render.cameraAngle        || 0.00;                /** Radians */

        this.actorList          = {};       /** */
        this.onScreenList       = {};       /** */

        this.createRenderer();              /** */
        this.createStage();                 /** */

        this.setOriginAtScreenCenter();     /** */

        //this.loadFonts(render.assets.fonts);
    }

    createRenderer() {

        this.renderer = new PIXI.Renderer({
            width: this.width, 
            height: this.height, 
            backgroundColor: this.backgroundColor
        });
        
        document.body.appendChild(this.renderer.view); // Add PIXI.Renderer to the DOM

        // Scale mode for all textures, will retain pixelation
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    }

    createStage() {

        this.stage = new PIXI.Container();
    }

    setOriginAtScreenCenter() {

        this.stageOrigin = {
            x: this.renderer.width / 2,
            y: this.renderer.height / 2
        };

        this.updateStage();
    }
    
    setActorRender(actor) {

        actor.render = new PIXI.Sprite();
        actor.render.anchor.set(0.5); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
        actor.render.rotation   = Util.degToRad(actor.angle);

        /** Creamos la textura del sprite */
        actor.texture           = (actor.image != null) ? new PIXI.Texture.from("./assets/images/" + actor.image) : PIXI.Texture.EMPTY;
        actor.sprite            = new PIXI.TilingSprite(actor.texture, actor.width, actor.height);
        //actor.sprite.scale.set(actor.scaleX, actor.scaleY);
        actor.sprite.tint       = Util.colorFormat(actor.color); /** Configuramos el color de tintado */
        actor.sprite.alpha      = actor.opacity;   /** Configuramos el alpha del sprite */
        actor.render.addChild(actor.sprite);

        /** Texto */
        actor.textStyle     = new PIXI.TextStyle({
                                fontFamily: actor.font, 
                                fontSize:   actor.size, 
                                fill:       actor.color, 
                                align:      actor.align,
                                fontWeight: actor.style
                            });
        actor.text          = (actor.text != undefined) ? Util.replaceScopeReference(actor, actor.text) : "";
        actor.textSprite    = new PIXI.Text("", actor.textStyle);
        actor.textSprite.anchor.set(0.0);           // This will set the origin to center. (0.5) is same as (0.5, 0.5).
        actor.render.addChild(actor.textSprite);    /** Añadimos el texto al sprite contenedor */

        /** Añadimos el actor a la lista del motor de render */
        this.actorList[actor.ID] = actor;

        /* DEBUG -- Borrar sin problemas */
            actor.renderDebugSprite = new PIXI.Sprite();
            actor.collisionBroadDebugSprite = new PIXI.Sprite();
            actor.collisionNarrowDebugSprite = new PIXI.Sprite();
        /* FIN DEBUG */

        /* DEBUG -- Borrar sin problemas */
            this.stage.addChild(actor.physicsDebugSprite);
            this.stage.addChild(actor.renderDebugSprite);
            this.stage.addChild(actor.collisionBroadDebugSprite);
            this.stage.addChild(actor.collisionNarrowDebugSprite);
        /* FIN DEBUG */

        /** Añadimos el sprite al contenedor de screen */
        if(actor.screen) {

            actor.originalPositionX = actor.x;
            actor.originalPositionY = actor.y; 

            this.onScreenList[actor.ID] = actor;
        }
        
        /** Añadimos el sprite al stage */
        this.stage.addChild(actor.render);
    }

    run() {

        this.updateStage();
        this.updateActors();

        this.renderer.render(this.stage);
    }

    updateStage() {

        this.stage.position.x = this.stageOrigin.x - this.cameraX;
        this.stage.position.y = this.stageOrigin.y + this.cameraY;

        this.stage.rotation = this.cameraAngle; // En radianes

        this.stage.scale.x = this.cameraZoom;
        this.stage.scale.y = this.cameraZoom;
    }

    updateActors() {

        for(var i in this.onScreenList) {

            this.onScreenList[i].x = this.cameraX + this.onScreenList[i].originalPositionX;
            this.onScreenList[i].y = this.cameraY + this.onScreenList[i].originalPositionY;
        }

        for(var i in this.actorList) {

            this.actorList[i].setTextProperties();
            this.actorList[i].setRenderProperties();

            /** --- DEBUG (ELIMINAR SIN PROBLEMA */
                //this.drawDebug(this.actorList[i]);
            /** FIN --- DEBUG (ELIMINAR SIN PROBLEMA */ 
        }
    }

    drawDebug(actor) {

        actor.renderDebugSprite.removeChildren();
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xff0000, 1);
        graphics.drawRect(actor.x - /*actor.scaleX * */actor.width / 2, actor.y - /*actor.scaleY * */actor.height / 2, actor.width /* * actor.scaleX*/, actor.height /* * actor.scaleY*/);
        actor.renderDebugSprite.addChild(graphics);
    }

    destroyActor(actor) {

        /** Comprobamos que el actor no ha sido previamente desactivado
         * ----------------------------------------------------------------------- */
        if(actor.sprite != undefined && actor.sprite != null) {

            /* DEBUG -- Borrar sin problemas */
                this.stage.removeChild(actor.physicsDebugSprite);
                this.stage.removeChild(actor.renderDebugSprite);
                actor.physicsDebugSprite.destroy();
                actor.renderDebugSprite.destroy();
            /* FIN DEBUG */

            /** Eliminamos el child de texto 
             * ----------------------------------------------------------------------- */
            actor.sprite.removeChild(actor.textSprite);
            actor.textSprite.destroy();
            Util.destroy(actor, "textSprite");

            /** Eliminamos el la textura del sprite 
             * ----------------------------------------------------------------------- */
            //actor.sprite.texture.destroy();

            // TODO: Hacer el LOADER y comprobar que las texturas se guardan bien (TEXTURE.clone())

            /** Eliminamos el sprite del stage 
             * ----------------------------------------------------------------------- */
            this.stage.removeChild(actor.sprite);
            actor.sprite.destroy();
            Util.destroy(actor, "sprite");

            /** Eliminamos el actor de la lista de actores del motor de render 
             * ----------------------------------------------------------------------- */
            delete this.actorList[actor.ID];
        }
    }

    loadFonts(fonts) {

        var style = document.getElementsByTagName("style"); 

        for(var i in fonts) {

            var css = "@font-face { font-family: '" + i + "'; src: url('" + fonts[i] + "'); };"
            style[0].innerHTML = css.concat(style[0].innerHTML);
        }
    }
}