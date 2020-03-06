class Actor {

    constructor(actor, engine) {

        this.engine = engine;

        /** Configuracion de las propiedades de ejecucion en los componentes del motor.
         * --------------------------------------------------------------------------------- */
        engine.render.setActorRender(this, actor);          // Añadir el actor al motor de render. 
        //engine.audio.setActorAudio(this, actor);            // Añadir el actor al motor de audio.
        engine.logic.setActorLogic(this, actor);            // Añadir el actor al motor de logica.
        engine.input.setActorInput(this, actor);            // Añadir el actor al motor de input.
        engine.physics.setActorPhysics(this, actor);             // Añadir el actor al motor de fisicas.
        //engine.collision.setActorCollision(this, actor);    // Añadir el actor al motor de colisiones.

        /** Sprite properties
         * ---------------------------------- */
        this.image          = actor.image                   || "";
        this.spriteOn       = actor.spriteOn                || false;
        this.color          = actor.color                   || "0xffffff";
        this.opacity        = actor.opacity                 || 1;
        this.scrollX        = actor.scrollX                 || 0;
        this.scrollY        = actor.scrollY                 || 0;
        this.flipX          = actor.flipX                   || false;
        this.flipY          = actor.flipY                   || false;

        //console.log(actor.scrollX, actor.scrollY, "---", this.scrollX, this.scrollY);

        /** Text properties
         * ---------------------------------- */
        this.text           = actor.text                    || "";
        this.textOn         = actor.textOn                  || false;
        this.align          = actor.align                   || "left";
        this.font           = actor.font                    || "Arial";
        this.fill           = actor.fill                    || "#333333";
        this.size           = actor.size                    || 30;
        this.style          = actor.style                   || "normal";
        this.offsetX        = actor.offsetX                 || 0;
        this.offsetY        = actor.offsetY                 || 0;

        /** Input properties
         * ---------------------------------- */
        this.interactiveOn  = false;

        /** Audio properties
         * ---------------------------------- */
        this.sound          = actor.sound                   || "";          /** */
        this.soundOn        = actor.soundOn                 || false;       /** */
        this.pan            = actor.pan                     || 0;           /** */
        this.volume         = actor.volume                  || 1;           /** */
        this.start          = actor.start                   || false;       /** */
        this.loop           = actor.loop                    || false;       /** */

        /** Collision properties
         * ---------------------------------- */
        this.tags           = actor.tags                    || [];
        this.collider       = actor.collider                || "Circle";
        this.physicVertices = actor.physicVertices          || null; 

        /** Physics properties
         * ---------------------------------- */
        this.physicsOn       = actor.physicsOn              || false;       /** */
        this.velocityX       = actor.velocityX              || 0;
        this.velocityY       = actor.velocityY              || 0;
        this.angularVelocity = actor.angularVelocity        || 0;
        this.fixedAngle      = actor.fixedAngle             || false;
        this.linearDamping   = actor.linearDamping          || 1.0;
        this.angularDamping  = actor.angularDamping         || 1.0;
        this.density         = actor.density                || 1.0;
        this.friction        = actor.friction               || 0.5;
        this.restitution     = actor.restitution            || 0.2;
        this.type            = actor.type                   || "Dynamic";

        /** Settings properties
         * ---------------------------------- */
        this.name           = actor.name                    || "NewActor" + Util.random();
        this.scene          = this.engine.activeScene       || null;
        this.ID             = actor.ID                      || actor.name  + Util.random();
        this.sleeping       = actor.sleeping ? false : true || false;
        this.destroyActor   = actor.destroyActor            || false;
        this.x              = actor.x                       || 0;
        this.y              = actor.y                       || 0;
        this.angle          = actor.angle                   || 0;
        this.screen         = actor.screen                  || false;
        this.originalWidth  = actor.width / actor.scaleX;
        this.originalHeight = actor.height / actor.scaleY;
        this.width          = actor.width                   || 64;
        this.height         = actor.height                  || 64;
        this.scaleX         = actor.scaleX                  || 1;
        this.scaleY         = actor.scaleY                  || 1;
        this.radius         = Math.max(this.width, this.height) / 2;

        /** Logic properties
         * ---------------------------------- */
        //this.scope      = {};  // ESTO ESTA COMENTADO POR EL ORDEN. Al crear los motores arriba, necesitan esta informacion. Hay que arreglar esto.
        //this.scriptList = [];

        /** Variables custom
         * --------------------------------------------------------------------- */
        for(var i in actor) { if(!(i in this)) { this[i] = actor[i]; } }
    }

    setSpriteProperties() {

        this.sprite.tilePosition.x += this.scrollX * this.engine.game.deltaTime;
        this.sprite.tilePosition.y += this.scrollY * this.engine.game.deltaTime;
    }

    setTextProperties() {

        this.textSprite.text = eval("`" + this.text + "`");
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

        if(this._spriteOn) { this.sprite.x = this._x; }
        if(this._textOn) { this.textSprite.x = this._x; }
    }

    get y() { return this._y; }
    set y(value) { 

        this._y = value;

        if(this._spriteOn) { this.sprite.y = -this._y; }
        if(this._textOn) { this.textSprite.y = -this._y; }
    }

    get angle() { return this._angle; }
    set angle(value) {

        this._angle = value;

        if(this._spriteOn) { this.sprite.rotation = Util.degToRad(-this._angle); }
        if(this._textOn) { this.textSprite.rotation = Util.degToRad(-this._angle); }
    }

    get screen() { return this._screen; }
    set screen(value) { 
        
        this._screen = value;

        if(this._screen) {

            this.originalPositionX = this._x;
            this.originalPositionY = this._y; 

            this.engine.render.onScreenList.push(this);
        }
        else {

            //Util.destroy(this.engine.render.onScreenList, this.ID);

            /** TODO. Ahora son arrays, hay que eliminarlos eficientemente. */
        }
    }

    get width() { return this._width; }
    set width(value) {

        this._width  = value;
        this._scaleX = this._width / this.originalWidth;

        console.log(this.name, this._scaleX, this._width, this.originalWidth);

        if(this._spriteOn) { this.sprite.width = this.originalWidth * this._scaleX; }
        if(this._textOn) { 
            this.textStyle.wordWrapWidth = this._width; 
            this.textStyle.padding       = this._width; 
        }
    }

    get scaleX() { return this._scaleX; }
    set scaleX(value) {

        this._scaleX = value;
        this._width  = this.originalWidth * this._scaleX;

        if(this._spriteOn) { this.sprite.scale.x = this._scaleX * (this._flipX ? -1 : 1); }
    }


    get height() { return this._height; }
    set height(value) {

        this._height  = value;
        this._scaleY = this._height / this.originalHeight;

        if(this._spriteOn) { this.sprite.height = this._height; }
    }

    get scaleY() { return this._scaleY; }
    set scaleY(value) {

        this._scaleY = value;
        this._height  = this.originalHeight * this._scaleY;

        if(this._spriteOn) { this.sprite.scale.y = this._scaleY * (this._flipY ? -1 : 1); }
    }

    get flipX() { return this._flipX; }
    set flipX(value) { 

        this._flipX = value;

        if(this._spriteOn) { this.sprite.scale.x *= this._flipX ? -1 : 1; }
    }

    get flipY() { return this._flipY; }
    set flipY(value) { 

        this._flipY = value;

        if(this._spriteOn) { this.sprite.scale.y *= this._flipY ? -1 : 1; }
    }

    get tileX() { return this._tileX; }
    set tileX(value) {

        this._tileX = value;

        //if(this._spriteOn) { this.sprite.width = this._tileX * this._width; }
    }

    get tileY() { return this._tileY; }
    set tileY(value) {

        this._tileY = value;

        //if(this._spriteOn) { this.sprite.height = this._tileY * this._height; }
    }

    get image() { return this._image; }
    set image(value) {

        this._image = value;

        this.texture = (player.file.loader.resources[this._image] != undefined) ? player.file.loader.resources[this._image].texture : PIXI.Texture.WHITE;
    }

    get spriteOn() { return this._spriteOn; }
    set spriteOn(value) {

        this._spriteOn = value;

        if(this._spriteOn) { this.sprite.texture = this.texture; }
    }

    get alpha() { return this._alpha; }
    set alpha(value) {

        this._alpha = Util.clamp(value, 0, 1);

        if(this._spriteOn) { this.sprite.alpha = this._alpha; }
    }

    get color() { return this._color; }
    set color(value) {

        this._color = Util.colorFormat(value);

        if(this._spriteOn) { 

            this.sprite.cacheAsBitmap = false; 
            this.sprite.tint = this._color; 
            this.sprite.cacheAsBitmap = true; 
        }
    }

    get sprite () { return this._sprite; }
    set sprite(value) {

        this._sprite = value;

        this._sprite.anchor.set(0.5001); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
    }

    get textOn() { return this._textOn; }
    set textOn(value) {

        this._textOn = value;

        if(this._textOn) { 
            
            this._textSprite.text = this.text; 
        }
        else {

            if(this._textSprite != null) { this._textSprite.text = ""; } // TODO: Gestionar la no actualizacion.
        }
    }

    get text() { return this._text; }
    set text(value) {

        this._text = value.replace(/Me/g, "this.scope.Me");

    }

    get font() { return this._font; }
    set font(value) { 

        this._font = value;

        if(this._textOn) { this.textStyle.fontFamily = this._font; }
    }

    get size() { return this._size; }
    set size(value) { 

        this._size = value;

        if(this._textOn) { this.textStyle.fontSize = this._size; }
    }

    get fill() { return this._fill; }
    set fill(value) {

        this._fill = value;

        if(this._textOn) { this.textStyle.fill = this._fill; }
    }

    get align() { return this._align; }
    set align(value) {

        this._align = value.toLowerCase();

        if(this._textOn) { this.textStyle.align = this._align; /*console.log(this._align);*/ }
    }

    get style() { return this._style; }
    set style(value) {

        this._style = value;

        if(this._textOn) {

            this.textStyle.fontStyle        = this._style == "italic-bold" ? "italic" : this._style;
            this.textStyle.fontWeight       = this._style == "italic-bold" ? "bold" : "normal";
            this.textStyle.wordWrap         = true;
        }
    }

    get offsetX() { return this._offsetX; }
    set offsetX(value) { 

        this._offsetX = value;
        if(this._textOn) { this._textSprite.x = this._textSprite.x + this._offsetX; }
    }

    get offsetY() { return this._offsetY; }
    set offsetY(value) { 

        this._offsetY = value;
        if(this._textOn) { this._textSprite.y = this._textSprite.y + this._offsetY; }
    }

    get textSprite () { return this._textSprite; }
    set textSprite(value) {

        this._textSprite = value;
        this._textSprite.anchor.set(0.5);
    }

    get scope() { return this._scope; }
    set scope(value) {

        this._scope = value;
        this._scope.Me = this;
        this._scope.engine = this.engine;
    }

    get scriptList() { return this._scriptList; }
    set scriptList(value) {

        this._scriptList = value;
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

    get tags() { return this._tags; }
    set tags(value) {

        this._tags = (value == "" || value == undefined) ? [] : value.split(','); 
    }

    get sleeping() { return this._sleeping; }
    set sleeping(value) {

        this._sleeping = value;
/*
        if(value) {

            this.engine.enableActor(this);
        }
        else {

            this.engine.disableActor(this);
        }*/
    }

    get physicsOn() { return this._physicsOn; }
    set physicsOn(value) {
        this._physicsOn = value;
        //if(this.physicsOn) { this.rigidbody.m_body.SetActive(this._physicsOn); } 
    }

    get velocityX() { return this._velocityX; }
    set velocityX(value) { 
        this._velocityX = value;
    }

    get velocityY() { return this._velocityY; }
    set velocityY(value) { 
        this._velocityY = value;
    }
}