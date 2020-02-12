class Render {

    constructor(render) {

        this.width              = render.displayWidth       || window.innerWidth;   /** Para la ejecucion en el editor. */
        this.height             = render.displayHeight      || window.innerHeight;  /** Para la ejecucion en el editor. */
        this.displayWidth       = render.displayWidth       || 800;                 /** Para la ejecucion en el player. */
        this.displayHeight      = render.displayHeight      || 600;                 /** Para la ejecucion en el player. */
        this.backgroundColor    = Util.colorFormat(render.backgroundColor)    || 0xffffff;            /** */
        this.cameraX            = render.cameraX            || 0.00;                /** */
        this.cameraY            = render.cameraY            || 0.00;                /** */
        this.cameraZoom         = render.cameraZoom         || 0.00;                /** */
        this.cameraAngle        = render.cameraAngle        || 0.00;                /** Radians */

        this.actorList          = {};       /** */
        this.onScreenList       = {};       /** */
        this.textList           = {};       /** */
        this.spriteList         = {};       /** */

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

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST; // Scale mode for all textures, will retain pixelation
    }

    createStage() {

        this.stage = new PIXI.Container();
    }

    setOriginAtScreenCenter() {

        this.stageOrigin = {
            x: this.renderer.width / 2,
            y: this.renderer.height / 2
        };

        this.stage.position.x   = this.stageOrigin.x - this.cameraX;
        this.stage.position.y   = this.stageOrigin.y + this.cameraY;

        this.stage.rotation     = this.cameraAngle; // En radianes

        this.stage.scale.x      = this.cameraZoom;
        this.stage.scale.y      = this.cameraZoom;
    }
    
    setActorRender(actor) {

        if(actor.spriteOn || actor.textOn) {
            
            /** Creamos el sprite contenedor. */
            actor.render = new PIXI.Sprite();
            actor.render.pivot.set(actor.width / 2, actor.height / 2);
            actor.render.anchor.set(0.5001); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
            actor.render.position.set(actor.x, -actor.y);
            actor.render.rotation = Util.degToRad(-actor.angle);
            
            /** Añadimos el sprite al contenedor de screen */
            if(actor.screen) {

                actor.originalPositionX = actor.x;
                actor.originalPositionY = actor.y; 

                this.onScreenList[actor.ID] = actor;
            }
            
            /** Añadimos el sprite al stage */
            this.stage.addChild(actor.render);

            /** Añadimos el actor a la lista del motor de render */
            this.actorList[actor.ID] = actor;
        }

        /** Creamos el sprite de la textura. */
        if(actor.spriteOn) { this.setActorSprite(actor); }

        /** Creamos el sprite de la texto. */
        if(actor.textOn) { this.setActorText(actor); }
    }

    setActorSprite(actor) {

        /** Asignamos la textura del sprite. */
        //actor.texture = (player.file.loader.resources[actor.image] != undefined) ? player.file.loader.resources[actor.image].texture : PIXI.Texture.WHITE;

        /** Creamos el sprite de la imagen. */
        actor.sprite = new PIXI.TilingSprite(actor.texture, actor.width, actor.height);

        //actor.sprite.scale.set(actor.scale)

        //actor.sprite.scale.set(actor.scaleX, actor.scaleY);
        actor.sprite.tint = Util.colorFormat(actor.color); /** Configuramos el color de tintado */
        actor.sprite.alpha = actor.opacity;   /** Configuramos el alpha del sprite */

        actor.render.addChild(actor.sprite); /** Añadimos el sprite al contenedor del sprites del actor. */

        this.spriteList[actor.ID] = actor; /** Añadimos el actor a la lista de actualizacion de sprites. */
    }

    setActorText(actor) {

        /** Definimos el estilo del texto. */
        actor.textStyle     = new PIXI.TextStyle({
            fontFamily: actor.font, 
            fontSize:   actor.size, 
            fill:       actor.fill, 
            align:      actor.align,
            fontWeight: actor.style
        });

        actor.text = Util.updateTextToLocalScope(actor.text, actor);

        //actor.text = (actor.text != undefined) ? Util.addElementsToLocalScope(actor.text, actor, this.actorList) : "";
        actor.textSprite = new PIXI.Text("", actor.textStyle);
        actor.textSprite.anchor.set(0.0);           // This will set the origin to center. (0.5) is same as (0.5, 0.5).
        actor.textSprite.position.set(actor.offsetX, -actor.offsetY);
        actor.render.addChild(actor.textSprite);    /** Añadimos el texto al sprite contenedor */

        this.textList[actor.ID] = actor; /** Añadimos el actor a la lista de actualizacion de texto. */
    }

    run() {

        this.updateActors();

        this.renderer.render(this.stage);
    }

    updateActors() {

        var i;

        for(i in this.onScreenList) {

            this.onScreenList[i].x = this.cameraX + this.onScreenList[i].originalPositionX;
            this.onScreenList[i].y = this.cameraY + this.onScreenList[i].originalPositionY;
        }

        for(i in this.textList) {

            this.textList[i].setTextProperties();
        }

        for(i in this.spriteList) {

            this.spriteList[i].setSpriteProperties();
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

        /** Comprobamos que el actor no ha sido previamente desactivado*/
        if(actor.render != undefined && actor.render != null) {

            if(actor.textOn) {

                /** Eliminamos el child de texto. */
                actor.render.removeChild(actor.textSprite);
                actor.textSprite.destroy();
                Util.destroy(actor, "textSprite");

                /** Eliminamos el actor de la lista de texto. */
                Util.destroy(this.textList, actor.ID);
            }

            if(actor.spriteOn) {

                /** Eliminamos el child de texto. */
                actor.render.removeChild(actor.sprite);
                actor.sprite.destroy();
                Util.destroy(actor, "sprite");

                /** Eliminamos el actor de la lista de texto. */
                Util.destroy(this.spriteList, actor.ID);
            }

            /** Eliminamos el render del stage. */
            this.stage.removeChild(actor.render);
            actor.render.destroy();
            Util.destroy(actor, "render");

            /** Eliminamos el actor de la lista de actores del motor de render  */
            Util.destroy(this.actorList, actor.ID);
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