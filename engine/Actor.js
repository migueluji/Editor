class Actor {

    constructor(actor, engine) {

        /**
         * 
         */
        this.engine = engine;

        //console.log(this.engine);

        /** Configuracion de las propiedades de ejecucion en los componentes del motor.
         * --------------------------------------------------------------------------------- */
        //engine.physics.setActorPhysics(this);             // Añadir el actor al motor de fisicas.
        engine.render.setActorRender(this, actor);          // Añadir el actor al motor de render. 
        engine.audio.setActorAudio(this, actor);            // Añadir el actor al motor de audio.
        engine.logic.setActorLogic(this, actor);            // Añadir el actor al motor de logica.
        engine.input.setActorInput(this, actor);            // Añadir el actor al motor de input.
        engine.collision.setActorCollision(this, actor);    // Añadir el actor al motor de colisiones.

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
        this.collisionOn    = false;                                        /** Propiedad de ejecucion. */
        this.collisionList  = {};                                           /** Propiedad de ejecucion. */
        this.tags           = this.setTags(actor.tags);
        this.collider       = actor.collider                || "Circle";
        this.physicVertices = actor.physicVertices          || null; 

        /** Logic properties
         * ---------------------------------- */
        this.localScope     = {};

        /** Physics properties
         * ---------------------------------- */
        this.physicsOn       = actor.physicsOn               || false;       /** */
        this.velocityX       = actor.velocityX               || 0;
        this.velocityY       = actor.velocityY               || 0;
        this.angularVelocity = actor.angularVelocity               || 0;
        this.fixedAngle      = actor.fixedAngle           || false;
        this.density         = actor.density                 || 1.0;
        this.friction        = actor.friction                || 0.5;
        this.restitution     = actor.restitution             || 0.2;
        this.dampingLinear    = actor.dampingLinear             || 1.0;
        this.dampingAngular    = actor.dampingAngular             || 1.0;
        this.physics        = actor.physics                 || false;
        this.type     = actor.type              || "Dynamic";

        /** Settings properties
         * ---------------------------------- */
        this.name           = actor.name                    || "NewActor" + Util.random();
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

        /** Variables custom
         * --------------------------------------------------------------------- */
        for(var i in actor) { if(!(i in this)) { console.log(i, this[i]); } /*if(!this.hasOwnProperty(i)) { console.log(i, this[i]); this[i] = actor[i]; }*/ }

        //console.log(actor.name, this);
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
        
        //this.sprite.updateTransform();
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

        if(this._spriteOn) { this.sprite.x = this._x; }
        //if(this._textOn) { this.textSprite.x = this._x; }
    }

    get y() { return this._y; }
    set y(value) { 

        this._y = value;

        if(this._spriteOn) { this.sprite.y = -this._y; }
        //if(this._textOn) { this.textSprite.y = -this._y; }
    }

    get angle() { return this._angle; }
    set angle(value) {

        this._angle = value;

        if(this._spriteOn) { this.sprite.rotation = Util.degToRad(-this._angle); }
        //if(this._textOn) { this.textSprite.rotation = Util.degToRad(-this._angle); console.log("entra", this.textSprite.scale);}
    }

    get screen() { return this._screen; }
    set screen(value) { 
        
        this._screen = value;

        if(this._screen) {

            this.originalPositionX = this._x;
            this.originalPositionY = this._y; 

            this.engine.render.onScreenList[this.ID] = this;
        }
        else {

            Util.destroy(this.engine.render.onScreenList, this.ID);
        }
    }

    get width() { return this._width; }
    set width(value) {

        this._width  = value;
        this._scaleX = this._width / this.originalWidth;
        
        if(this._spriteOn) { this.sprite.width = this._width; }
        //if(this._textOn) { this.textSprite.scale.x = 1; this._textSprite.width = this._width; }

        console.log(this.textSprite);
    }

    get scaleX() { return this._scaleX; }
    set scaleX(value) {

        this._scaleX = value;
        this._width  = this.originalWidth * this._scaleX;

        if(this._spriteOn) { this.sprite.scale.x = this._scaleX * (this._flipX ? -1 : 1); }
        //if(this._textOn) { this.textSprite.width = this.width; }
    }


    get height() { return this._height; }
    set height(value) {

        this._height  = value;
        this._scaleY = this._height / this.originalHeight;

        if(this._spriteOn) { this.sprite.height = this._height; }
        //if(this._textOn) { this.textSprite.height = this._height; }
    }

    get scaleY() { return this._scaleY; }
    set scaleY(value) {

        this._scaleY = value;
        this._height  = this.originalHeight * this._scaleY;

        if(this._spriteOn) { this.sprite.scale.y = this._scaleY * (this._flipY ? -1 : 1); }
        //if(this._textOn) { this.textSprite.height = this._height; }
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

        if(this._spriteOn) { this.sprite.width = this._tileX * this._width; }
    }

    get tileY() { return this._tileY; }
    set tileY(value) {

        this._tileY = value;

        if(this._spriteOn) { this.sprite.height = this._tileY * this._height; }
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

        if(this._spriteOn) { this.sprite.tint = this._color; }
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

        this._align = value;

        if(this._textOn) { this.textStyle.align = this._align; }
    }

    get style() { return this._style; }
    set style(value) {

        this._style = value;

        if(this._textOn) {

            this.textStyle.fontStyle        = this._style == "italic-bold" ? "italic" : this._style;
            this.textStyle.fontWeight       = this._style == "italic-bold" ? "bold" : "normal";
            this.textStyle.wordWrap         = true;
            this.textStyle.wordWrapWidth    = this._width;
            this.textStyle.padding          = this._width;
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
        //this._textSprite.anchor.set(0);
    }

    get localScope() { return this._localScope; }
    set localScope(value) {

        this._localScope = value;
        this._localScope.Me = this;
        this._localScope.engine = this.engine;
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
}