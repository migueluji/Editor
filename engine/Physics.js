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
        //actor.rigidbody.m_body.SetAngle(Util.degToRad(actor.angle));
        this.drawDebug(actor); // DEBUG
    }

    updateGame() {

        for(var i = 0; i < this.rigidbodyList.length; i++) { this.updateActor(this.rigidbodyList[i]); }
    }

    updateActor(actor) {

        actor.x     = actor.rigidbody.m_body.GetPosition().x * this.PIXELS_PER_METER;
        actor.y     = actor.rigidbody.m_body.GetPosition().y * this.PIXELS_PER_METER;
        //actor.angle = Util.radToDeg(actor.rigidbody.m_body.GetAngle());
    }

    setActorPhysics(actor, data) {

        /**
         *  ¿Actua como trigger?
         * -------------------------------------------------- */
        actor.triggerOn = (actor.triggerOn == undefined) ? (data.tags.length > 0) : actor.triggerOn;
        if(actor.triggerOn && !actor.physicsOn) {  } /** Si es un trigger y no es un actor con fisicas, para evitar duplicados en los bucles y solo actualizar las posiciones de los fisicos. */

        /**
         * ¿Es un actor con fisicas o un trigger?
         * -------------------------------------------------- */
        if(data.physicsOn || actor.triggerOn) {

            actor.rigidbody = this.createPhysicsBody(data); /** Creacion del physics body en el sistema y en el mundo fisico de Box2D. */
            actor.rigidbody.SetUserData(actor);             /** Definicion del objeto padre del physics body (NECESARIO PARA LA DETECCION DE COLISIONES). */
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

    createPhysicsBody(data) {

        let type = data.physicsOn ? data.type : "Dynamic";

        let body  = new b2BodyDef();
        body.type = this["set" + type + "Body"]();
        
        let fixture   = new b2FixtureDef();
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
        shape.m_p.x     = data.x / this.PIXELS_PER_METER;
        shape.m_p.y     = data.y / this.PIXELS_PER_METER;
        shape.m_radius  = data.radius / this.PIXELS_PER_METER;
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

        for(var i = 0; i < actor.physicsDebugSprite.children.length; i++) {

            actor.physicsDebugSprite.children[i].destroy();
        }
        
        actor.physicsDebugSprite.removeChildren();

        this.drawCircleShape(actor.physicsDebugSprite, actor);

        if(actor.collider != "Circle") {

            this.drawPolygonShape(actor.physicsDebugSprite, actor);
        }
    }

    drawCircleShape(debug, actor) {

        var graphics = new PIXI.Graphics();

        graphics.lineStyle(1, 0xff0000);

        graphics.drawCircle(actor.rigidbody.m_body.m_xf.position.x * this.PIXELS_PER_METER, -actor.rigidbody.m_body.m_xf.position.y * this.PIXELS_PER_METER, actor.radius); //actor.rigidbody.m_shape.m_radius

        debug.addChild(graphics);
    }

    drawPolygonShape(debug, actor) {
        
        var vertexTransformList = [];

        var x_origin = actor.rigidbody.m_shape.m_centroid.x * this.PIXELS_PER_METER;
        var y_origin = actor.rigidbody.m_shape.m_centroid.y * this.PIXELS_PER_METER;

        for(var i = 0; i < actor.rigidbody.m_shape.m_vertices.length; i++) {

            var x = actor.rigidbody.m_shape.m_vertices[i].x * this.PIXELS_PER_METER;
            var y = actor.rigidbody.m_shape.m_vertices[i].y * this.PIXELS_PER_METER;

            var x_rotated = ((x - x_origin) * Math.cos(-actor.angle)) - ((y_origin - y) * Math.sin(-actor.angle)) + x_origin;
            var y_rotated = ((y_origin - y) * Math.cos(-actor.angle)) + ((x - x_origin) * Math.sin(-actor.angle)) + y_origin;

            vertexTransformList.push({x: x_rotated, y: y_rotated});
        }

        //console.log(vertexTransformList, actor.rigidbody.m_shape);

        var graphics = new PIXI.Graphics();

        //console.log(actor.x, actor.y);

        graphics.lineStyle(5, actor.physicsOn ? 0x0000ff : 0x00ff00);
        graphics.moveTo(actor.rigidbody.m_body.m_xf.position.x * this.PIXELS_PER_METER + vertexTransformList[0].x, -actor.rigidbody.m_body.m_xf.position.y * this.PIXELS_PER_METER + vertexTransformList[0].y);

        for(var j = 1; j < vertexTransformList.length; j++) {

            graphics.lineTo(actor.rigidbody.m_body.m_xf.position.x * this.PIXELS_PER_METER + vertexTransformList[j].x, -actor.rigidbody.m_body.m_xf.position.y * this.PIXELS_PER_METER + vertexTransformList[j].y);
        }

        graphics.lineTo(actor.rigidbody.m_body.m_xf.position.x * this.PIXELS_PER_METER + vertexTransformList[0].x, -actor.rigidbody.m_body.m_xf.position.y * this.PIXELS_PER_METER + vertexTransformList[0].y);

        debug.addChild(graphics);
    }

    addContactListener(callbacks) {
                
        var listener = new Box2D.Dynamics.b2ContactListener;

        if(callbacks.BeginContact) {

            listener.BeginContact = function(contact) { callbacks.BeginContact(contact.GetFixtureA().m_userData, contact.GetFixtureB().m_userData); };
        }
        
        if(callbacks.EndContact) {
            
            listener.EndContact = function(contact) { callbacks.EndContact(contact.GetFixtureA().m_userData, contact.GetFixtureB().m_userData); };
        }

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

            EndContact: function(idA, idB) {

                for(var i = 0; i < idB.tags.length; i++) { 

                    var collisionVariable = "collidingWith" + idB.tags[i] + "Tag";

                    if(idA[collisionVariable] != undefined) { idA[collisionVariable] = false; }
                }

                for(var i = 0; i < idA.tags.length; i++) {

                    var collisionVariable = "collidingWith" + idA.tags[i] + "Tag";

                    if(idB[collisionVariable] != undefined) { idB[collisionVariable] = false; }
                }

                idA = idB = null;
            }
        });
    }

    destroyActor(actor) {

        /** Comprobamos que el actor no ha sido previamente desactivado
         * ----------------------------------------------------------------------- */
        if(actor.rigidbody != undefined && actor.rigidbody != null) {

            /** Eliminamos el actor del physics world 
             * ----------------------------------------------------------------------- */
            this.world.DestroyBody(actor.rigidbody.m_body); // Box2D JS Memory Leak: https://stackoverflow.com/questions/20840308/how-to-get-around-the-memory-leak-issue-in-box2d-for-javascript-port
            actor.rigidbody.m_body.Destroy();
            Util.deepDestroy(actor.rigidbody, "m_body");
            Util.deepDestroy(actor.rigidbody);
            Util.destroy(actor, "rigidbody");
            
            /** Eliminamos el actor de la lista de actores del motor de fisicas 
             * ----------------------------------------------------------------------- */
            delete this.rigidbodyList[actor.ID];
        }
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