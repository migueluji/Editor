class Actor {

    constructor(actor) {

        /** Configuracion de propiedades y asignacion de valores por defecto 
         * --------------------------------------------------------------------- */
        this.sleeping       = actor.sleeping ? false : true || false;
        this.destroyActor   = actor.destroyActor            || false;

        this.name           = actor.name                    || "NewActor" + Util.random();
        this.x              = actor.x                       || 0;
        this.y              = -actor.y                      || 0;
        this.scaleX         = actor.scaleX                  || 1;
        this.scaleY         = actor.scaleY                  || 1;
        this.width          = actor.width                   || 64;
        this.height         = actor.height                  || 64;
        this.radius         = Math.max(this.width, this.height) / 2;
        this.flipX          = actor.flipX                   || 1;
        this.flipY          = actor.flipY                   || 1;
        this.angle          = Util.degToRad(actor.angle)    || 0;

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
        this.color          = actor.color                   || "#ffffff";
        this.opacity        = actor.opacity                 || 1;
        this.scrollX        = actor.scrollX                 || 0;
        this.scrollY        = actor.scrollY                 || 0;
        this.text           = actor.text                    || "";
        this.align          = actor.align                   || "left";
        this.font           = actor.font                    || "Arial";
        this.fill           = actor.fill                    || "#333333";
        this.size           = actor.size                    || 30;
        this.style          = actor.style                   || "normal";
        
        this.render         = null;                                         /** Contenedor del sprite y del textSprite. */
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

        /** Variables custom
         * --------------------------------------------------------------------- */
        for(var i in actor) {

            if(!this.hasOwnProperty(i)) {
                
                this[i] = actor[i];
            }
        }
    }
    
    getPhysicsProperties(scaleFactor) {

        this.x                  = this.physicBody.m_body.m_xf.position.x / scaleFactor;
        this.y                  = this.physicBody.m_body.m_xf.position.y / scaleFactor;
        this.angle              = this.physicBody.m_body.GetAngle();

        this.velocityX          = this.physicBody.m_body.GetLinearVelocity().x;
        this.velocityY          = this.physicBody.m_body.GetLinearVelocity().y;

        this.angularVelocity    = this.physicBody.m_body.GetAngularVelocity();

        // TODO: Get linear damping

        // TODO: Get angular damping
    }

    setRenderProperties() {

        this.render.position.x  = this.x - this.width / 2;
        this.render.position.y  = this.y - this.height / 2;
        this.render.rotation    = this.angle;

        this.sprite.tilePosition.x += this.scrollX * 0.01;
        this.sprite.tilePosition.y += this.scrollY * 0.01;

        this.sprite.scale.set(/*this.scaleX * */this.flipX, /*this.scaleY * */this.flipY); // Para actualizaciones de los flips
    }

    setTextProperties() {

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

    get destroyActor() { return this._destroyActor; }
    set destroyActor(value) {

        /** Actualizamos la propiedad de la estructura de datos del actor.*/
        this._destroyActor = value;

        /** Si el valor es positivo, añadimos el actor a la lista de destruccion. */
        /*if(this._destroyActor) {

            player.engine.addDestroyedActor(this);
        }*/
    }

    get spriteName() { return this._spriteName;}
    set spriteName(value) {

        /** Actualizamos la propiedad de la estructura de datos del actor.*/
        this._spriteName = value;

        /** Actualizamos la textura en la estructura de datos de Render. */
        if(this.sprite != null) {
        
            this.sprite.texture = (this._spriteName != null) ? new PIXI.Texture.from(this._spriteName) : PIXI.Texture.EMPTY;
        }
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
}