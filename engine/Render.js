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

        //this.loadFonts(render.assets.fonts);
    }

    setActorRender(actor, data) {
            
        if(data.spriteOn) { this.setActorSprite(actor); } /** Creamos el sprite de la textura. */
        if(data.textOn) { this.setActorText(actor); } /** Creamos el sprite de la texto. */
    }

    setActorSprite(actor) {

        actor.sprite = new PIXI.TilingSprite(PIXI.Texture.EMPTY); /** Creamos el sprite de la imagen. */
        actor.sprite.cacheAsBitmap = true;
        this.stage.addChild(actor.sprite); /** Añadimos el sprite al contenedor del sprites del actor. */
        this.spriteList.push(actor); /** Añadimos el actor a la lista de actualizacion de sprites. */
    }

    setActorText(actor) {

        actor.textStyle = new PIXI.TextStyle({}); /** Definimos el estilo del texto. */
        actor.textSprite = new PIXI.Text("", actor.textStyle);
        this.stage.addChild(actor.textSprite);    /** Añadimos el texto al sprite contenedor */
        this.textList.push(actor); /** Añadimos el actor a la lista de actualizacion de texto. */
    }

    run() {

        this.updateActors();
        this.renderer.render(this.stage);
    }

    updateActors() {

        let i;
        for(i = 0; i < this.textList.length; i++) { this.textList[i].setTextProperties(); }
        for(i = 0; i < this.spriteList.length; i++) { this.spriteList[i].setSpriteProperties(); }
    }

    compileTexts() {

        for(var i = 0; i < this.textList.length; i++) {

            this.textList[i].text = Util.updateTextToScope(this.textList[i].text, this.textList[i]);
        }
    }

    updateSpriteDimensions(actor) {

        if(actor.spriteOn) { 
        
            actor.sprite.cacheAsBitmap  = false; 
            
            if(actor.image != "") { 

                actor.sprite.width      = actor.width   * (1 / actor.scaleX);
                actor.sprite.height     = actor.height  * (1 / actor.scaleY);

                actor.sprite.scale.x    = actor.scaleX  * (actor.flipX ? -1 : 1); 
                actor.sprite.scale.y    = actor.scaleY  * (actor.flipY ? -1 : 1);
            }
            else {

                actor.sprite.width      = actor.width;
                actor.sprite.height     = actor.height;
            }

            actor.sprite.cacheAsBitmap  = true; 
        }
    }

    updateTextDimensions(actor) {

        if(actor.textOn) { 
        
            actor.textStyle.wordWrapWidth = actor.width; 
            actor.textStyle.padding       = actor.width;

            actor.textStyle.align = actor.align;

            switch(actor.align) {

                case "left": 
                    actor.textSprite.pivot.x = actor.width / 2;
                    actor.textSprite.anchor.x = 0.0;
                    break;

                case "right": 
                    actor.textSprite.pivot.x = -actor.width / 2;
                    actor.textSprite.anchor.x = 1.0;
                    break;

                case "center": 
                    actor.textSprite.pivot.x = 0.0;
                    actor.textSprite.anchor.x = 0.5;
                    break; 
            }
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