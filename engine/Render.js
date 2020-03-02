class Render {

    constructor(engine) {

        this.engine         = engine;   /** */

        this.spriteList     = [];       /** */
        this.textList       = [];       /** */
        this.onScreenList   = [];       /** */

        this.setRender();
    }

    setRender() {

        this.renderer   = new PIXI.Renderer();
        this.stage      = new PIXI.Container();
        document.body.appendChild(this.renderer.view); // Add PIXI.Renderer to the DOM
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST; // Scale mode for all textures, will retain pixelation
        PIXI.settings.WRAP_MODE  = PIXI.WRAP_MODES.REPEAT;

        console.log(this.renderer);
        //if(this.renderer instanceof PIXI.CanvasRenderer) { console.log("CANVAS"); } else { console.log("WEBGL"); }
        


			//console.log(PIXI.settings.WRAP_MODE);

        //this.loadFonts(render.assets.fonts);
    }

    setActorRender(actor, data) {
            
        /** Creamos el sprite de la textura. */
        if(data.spriteOn) { this.setActorSprite(actor); }

        /** Creamos el sprite de la texto. */
        //if(data.textOn) { this.setActorText(actor); }
    }

    setActorSprite(actor) {

        //actor.sprite = new PIXI.TilingSprite(PIXI.Texture.EMPTY); /** Creamos el sprite de la imagen. */
        actor.sprite = new PIXI.Sprite(PIXI.Texture.EMPTY); /** Creamos el sprite de la imagen. */
        this.stage.addChild(actor.sprite); /** Añadimos el sprite al contenedor del sprites del actor. */
        this.spriteList.push(actor); /** Añadimos el actor a la lista de actualizacion de sprites. */
    }

    setActorText(actor) {

        actor.textStyle = new PIXI.TextStyle({}); /** Definimos el estilo del texto. */
        //actor.text = Util.updateTextToscope(actor.text, actor);
        actor.textSprite = new PIXI.Text("", actor.textStyle);
        this.stage.addChild(actor.textSprite);    /** Añadimos el texto al sprite contenedor */
        this.textList.push(actor); /** Añadimos el actor a la lista de actualizacion de texto. */
    }

    run() {

        //this.updateActors();
        this.renderer.render(this.stage);
    }

    updateActors() {

        var i;

        for(i = 0; i < this.textList.length; i++) {

            this.textList[i].setTextProperties();
        }

        for(i = 0; i < this.spriteList.length; i++) {

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