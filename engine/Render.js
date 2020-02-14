class Render {

    constructor(game, engine) {

        this.engine         = engine;   /** */

        this.actorList      = {};       /** */
        this.onScreenList   = {};       /** */
        this.textList       = {};       /** */
        this.spriteList     = {};       /** */

        this.setRender();

        //this.loadFonts(render.assets.fonts);
    }

    setRender() {

        this.renderer = new PIXI.Renderer();
        document.body.appendChild(this.renderer.view); // Add PIXI.Renderer to the DOM
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST; // Scale mode for all textures, will retain pixelation
        this.stage = new PIXI.Container();
    }

    setActorRender(actor, data) {
            
        /** Añadimos el sprite al contenedor de screen */
        /*if(data.screen) {

            actor.originalPositionX = actor.x;
            actor.originalPositionY = actor.y; 

            this.onScreenList[actor.ID] = actor;
        }*/

        //if(data.spriteOn || data.textOn) {

            /** Creamos el sprite contenedor. */
            //actor.render = new PIXI.Sprite();
            
            /** Añadimos el sprite al stage */
            //this.stage.addChild(actor.render);

            /** Añadimos el actor a la lista del motor de render */
            //this.actorList[actor.ID] = actor;
        //}*/

        /** Creamos el sprite de la textura. */
        if(data.spriteOn) { this.setActorSprite(actor); }

        /** Creamos el sprite de la texto. */
        if(data.textOn) { this.setActorText(actor); }
    }

    setActorSprite(actor, data) {

        actor.sprite = new PIXI.TilingSprite(PIXI.Texture.EMPTY); /** Creamos el sprite de la imagen. */
        this.stage.addChild(actor.sprite); /** Añadimos el sprite al contenedor del sprites del actor. */
        this.spriteList[actor.ID] = actor; /** Añadimos el actor a la lista de actualizacion de sprites. */
    }

    setActorText(actor, data) {

        actor.textStyle = new PIXI.TextStyle({}); /** Definimos el estilo del texto. */
        //actor.text = Util.updateTextToLocalScope(actor.text, actor);
        actor.textSprite = new PIXI.Text(" ", actor.textStyle);
        actor.textSprite.scale.x = 20;
        //console.log(actor.textSprite.width);
        this.stage.addChild(actor.textSprite);    /** Añadimos el texto al sprite contenedor */
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