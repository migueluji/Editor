class Actor {

    constructor(actor) {

        /** Configuracion de propiedades y asignacion de valores por defecto 
         * --------------------------------------------------------------------- */
        this.sleeping       = actor.sleeping ? false : true || false;
        this.destroyActor   = actor.destroyActor            || false;

        this.name           = actor.name                    || "NewActor" + Util.random();
        this.x              = actor.x                       || 0;
        this.y              = actor.y                       || 0;
        this.width          = actor.width                   || 64;
        this.height         = actor.height                  || 64;
        this.scaleX         = actor.scaleX                  || 1;
        this.scaleY         = actor.scaleY                  || 1;
        this.originalWidth  = actor.width / actor.scaleX;
        this.originalHeight = actor.height / actor.scaleY;
        this.radius         = Math.max(this.width, this.height) / 2;
        this.flipX          = actor.flipX                   || false;
        this.flipY          = actor.flipY                   || false;
        this.angle          = actor.angle                   || 0;

        //console.log(actor.name, actor.angle);

        this.interactiveOn  = false;                        

        this.screen         = actor.screen                  || false;

        this.velocityX      = actor.velocityX               || 0;
        this.velocityY      = actor.velocityY               || 0;
        this.fixedRotation  = actor.fixedRotation           || false;
        this.density        = actor.density                 || 1.0;
        this.friction       = actor.friction                || 0.5;
        this.restitution    = actor.restitution             || 0.2;
        this.physics        = actor.physics                 || false;
        this.physicMode     = actor.physicMode              || "Dynamic";
        this.physicBody     = null;

        this.image          = actor.image                   || null;
        this.color          = actor.color                   || "0xffffff";
        this.opacity        = actor.opacity                 || 1;
        this.scrollX        = actor.scrollX                 || 0;
        this.scrollY        = actor.scrollY                 || 0;

        this.text           = actor.text                    || "";
        this.align          = actor.align                   || "left";
        this.font           = actor.font                    || "Arial";
        this.fill           = actor.fill                    || "#333333";
        this.size           = actor.size                    || 30;
        this.style          = actor.style                   || "normal";
        this.offsetX        = actor.offsetX                 || 0;
        this.offsetY        = actor.offsetY                 || 0;
        
        this.render         = null;                         /** Contenedor del sprite y del textSprite. */
        this.sprite         = null;
        this.textSprite     = null;

        this.soundFile      = actor.sound                   || "";          /** */
        this.pan            = actor.pan                     || 0;           /** */
        this.volume         = actor.volume                  || 1;           /** */
        this.playSound      = actor.playSound               || false;       /** */
        this.loop           = actor.loop                    || false;       /** */

        this.collisionOn    = false;                                        /** Propiedad de ejecucion. */
        this.collisionList  = {};                                           /** Propiedad de ejecucion. */
        this.tags           = this.setTags(actor.tags);
        this.collider       = actor.collider                || "Circle";
        this.physicVertices = actor.physicVertices          || null; 

        this.localScope     = {};

        /** Variables custom
         * --------------------------------------------------------------------- */
        for(var i in actor) {

            if(!this.hasOwnProperty(i)) {
                
                this[i] = actor[i];
            }
        }
    }
    
    getPhysicsProperties(scaleFactor) {

        /*this.x                  = this.physicBody.m_body.m_xf.position.x / scaleFactor;
        this.y                  = this.physicBody.m_body.m_xf.position.y / scaleFactor;
        this.angle              = this.physicBody.m_body.GetAngle();

        this.velocityX          = this.physicBody.m_body.GetLinearVelocity().x;
        this.velocityY          = this.physicBody.m_body.GetLinearVelocity().y;

        this.angularVelocity    = this.physicBody.m_body.GetAngularVelocity();*/

        // TODO: Get linear damping

        // TODO: Get angular damping
    }

    setSpriteProperties() {

        this.sprite.tilePosition.x += this.scrollX * player.engine.game.deltaTime;
        this.sprite.tilePosition.y += this.scrollY * player.engine.game.deltaTime;

        //this.sprite.scale.set(/*this.scaleX * */this.flipX, /*this.scaleY * */this.flipY); // Para actualizaciones de los flips
        
        this.sprite.updateTransform();
    }

    setTextProperties() {

        //console.log(this.compiledText);

        //this.text = Util.updateTextToLocalScope(this.text, this, player.engine.actoList);

        //console.log(this.text);

        this.compiledText = eval("` " + this.text + "`");

        //console.log(this, this.text, this.compiledText);

        this.textSprite.text = this.compiledText;
    }

    setTags(tags) {

        if(tags == "") { return {}; }

        var aux = {};
        var t = tags.split(',');

        for(var i = 0; i < t.length; i++) {

            aux[t[i]] = true;
        }

        return aux;
    }

    destroy() {

        Util.deepDestroy(this);
    }




    /** ###############################################################################
     *  Control sobre el cambio de propiedades en ejecucion.
     *  ############################################################################### */

    get x() { return this._x; }
    set x(value) { 

        this._x = value;
        
        /** Actualizamos la estructura de datos de Render. */
        if(this.render != null) {

            this.render.position.x = this.x;
        }
    }

    get y() { return this._y; }
    set y(value) { 

        this._y = value;

        /** Actualizamos la estructura de datos de Render. */
        if(this.render != null) {

            this.render.position.y = -this.y;
        }
    }

    get angle() { return this._angle; }
    set angle(value) {

        this._angle = value;

        /** Actualizamos la estructura de datos de Render. */
        if(this.render != null) {

            this.render.rotation = Util.degToRad(-this._angle);
        }
    }

    get width() { return this._width; }
    set width(value) {

        this._width  = value;
        this._scaleX = this._width / this.originalWidth;

        /** Actualizamos la estructura de datos de Render. */
        if(this.render != null) {
        
            this.render.scale.x = this._scaleX * (this._flipX ? -1 : 1);
        }
    }

    get scaleX() { return this._scaleX; }
    set scaleX(value) {

        this._scaleX = value;
        this._width  = this.originalWidth * this._scaleX;

        /** Actualizamos la estructura de datos de Render. */
        if(this.render != null) {
        
            this.render.scale.x = this._scaleX * (this._flipX ? -1 : 1);
        }
    }


    get height() { return this._height; }
    set height(value) {

        this._height  = value;
        this._scaleY = this._height / this.originalHeight;

        /** Actualizamos la estructura de datos de Render. */
        if(this.render != null) {
        
            this.render.scale.y = this._scaleY * (this._flipY ? -1 : 1);
        }
    }

    get scaleY() { return this._scaleY; }
    set scaleY(value) {

        this._scaleY = value;
        this._height  = this.originalHeight * this._scaleY;

        /** Actualizamos la estructura de datos de Render. */
        if(this.render != null) {
        
            this.render.scale.y = this._scaleY * (this._flipY ? -1 : 1);
        }
    }

    get flipX() { return this._flipX; }
    set flipX(value) { 

        this._flipX = value;

        if(this.sprite != null) {

            this.sprite.scaleX *= this._flipX ? -1 : 1;
        }
    }

    get flipY() { return this._flipY; }
    set flipY(value) { 

        this._flipY = value;

        if(this.sprite != null) {

            this.sprite.scaleY *= this._flipY ? -1 : 1;
        }
    }

    get tileX() { return this._tileX; }
    set tileX(value) {

        this._tileX = value;

        /** Actualizamos la estructura de datos de Render. */
        if(this.sprite != null) {

            console.log(this._tileX, this._width);
        
            this.sprite.width = this._tileX * this._width;
        }
    }

    get tileY() { return this._tileY; }
    set tileY(value) {

        this._tileY = value;

        /** Actualizamos la estructura de datos de Render. */
        if(this.sprite != null) {
            
            this.sprite.height = this._tileY * this._height;
        }
    }

    get image() { return this._image; }
    set image(value) {

        this._image = value;
        this.texture = (player.file.loader.resources[this._image] != undefined) ? player.file.loader.resources[this._image].texture : PIXI.Texture.WHITE;
    }

    get destroyActor() { return this._destroyActor; }
    set destroyActor(value) {

        /** Actualizamos la propiedad de la estructura de datos del actor.*/
        this._destroyActor = value;

        /** Si el valor es positivo, añadimos el actor a la lista de destruccion. */
        /*if(this._destroyActor) {

            player.engine.addDestroyedActor(this);
        }*/
    }

    get alpha() { return this._alpha };
    set alpha(value) {

        /** Actualizamos la propiedad de la estructura de datos del actor.*/
        this._alpha = Util.clamp(value, 0, 1);

        /** Actualizamos la textura en la estructura de datos de Render. */
        if(this.sprite != null) {
        
            this.sprite.alpha = this._alpha;
        }
    };

    get tint() { return this._tint };
    set tint(value) {

        /** Actualizamos la propiedad de la estructura de datos del actor.*/
        this._tint = Util.colorFormat(value);

        /** Actualizamos la textura en la estructura de datos de Render. */
        if(this.sprite != null) {
        
            this.sprite.tint = this._tint;
        }
    };

    get offsetX() { return this._offsetX; }
    set offsetX(value) { 

        this._offsetX = value;

        /** Actualizamos la textura en la estructura de datos de Render. */
        if(this.textSprite != null) {
        
            this.textSprite.x = this._offsetX;
        }
    }

    get offsetY() { return this._offsetY; }
    set offsetY(value) { 

        this._offsetY = value;

        /** Actualizamos la textura en la estructura de datos de Render. */
        if(this.textSprite != null) {
        
            this.textSprite.y = -this._offsetY;
        }
    }
}