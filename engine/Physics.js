class Physics {

    constructor(engine) {

        this.engine                 = engine;                   /** */

        this.rigidbodyList          = [];                       /** */
        this.triggerList            = [];                       /** */

        this.gravity                = new b2Vec2(0.0, 0.0);     /** */
        this.sleep                  = false;                    /** */
        this.velocityIterations     = 10.0;                     /** */
        this.positionIterations     = 10.0;                     /** */
        this.world                  = new b2World(this.gravity, this.sleep);
        
        this.PIXELS_PER_METER       = 100;                      /** Para compensar el factor de escala del sistema de referencia de Box2D */ 
        this.HALF_PIXELS_PER_METER  = this.PIXELS_PER_METER / 2;

        this.setContactListener();
    }

    run() {

        this.updateWorld();
        this.world.Step(this.engine.game.deltaTime, this.velocityIterations, this.positionIterations);
        this.world.ClearForces();
        this.updateGame();
    }

    updateWorld() {

        for(var i = 0; i < this.rigidbodyList.length; i++) { this.updateBody(this.rigidbodyList[i]); }
        for(var i = 0; i < this.triggerList.length; i++) { this.updateBody(this.triggerList[i]); }
    }

    updateBody(actor) {

        actor.rigidbody.m_body.SetPosition(new b2Vec2(actor.x / this.PIXELS_PER_METER, actor.y / this.PIXELS_PER_METER));
        actor.rigidbody.m_body.SetAngle(Util.degToRad(actor.angle));
        this.drawDebug(actor); // DEBUG
    }

    updateGame() {

        for(var i = 0; i < this.rigidbodyList.length; i++) { this.updateActor(this.rigidbodyList[i]); }
    }

    updateActor(actor) {

        //if(actor.name == "BounceActor") console.log("AFTER STEP", actor.rigidbody.m_body.GetAngle(), actor.rigidbody)

        actor.x     = actor.rigidbody.m_body.GetPosition().x * this.PIXELS_PER_METER;
        actor.y     = actor.rigidbody.m_body.GetPosition().y * this.PIXELS_PER_METER;
        actor.angle = Util.radToDeg(actor.rigidbody.m_body.GetAngle());
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

            actor.rigidbody = this.createPhysicsBody(data); /** Creacion del rigidbody en el sistema y en el mundo fisico de Box2D. */
            actor.rigidbody.SetUserData(actor);             /** Definicion del objeto padre del rigidbody (NECESARIO PARA LA DETECCION DE COLISIONES). */
            actor.collisionList = (actor.collisionList == undefined) ? [] : actor.collisionList;

            if(data.physicsOn) { 
                
                this.rigidbodyList.push(actor);             /** Añadimos el actor a la lista de rigidbodies. */
            } 
            else {

                actor.rigidbody.SetSensor(true);            /** Activamos el rigidbody del actor como sensor, para que no interactue con otros rigidbodies. */
                this.triggerList.push(actor);               /** Añadimos el actor a la lista de triggers. */
            }

            /* DEBUG -- Borrar sin problemas */
                actor.physicsDebugSprite = new PIXI.Sprite();
                this.engine.render.stage.addChild(actor.physicsDebugSprite);
            /* FIN DEBUG */
        }
    }

    updateRigidbody(actor) {

        if(actor.physicsOn || actor.triggerOn) {

            actor.radius = Math.max(actor.width, actor.height) / 2;

            //this.destroyRigidbody(actor);
            actor.rigidbody = this.createPhysicsBody(actor); /** Creacion del nuevo rigidbody en el sistema y en el mundo fisico de Box2D. */

            if(!actor.physicsOn) {

                actor.rigidbody.SetSensor(true);            /** Activamos el rigidbody del actor como sensor, para que no interactue con otros rigidbodies. */
            }
        }
    }

    createPhysicsBody(data) {

        let body  = new b2BodyDef();
        body.type = this["set" + (data.physicsOn ? data.type : "Dynamic") + "Body"]();

        let fixture   = new b2FixtureDef();
        fixture.friction = data.friction;
        fixture.density = data.density;   
        fixture.restitution = data.restitution;   
        fixture.shape = this["set" + data.collider + "Shape"](data); /** Configuracion de la forma geometrica del objeto fisico */

        return this.world.CreateBody(body).CreateFixture(fixture); 
    }

    setDynamicBody() { return b2Body.b2_dynamicBody; }
    setKinematicBody() { return b2Body.b2_kinematicBody; }
    setStaticBody() { return b2Body.b2_staticBody; }

    setBoxShape(data) {

        var shape = new b2PolygonShape;
        shape.SetAsBox(data.width / 2 / this.PIXELS_PER_METER, data.height / 2 / this.PIXELS_PER_METER); // Tiene que ser la mitad.
        return shape;
    }

    setCircleShape(data) {

        var shape       = new b2CircleShape;
        shape.m_radius  = (Math.max(data.width, data.height) / 2) / this.PIXELS_PER_METER;
        return shape;
    }

    setPolygonShape(data) {

        // TODO (provisional con BOX)
        console.log("POLYGON");
        this.setBoxShape(data);
    }
    
    createCustomPolygonShape(vertices, polygonShape) {

        var _vertices = [];

        for(var i = 0; i < vertices.length; i++) {

            _vertices.push(new b2Vec2(vertices[i].x, vertices[i].y));
        }

        polygonShape.SetAsArray(_vertices, _vertices.length);

        //console.log(_vertices);
    }

    drawDebug(actor) {

        for(var i = 0; i < actor.physicsDebugSprite.children.length; i++) { actor.physicsDebugSprite.children[i].destroy(); }
        actor.physicsDebugSprite.removeChildren();

        if(actor.collider == "Circle") { this.drawCircleShape(actor.physicsDebugSprite, actor); }
        else { this.drawPolygonShape(actor.physicsDebugSprite, actor); }
    }

    drawCircleShape(debug, actor) {

        console.log()

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

        if(callbacks.BeginContact) {

            listener.BeginContact = function(contact) { callbacks.BeginContact(contact.GetFixtureA().m_userData, contact.GetFixtureB().m_userData); };
        }
        
        /*if(callbacks.EndContact) {
            
            listener.EndContact = function(contact) { callbacks.EndContact(contact.GetFixtureA().m_userData, contact.GetFixtureB().m_userData); };
        }*/

        this.world.SetContactListener(listener);
    }

    setContactListener() {

        this.addContactListener({

            BeginContact: function(idA, idB) {

                for(var i = 0; i < idB.tags.length; i++) {

                    var collisionVariable = "collidingWith" + idB.tags[i] + "Tag";

                    if(idA[collisionVariable] != undefined) { idA[collisionVariable] = true; }
                }

                for(var i = 0; i < idA.tags.length; i++) {

                    var collisionVariable = "collidingWith" + idA.tags[i] + "Tag";

                    if(idB[collisionVariable] != undefined) { idB[collisionVariable] = true; }
                }

                idA = idB = null;
            },

            /*EndContact: function(idA, idB) {

                for(var i = 0; i < idB.tags.length; i++) { 

                    var collisionVariable = "collidingWith" + idB.tags[i] + "Tag";

                    if(idA[collisionVariable] != undefined) { idA[collisionVariable] = false; }
                }

                for(var i = 0; i < idA.tags.length; i++) {

                    var collisionVariable = "collidingWith" + idA.tags[i] + "Tag";

                    if(idB[collisionVariable] != undefined) { idB[collisionVariable] = false; }
                }

                idA = idB = null;
            }*/
        });
    }

    destroyActor(actor) {

        /** Comprobamos que el actor no ha sido previamente desactivado
         * ----------------------------------------------------------------------- */
        if(actor.rigidbody != undefined && actor.rigidbody != null) {

            /** Eliminamos el actor del physics world 
             * ----------------------------------------------------------------------- */
            this.destroyRigidbody(actor);
            Util.destroy(actor, "rigidbody");
            
            /** Eliminamos el actor de la lista de actores del motor de fisicas 
             * ----------------------------------------------------------------------- */
            delete this.rigidbodyList[actor.ID]; // TODO: ESTO NO ESTA BIEN
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

        var thrustX = strength * Math.cos(-1*angle); // El -1 es porque box2d interpreta la direccion en sentido contrario.
        var thrustY = strength * Math.sin(-1*angle);

        actor.rigidbody.m_body.ApplyForce(new b2Vec2(thrustX,thrustY), actor.rigidbody.m_body.GetWorldCenter());
    }

    ApplyForceTo(actor, strength, targetX, targetY) {

        this.ApplyForce(actor, strength, Math.atan2(targetY - actor.y, targetX - actor.x));
    }

    ApplyTorque(actor, angle) {

        actor.rigidbody.m_body.ApplyTorque(angle);
    }

}