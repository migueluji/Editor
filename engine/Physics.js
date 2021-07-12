class Physics {

    constructor(engine) {

        this.engine                 = engine;   /** */

        this.rigidbodyList          = [];       /** */
        this.triggerList            = [];       /** */

        this.__rigidbodyListData    = [];       /** Lista auxiliar para almacenar los rigidbodies cuando !Game.physicsOn. */

        this.velocityIterations     = 10.0;     /** */
        this.positionIterations     = 8.0;      /** */
        this.PIXELS_PER_METER       = 50.0;     /** Para compensar el factor de escala del sistema de referencia de Box2D */ 

        this.world                  = null;     /** Gravity and sleep = true. */

        this.initWorld();
    }

    initWorld() {

        let gravity = (this.engine.game == undefined) ? new b2Vec2(0.0, 0.0) : new b2Vec2(this.engine.game.gravityX, this.engine.game.gravityY);

        this.world = new b2World(gravity, false); /** Gravity and sleep = false. Tiene que ser FALSE (si no linear_velocity puede no funcionar.) */
        this.world.SetContinuousPhysics(true);

        this.deltaTime   = 0.010;                        /** Valor de referencia para el ciclo de evaluacion de las fisicas. */
        this.accumulator = 0.000;                        /** Propiedad auxiliar para ajustar el numero de evaluaciones por iteracion fisica. */

        this.setContactListener();
    }

    clearWorld() {

        this.world = null;
        this.initWorld();
    }

    run() {

        this.updateWorld();

        this.accumulator += this.engine.game.deltaTime;

        while(this.accumulator >= this.deltaTime) {

            this.world.Step(this.deltaTime, this.velocityIterations, this.positionIterations);
            this.accumulator -= this.deltaTime;
            this.world.ClearForces();
        }
        
        this.updateGame();
    }

    reset() {

        this.resetCollisionFlags(this.triggerList);
        this.resetCollisionFlags(this.rigidbodyList);
    }

    resetCollisionFlags(list) {

        list.forEach(i => { 
            
            i.collisionList.forEach(j => { 
                
                i[j].value = i[j].end ? false : i[j].value; 
                i[j].end = !i[j].value && i[j].end; 
            });
        });
    }

    updateWorld() {

        for(var i = 0; i < this.rigidbodyList.length; i++) { this.updateBody(this.rigidbodyList[i]); }
        for(var i = 0; i < this.triggerList.length; i++) { this.updateBody(this.triggerList[i]); }
    }

    updateBody(actor) {

        actor.rigidbody.m_body.SetPosition(new b2Vec2(actor.x / this.PIXELS_PER_METER, actor.y / this.PIXELS_PER_METER));
        actor.rigidbody.m_body.SetAngle(Util.degToRad(actor.angle));
        // this.drawDebug(actor); // DEBUG
    }

    updateGame() {

        for(var i = 0; i < this.rigidbodyList.length; i++) { this.updateActor(this.rigidbodyList[i]); }
    }

    updateActor(actor) {

        actor.x                  = actor.rigidbody.m_body.GetPosition().x * this.PIXELS_PER_METER;
        actor.y                  = actor.rigidbody.m_body.GetPosition().y * this.PIXELS_PER_METER;
        actor.angle              = Util.radToDeg(actor.rigidbody.m_body.GetAngle());
        actor._velocityX         = actor.rigidbody.m_body.GetLinearVelocity().x * this.PIXELS_PER_METER;
        actor._velocityY         = actor.rigidbody.m_body.GetLinearVelocity().y * this.PIXELS_PER_METER; 
        actor._angularVelocity   = actor.rigidbody.m_body.GetAngularVelocity()  * this.PIXELS_PER_METER; 
    }

    setActorPhysics(actor, data) {

        /**
         *  ¿Actua como trigger?
         * -------------------------------------------------- */
        actor.triggerOn = (actor.triggerOn == undefined) ? (data.tags != undefined && data.tags.length > 0) : actor.triggerOn;
        if(actor.triggerOn && !actor.physicsOn) {  } /** Si es un trigger y no es un actor con fisicas, para evitar duplicados en los bucles y solo actualizar las posiciones de los fisicos. */

        /**
         * ¿Es un actor con fisicas o un trigger?
         * -------------------------------------------------- */
        if(data.physicsOn || actor.triggerOn) {

            actor.rigidbody = this.createPhysicsBody(data, actor);  /** Creacion del rigidbody en el sistema y en el mundo fisico de Box2D. */
            actor.rigidbody.SetUserData(actor);                     /** Definicion del objeto padre del rigidbody (NECESARIO PARA LA DETECCION DE COLISIONES). */
            actor.collisionList = (actor.collisionList == undefined) ? [] : actor.collisionList;

            if(data.physicsOn) { 

                if(this.engine.game.physicsOn) { this.rigidbodyList.push(actor); } /** Añadimos el actor a la lista de rigidbodies. */
                else {

                    this.__rigidbodyListData.push(actor);       /** Añadimos el actor a la lista auxiliar de rigidbodies. */
                    actor.rigidbody.m_body.SetActive(false);    /** Dormimos el rigidbody hasta que se activen las fisicas del juego. */
                }
            } 
            else {

                actor.rigidbody.SetSensor(true);    /** Activamos el rigidbody del actor como sensor, para que no interactue con otros rigidbodies. */
                this.triggerList.push(actor);       /** Añadimos el actor a la lista de triggers. */
            }

            /* DEBUG -- Borrar sin problemas */
                actor.physicsDebugSprite = new PIXI.Sprite();
                this.engine.render.stage.addChild(actor.physicsDebugSprite);
            /* FIN DEBUG */
        }
    }

    updateRigidbody(actor) {

        if(actor.loaded && (actor.physicsOn || actor.triggerOn)) {

            actor.radius = Math.max(actor.width, actor.height) / 2;

            this.destroyRigidbody(actor);
            actor.rigidbody = this.createPhysicsBody(actor, actor); /** Creacion del nuevo rigidbody en el sistema y en el mundo fisico de Box2D. */
            actor.rigidbody.SetUserData(actor);              /** Definicion del objeto padre del rigidbody (NECESARIO PARA LA DETECCION DE COLISIONES). */
            
            if(!actor.physicsOn) {

                actor.rigidbody.SetSensor(true);            /** Activamos el rigidbody del actor como sensor, para que no interactue con otros rigidbodies. */
            }
        }
    }

    createPhysicsBody(data, actor) {

        let body  = new b2BodyDef();
        body.type = this["set" + (data.physicsOn ? data.type : "Dynamic") + "Body"]();

        let fixture         = new b2FixtureDef();
        fixture.friction    = data.friction;
        fixture.density     = data.density;   
        fixture.restitution = data.restitution;   
        fixture.shape       = this["set" + data.collider + "Shape"](data, actor); /** Configuracion de la forma geometrica del objeto fisico */

        return this.world.CreateBody(body).CreateFixture(fixture); 
    }

    setDynamicBody() { return b2Body.b2_dynamicBody; }
    setKinematicBody() { return b2Body.b2_kinematicBody; }
    setStaticBody() { return b2Body.b2_staticBody; }

    setBoxShape(data, actor) {

        var shape = new b2PolygonShape;
        shape.SetAsBox(data.width / 2 / this.PIXELS_PER_METER, data.height / 2 / this.PIXELS_PER_METER); // Tiene que ser la mitad.
        return shape;
    }

    setCircleShape(data, actor) {

        var shape       = new b2CircleShape;
        shape.m_radius  = (Math.max(data.width, data.height) / 2) / this.PIXELS_PER_METER;
        return shape;
    }

    setPolygonShape(data, actor) {

        actor.sprite.calculateVertices();

        actor.polygonVertex = [];

        for(var i = 0; i < actor.sprite.vertexData.length; i++) {

            actor.polygonVertex.push(actor.sprite.vertexData[i]);
        }

        return this.setBoxShape(data);
    }
    
    createCustomPolygonShape(vertices, polygonShape) {

        var _vertices = [];

        for(var i = 0; i < vertices.length; i++) {

            _vertices.push(new b2Vec2(vertices[i].x, vertices[i].y));
        }

        polygonShape.SetAsArray(_vertices, _vertices.length);
    }

    drawDebug(actor) {

        for(var i = 0; i < actor.physicsDebugSprite.children.length; i++) { actor.physicsDebugSprite.children[i].destroy(); }
        actor.physicsDebugSprite.removeChildren();

        if(actor.collider == "Circle") { this.drawCircleShape(actor.physicsDebugSprite, actor); }
        else { this.drawPolygonShape(actor.physicsDebugSprite, actor); }
    }

    drawCircleShape(debug, actor) {

        var graphics = new PIXI.Graphics();
        graphics.lineStyle(5, 0xff0000);
        graphics.drawCircle(actor.rigidbody.m_body.m_xf.position.x * this.PIXELS_PER_METER, -actor.rigidbody.m_body.m_xf.position.y * this.PIXELS_PER_METER, actor.rigidbody.m_shape.GetRadius() * this.PIXELS_PER_METER); //actor.rigidbody.m_shape.m_radius
        debug.addChild(graphics);
    }

    drawPolygonShape(debug, actor) {

        let AABB = actor.rigidbody.GetAABB();
        let width = AABB.upperBound.x - AABB.lowerBound.x;
        let height = AABB.upperBound.y - AABB.lowerBound.y;
        let origin_x = actor.rigidbody.m_body.GetPosition().x - width / 2;
        let origin_y = -actor.rigidbody.m_body.GetPosition().y - height / 2;

        var graphics = new PIXI.Graphics();
        graphics.lineStyle(5, 0x0000ff);
        graphics.drawRect(origin_x * this.PIXELS_PER_METER, origin_y * this.PIXELS_PER_METER, width * this.PIXELS_PER_METER, height * this.PIXELS_PER_METER);
        debug.addChild(graphics);
    }

    addContactListener(callbacks) {
                
        var listener = new Box2D.Dynamics.b2ContactListener;
        
        if(callbacks.BeginContact)  { listener.BeginContact = function(contact) { callbacks.BeginContact(contact.GetFixtureA().m_userData, contact.GetFixtureB().m_userData); }; }
        //if(callbacks.PreSolve)      { listener.PreSolve     = function(contact) { callbacks.PreSolve(contact.GetFixtureA().m_userData, contact.GetFixtureB().m_userData); }; } // TODO: Con esto descomentado hay problemas con la deteccion y respuesta de colisiones.
        //if(callbacks.PostSolve)     { listener.PostSolve    = function(contact) { callbacks.PostSolve(contact.GetFixtureA().m_userData, contact.GetFixtureB().m_userData); }; }
        if(callbacks.EndContact)    { listener.EndContact   = function(contact) { callbacks.EndContact(contact.GetFixtureA().m_userData, contact.GetFixtureB().m_userData); }; }
        
        this.world.SetContactListener(listener);
    }

    setContactListener() {

        this.addContactListener({

            BeginContact: function(idA, idB) { Physics.collisionHandler(idA, idB, true,  "begincontact"); },
            //PreSolve:     function(idA, idB) { Physics.collisionHandler(idA, idB, true,  "presolve"); }, // TODO: Borrar, no descomentar jamas. Da problemas.
            //PostSolve:    function(idA, idB) { Physics.collisionHandler(idA, idB, true,  "postsolve"); },
            EndContact:   function(idA, idB) { Physics.collisionHandler(idA, idB, false, "endcontact"); }
        });
    }

    static collisionHandler(idA, idB, value, id) {

        var collisionVariable;

        for(var i = 0; i < idB.tags.length; i++) { 

            collisionVariable = "collidingWith" + idB.tags[i] + "Tag";

            if(idA[collisionVariable] != undefined) { 
                
                idA[collisionVariable].end   = (id == "endcontact" && idA[collisionVariable].iter == idA.engine.iteration);
                idA[collisionVariable].iter  = idA.engine.iteration;
                idA[collisionVariable].value = (idA[collisionVariable].end) ? true : value;
            }
        }

        for(var i = 0; i < idA.tags.length; i++) {

            collisionVariable = "collidingWith" + idA.tags[i] + "Tag";

            if(idB[collisionVariable] != undefined) { 
                
                idB[collisionVariable].end   = (id == "endcontact" && idB[collisionVariable].iter == idB.engine.iteration);
                idB[collisionVariable].iter  = idB.engine.iteration;
                idB[collisionVariable].value = (idB[collisionVariable].end) ? true : value;
            }
        }

        idA = idB = null;
    }

    sleepRigidbodies() {

        for(var i = 0; i < this.rigidbodyList.length; i++) {
            
            this.rigidbodyList[i].rigidbody.m_body.SetActive(false);
        }

        this.__rigidbodyListData = this.rigidbodyList;
        this.rigidbodyList = [];
    }

    awakeRigidbodies() {

        this.rigidbodyList = this.__rigidbodyListData;
        this.__rigidbodyListData = [];

        for(var i = 0; i < this.rigidbodyList.length; i++) {

            this.rigidbodyList[i].rigidbody.m_body.SetActive(true);
        }
    }

    sleep(actor) { if(actor.triggerOn || actor.physicsOn) { actor.rigidbody.m_body.SetActive(false); } }

    awake(actor) { if(actor.triggerOn || actor.physicsOn) { actor.rigidbody.m_body.SetActive(true); } }

    destroyActor(actor) {

        /** Comprobamos que el actor no ha sido previamente desactivado
         * ----------------------------------------------------------------------- */
        if(actor.rigidbody != undefined && actor.rigidbody != null) {

            actor.physicsDebugSprite.destroy();
            
            /** Eliminamos el actor de las listas de actores del motor de fisicas 
             * ----------------------------------------------------------------------- */
            if(actor.physicsOn) { this.rigidbodyList = Util.removeByID(this.rigidbodyList, actor.ID); }
            if(actor.triggerOn) { this.triggerList   = Util.removeByID(this.triggerList, actor.ID); }

            /** Eliminamos el actor del physics world 
             * ----------------------------------------------------------------------- */
            this.destroyRigidbody(actor);
            Util.destroy(actor, "rigidbody");
        }
    }

    destroyRigidbody(actor) {

        this.world.DestroyBody(actor.rigidbody.m_body); // Box2D JS Memory Leak: https://stackoverflow.com/questions/20840308/how-to-get-around-the-memory-leak-issue-in-box2d-for-javascript-port
        actor.rigidbody.m_body.Destroy();
        Util.deepDestroy(actor.rigidbody, "m_body");
        Util.deepDestroy(actor.rigidbody);
    }
    
    /** ###############################################################################
     *  Elementos auxiliares para la ejecucion de las expresiones logicas 
     *  ############################################################################### */
    ApplyForce(actor, strength, angle) {

        var thrustX = strength * Math.cos(angle) * this.PIXELS_PER_METER;
        var thrustY = strength * Math.sin(angle) * this.PIXELS_PER_METER;

        actor.rigidbody.m_body.ApplyForce(new b2Vec2(thrustX,thrustY), actor.rigidbody.m_body.GetWorldCenter());
    }

    ApplyForceTo(actor, strength, targetX, targetY) {

        this.ApplyForce(actor, strength * this.PIXELS_PER_METER, Math.atan2(targetY - actor.y, targetX - actor.x));
    }

    ApplyTorque(actor, angle) {

        actor.rigidbody.m_body.ApplyTorque(angle);
    }
}