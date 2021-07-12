class Actor {

    constructor(actor, engine) {

        /**
         * Propiedades de control del motor
         * --------------------------------------------------------------------- */
        this.engine          = engine;
        this.index           = actor.index  || 0;           /** Indices para le orden de visualizacion. */
        this.spawn           = actor.spawn  || false;       /** Propiedad de control para el orden de visualizacion de los spawns. */
        this.loaded          = false;   

        /** Configuracion de las propiedades de ejecucion en los componentes del motor.
         * --------------------------------------------------------------------- */
        this.engine.render.setActorRender(this, actor);     /** Añadir el actor al motor de render. */ 
        this.engine.audio.setActorAudio(this, actor);       /** Añadir el actor al motor de audio. */ 
        this.engine.logic.setActorLogic(this, actor);       /** Añadir el actor al motor de logica. */ 
        this.engine.input.setActorInput(this, actor);       /** Añadir el actor al motor de input. */ 
        this.engine.physics.setActorPhysics(this, actor);   /** Añadir el actor al motor de fisicas. */ 

        /**
         * General properties
         * --------------------------------------------------------------------- */
        this.name            = actor.name                    || "NewActor" + Util.random();
        this.scene           = this.engine.game.activeScene  || null;
        this.ID              = actor.ID                      || actor.name  + Util.random();
        this.sleeping        = actor.sleeping;
        this.destroyActor    = actor.destroyActor            || false;

        /** Sprite properties
         * --------------------------------------------------------------------- */
        this.image           = actor.image                   || "";
        this.spriteOn        = actor.spriteOn                || false;
        this.color           = actor.color                   || "0xffffff";
        this.opacity         = actor.opacity                 || 1;
        this.scrollX         = actor.scrollX                 || 0;
        this.scrollY         = actor.scrollY                 || 0;
        this.flipX           = actor.flipX                   || false;
        this.flipY           = actor.flipY                   || false;

        /** Text properties
         * --------------------------------------------------------------------- */
        this.text            = actor.text                    || "";
        this.textOn          = actor.textOn                  || false;
        this.align           = actor.align                   || "left";
        this.font            = actor.font                    || "Arial";
        this.fill            = actor.fill                    || "#333333";
        this.size            = actor.size                    || 30;
        this.style           = actor.style                   || "normal";
        this.offsetX         = actor.offsetX                 || 0;
        this.offsetY         = actor.offsetY                 || 0;

        /** Input properties
         * --------------------------------------------------------------------- */
        this.interactiveOn   = false;

        /** Audio properties
         * --------------------------------------------------------------------- */
        this.sound           = actor.sound                   || "";          /** */
        this.soundOn         = actor.soundOn                 || false;       /** */
        this.pan             = actor.pan                     || 0;           /** */
        this.volume          = actor.volume                  || 1;           /** */
        this.start           = actor.start                   || false;       /** */
        this.loop            = actor.loop                    || false;       /** */

        /** Collision properties
         * --------------------------------------------------------------------- */
        this.tags            = actor.tags                    || [];
        this.collider        = actor.collider                || "Circle";
        this.physicVertices  = actor.physicVertices          || null; 

        /** Physics properties
         * --------------------------------------------------------------------- */
        this.physicsOn       = actor.physicsOn              || false;       /** */
        this.velocityX       = actor.velocityX              || 0;
        this.velocityY       = actor.velocityY              || 0;
        this.angularVelocity = actor.angularVelocity        || 0;
        this.fixedAngle      = actor.fixedAngle             || false;
        this.linearDamping   = actor.dampingLinear          || 0.0;
        this.angularDamping  = actor.dampingAngular         || 0.0;
        this.density         = actor.density                || 0.0;
        this.friction        = actor.friction               || 0.0;
        this.restitution     = actor.restitution            || 0.0;
        this.type            = actor.type                   || "Dynamic";

        /** Settings properties
         * --------------------------------------------------------------------- */
        this.x               = actor.x                       || 0;
        this.y               = actor.y                       || 0;
        this.angle           = actor.angle                   || 0;
        this.screen          = actor.screen                  || false;
        this.scaleX          = actor.scaleX                  || 1;
        this.scaleY          = actor.scaleY                  || 1;
        this.tileX           = actor.tileX                   || 1;
        this.tileY           = actor.tileY                   || 1;
        this.width           = actor.width                   || 50;
        this.height          = actor.height                  || 50;
        this.radius          = Math.max(this.width, this.height) / 2;

        /** Logic properties
         * --------------------------------------------------------------------- */
        // Las gestiona el motor de logica (ver Logic.setActorLogic()).

        /** Variables añadidas por el usuario
         * --------------------------------------------------------------------- */
        for(var i in actor) { if(!(i in this)) { this[i] = actor[i]; } }

        /**
         * Actualizacion de la variable de control de la carga de informacion
         * --------------------------------------------------------------------- */
        this.loaded = true;
    }

    setSpriteProperties() {

        this.sprite.alpha = this.opacity;

        if(!this._sleeping && this.spriteOn && (this.scrollX != 0 || this.scrollY != 0)) {

            this.sprite.cacheAsBitmap = false;
            this.sprite.tilePosition.x += this.scrollX * this.engine.game.deltaTime;
            this.sprite.tilePosition.y += this.scrollY * this.engine.game.deltaTime;
            this.sprite.cacheAsBitmap = true;
        }
    }

    setTextProperties() {  this.textSprite.text = eval("`" + this.text + "`");  }

    destroy() { Util.deepDestroy(this); }

    sleep(renderVisible) {

        this.engine.physics.sleep(this);
        this.engine.input.sleep(this);
        this.engine.logic.sleep(this);
        this.engine.audio.sleep(this);
        if(renderVisible != undefined && !renderVisible) { this.engine.render.sleep(this); }
    }

    awake() {

        this.engine.physics.awake(this);
        this.engine.input.awake(this);
        this.engine.logic.awake(this);
        this.engine.audio.awake(this);
        this.engine.render.awake(this);
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

            Util.removeByID(this.engine.render.onScreenList, this.ID);
        }
    }

    get width() { return this._width; }
    set width(value) {

        this._width  = value;
        this._scaleX = this._width / (this.originalWidth * this._tileX);

        this.engine.render.updateSpriteDimensions(this);
        this.engine.render.updateTextDimensions(this);
        this.engine.physics.updateRigidbody(this);
    }

    get scaleX() { return this._scaleX; }
    set scaleX(value) {

        this._scaleX = value;
        this._width  = this.originalWidth * this._scaleX * this._tileX;

        this.engine.render.updateSpriteDimensions(this);
        this.engine.render.updateTextDimensions(this);
        this.engine.physics.updateRigidbody(this);
    }

    get tileX() { return this._tileX; }
    set tileX(value) {

        this._tileX  = value;
        this._width  = this.originalWidth * this._tileX * this._scaleX;
        this._scaleX = this._width / (this.originalWidth * this._tileX);

        this.engine.render.updateSpriteDimensions(this);
        this.engine.render.updateTextDimensions(this);
        this.engine.physics.updateRigidbody(this);
    }


    get height() { return this._height; }
    set height(value) {

        this._height = value;
        this._scaleY = this._height / (this.originalHeight * this._tileY);
        
        this.engine.render.updateSpriteDimensions(this);
        this.engine.physics.updateRigidbody(this);
    }

    get scaleY() { return this._scaleY; }
    set scaleY(value) {

        this._scaleY = value;
        this._height = this.originalHeight * this._scaleY * this._tileY;

        this.engine.render.updateSpriteDimensions(this);
        this.engine.physics.updateRigidbody(this);
    }

    get tileY() { return this._tileY; }
    set tileY(value) {

        this._tileY  = value;
        this._height = this.originalHeight * this._tileY * this._scaleY;
        this._scaleY = this._height / (this.originalHeight * this._tileY);

        this.engine.render.updateSpriteDimensions(this);
        this.engine.physics.updateRigidbody(this);
    }

    get flipX() { return this._flipX; }
    set flipX(value) { 

        this._flipX = value;

        this.engine.render.updateSpriteDimensions(this);
    }

    get flipY() { return this._flipY; }
    set flipY(value) { 

        this._flipY = value;

        this.engine.render.updateSpriteDimensions(this);
    }

    get image() { return this._image; }
    set image(value) {

        this._image = value;

        this.texture = (_player.file.loader.resources[this._image] != undefined) ? _player.file.loader.resources[this._image].texture : PIXI.Texture.WHITE;
   
        if(this.sprite != null) {

            this.sprite.cacheAsBitmap   = false;
            this.sprite.texture         = this.texture;
            this.sprite.alpha           = this._opacity;
            this.sprite.anchor.set(0.5001);
            this.sprite.cacheAsBitmap   = true;
        }

        this.originalWidth  = this.texture.orig.width;
        this.originalHeight = this.texture.orig.height;

        this._width  = this.originalWidth * this._tileX * this._scaleX;
        this._height = this.originalHeight * this._tileY * this._scaleY;

        this.engine.render.updateSpriteDimensions(this);
        //this.engine.render.updateTextDimensions(this);
        //this.engine.physics.updateRigidbody(this);
    }

    get spriteOn() { return this._spriteOn; }
    set spriteOn(value) {

        this._spriteOn = value;

        if(this._spriteOn) { 

            if(this.sprite != null) this.sprite.cacheAsBitmap = false;
            this.sprite.texture = this.texture; 
            if(this.sprite != null) this.sprite.cacheAsBitmap = true;
        }
    }

    get opacity() { return this._opacity; }
    set opacity(value) {

        this._opacity = Util.clamp(value, 0, 1);

        if(this._spriteOn) { 
            
            this.sprite.cacheAsBitmap = false;
            this.sprite.alpha = this._opacity;
            this.sprite.cacheAsBitmap = true;
        }
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

        this._text = this.loaded ? Util.updateTextToScope(value, this) : value;

        if(this._textOn) { this.textSprite.text = this._text; }
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

        this.engine.render.updateTextDimensions(this);
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

        this._destroyActor = value;

        if(this._destroyActor) {

            this.engine.addDestroyedActor(this);
        }
    }

    get tags() { return this._tags; }
    set tags(value) {

        this._tags = (value == "" || value == undefined) ? [] : value.split(','); 
    }

    get sleeping() { return this._sleeping; }
    set sleeping(value) {

        this._sleeping = value;

        if(this.loaded && this._sleeping) {

            var renderVisible = this.___sleeping != undefined;
            this.sleep(renderVisible);
        }
        else if(this.loaded && !this._sleeping) {

            this.awake();
        }
    }

    get physicsOn() { return this._physicsOn; }
    set physicsOn(value) {

        this._physicsOn = value;

        if(this.loaded) {

            if(this._physicsOn) {

                this.rigidbody.m_body.SetActive(this._physicsOn);
                this.rigidbody.SetSensor(false);
            }
            else if(!this._physicsOn && this.triggerOn) {

                this.rigidbody.SetSensor(true);
            }
            else {

                this.rigidbody.m_body.SetActive(this._physicsOn);
                this.rigidbody.SetSensor(false);
            }
        }
    }

    get velocityX() { return this._velocityX; }
    set velocityX(value) { 
        this._velocityX = value;
        if(this._physicsOn) { this.rigidbody.m_body.m_linearVelocity.x = this._velocityX / this.engine.physics.PIXELS_PER_METER; } 
    }

    get velocityY() { return this._velocityY; }
    set velocityY(value) { 
        this._velocityY = value;
        if(this._physicsOn) { this.rigidbody.m_body.m_linearVelocity.y = this._velocityY / this.engine.physics.PIXELS_PER_METER; } 
    }

    get angularVelocity() { return this._angularVelocity; }
    set angularVelocity(value) {
        this._angularVelocity = value;
        if(this._physicsOn) { this.rigidbody.m_body.SetAngularVelocity(this._angularVelocity); }
    }

    get fixedAngle() { return this._fixedAngle; }
    set fixedAngle(value) {
        this._fixedAngle = value;
        if(this._physicsOn) { this.rigidbody.m_body.SetFixedRotation(this._fixedAngle); }
    }

    get linearDamping() { return this._linearDamping; }
    set linearDamping(value) {
        this._linearDamping = value;
        if(this._physicsOn) { this.rigidbody.m_body.SetLinearDamping(this._linearDamping); }
    }

    get angularDamping() { return this._angularDamping; }
    set angularDamping(value) {
        this._angularDamping = value;
        if(this._physicsOn) { this.rigidbody.m_body.SetAngularDamping(this._angularDamping); }
    }

    get density() { return this._density; }
    set density(value) {
        this._density = value;
        if(this._physicsOn) { this.rigidbody.SetDensity(this._density); }
    }

    get friction() { return this._friction; }
    set friction(value) {
        this._friction = value;
        if(this._physicsOn) { this.rigidbody.SetFriction(this._friction); }
    }

    get restitution() { return this._restitution; }
    set restitution(value) {
        this._restitution = value;
        if(this._physicsOn) { this.rigidbody.SetRestitution(this._restitution); }
    }

    get index() { return this._index; }
    set index(value) {

        this._index = value;

        if(this._spriteOn) { this.sprite.zIndex     = this._index; }
        if(this._textOn)   { this.textSprite.zIndex = this._index; }
    }
}