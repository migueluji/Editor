class Physics {

    constructor(engine) {

        this.engine                 = engine;                   /** */

        this.actorList              = [];                       /** */

        this.gravity                = new b2Vec2(0.0, 0.0);     /** */
        this.sleep                  = false;                    /** */
        this.velocityIterations     = 10.0;                     /** */
        this.positionIterations     = 10.0;                     /** */
        
        this.PIXELS_PER_METER       = 100;
        this.HALF_PIXELS_PER_METER  = this.PIXELS_PER_METER / 2;
        this.scaleFactor            = 1 / this.PIXELS_PER_METER;  /** Para compensar el factor de escala del sistema de referencia de Box2D */ 

        this.world                  = new b2World(this.gravity, this.sleep);

        //this.setContactListener();
    }

    run() {

        this.updateBodies();
        this.world.Step(this.engine.game.deltaTime, this.velocityIterations, this.positionIterations);
        this.world.ClearForces();
        this.updateActors();
    }

    updateBodies() {

        for(var i = 0; i < this.actorList.length; i++) {

            //this.actorList[i].physicBody.m_body.SetPosition(new b2Vec2(this.actorList[i].x * this.scaleFactor, -this.actorList[i].y * this.scaleFactor));
            //this.actorList[i].physicBody.m_body.SetAngle(this.actorList[i].angle);
            //this.actorList[i].physicBody.m_body.SetLinearVelocity(new b2Vec2(this.actorList[i].velocityX, this.actorList[i].velocityY));

            // TODO: Set Angular Velocity
            
            // TODO: Set physics properties (restitution, friction, density, etc)
        }
    }

    updateActors() {

        for(var i = 0; i < this.actorList.length; i++) {

            //this.actorList[i].getPhysicsProperties(this.scaleFactor);

            this.drawDebug(this.actorList[i]); // DEBUG
        }
    }

    setActorPhysics(actor, data) {

        actor.physicBody = this.createPhysicsBody(actor, data); /** Creacion del physics body en el sistema y en el mundo fisico de Box2D */
        actor.physicBody.SetUserData(actor);                    /** Definicion del objeto padre del physics body (NECESARIO PARA LA DETECCION DE COLISIONES) */
        this.actorList.push(actor);                             /** Añadimos el actor a la lista del motor de fisicas */

        /* DEBUG -- Borrar sin problemas */
            actor.physicsDebugSprite = new PIXI.Sprite();
            this.engine.render.stage.addChild(actor.physicsDebugSprite);
        /* FIN DEBUG */
    }

    createPhysicsBody(actor, data) {

        console.log(data);

        var body = new b2BodyDef();
        body.position.Set(data.x, data.y);
        //body.angle              = data.angle;
        //body.linearVelocity.Set(data.velocityX, data.velocityY); /** Activamos su velocidad lineal, por si tuviera algo preconfigurado */
        //body.fixedRotation      = data.fixedAngle;
        //body.SetSleepingAllowed(false);
        //body.angularVelocity    = data.angularVelocity || 0;
        //body.linearDamping      = data.linearDamping || 0;
        //body.angularDamping     = data.angularDamping || 0;
        //console.log(data.type);
        body.type               = this["set" + data.type + "Body"]();

        var fixture         = new b2FixtureDef();
        //fixture.restitution = data.restitution || 0;
        //fixture.friction    = data.friction || 0;
        //fixture.density     = 0;
        fixture.shape       = this["set" + data.collider + "Shape"](data); /** Configuracion de la forma geometrica del objeto fisico */

        return this.world.CreateBody(body).CreateFixture(fixture); 
    }

    setDynamicBody() { return b2Body.b2_dynamicBody; }

    setKinematicBody() { return b2Body.b2_kinematicBody; }

    setStaticBody() { return b2Body.b2_staticBody; }

    setBoxShape(data) {

        var shape = new b2PolygonShape;
        shape.SetAsBox(data.width / 2, data.height / 2); // Tiene que ser la mitad.
        return shape;
    }

    setCircleShape(data) {

        var shape       = new b2CircleShape;
        shape.m_p.x     = data.x;
        shape.m_p.y     = data.y;
        shape.m_radius  = data.radius;
        return shape;
    }

    setPolygonShape(data) {

        // TODO (provisional con BOX)
        console.log("POLYGON");
        this.setBoxShape(data);
    }

    disableActor(actor) {

        actor.physicBody.m_body.SetActive(false);
    }

    enableActor(actor) {

        actor.physicBody.m_body.SetActive(true);
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

        graphics.lineStyle(2, 0xff0000);

        graphics.drawCircle(actor.physicBody.m_body.m_xf.position.x, actor.physicBody.m_body.m_xf.position.y, actor.radius); //actor.physicBody.m_shape.m_radius

        debug.addChild(graphics);
    }

    drawPolygonShape(debug, actor) {
        
        var vertexTransformList = [];

        var x_origin = actor.physicBody.m_shape.m_centroid.x;
        var y_origin = actor.physicBody.m_shape.m_centroid.y;

        for(var i = 0; i < actor.physicBody.m_shape.m_vertices.length; i++) {

            var x = actor.physicBody.m_shape.m_vertices[i].x;
            var y = actor.physicBody.m_shape.m_vertices[i].y;

            var x_rotated = ((x - x_origin) * Math.cos(actor.angle)) - ((y_origin - y) * Math.sin(actor.angle)) + x_origin;
            var y_rotated = ((y_origin - y) * Math.cos(actor.angle)) + ((x - x_origin) * Math.sin(actor.angle)) + y_origin;

            vertexTransformList.push({x: x_rotated, y: y_rotated});
        }

        //console.log(vertexTransformList, actor.physicBody.m_shape);

        var graphics = new PIXI.Graphics();

        //console.log(actor.x, actor.y);

        graphics.lineStyle(5, 0x0000ff);
        graphics.moveTo(actor.x + vertexTransformList[0].x, -actor.y + vertexTransformList[0].y);

        for(var j = 1; j < vertexTransformList.length; j++) {

            graphics.lineTo(actor.x + vertexTransformList[j].x, -actor.y + vertexTransformList[j].y);
        }

        graphics.lineTo(actor.x + vertexTransformList[0].x, -actor.y + vertexTransformList[0].y);

        debug.addChild(graphics);
    }

    addContactListener(callbacks) {
                
        var listener = new Box2D.Dynamics.b2ContactListener;

        if(callbacks.BeginContact) {

            listener.BeginContact = function(contact) { callbacks.BeginContact(contact.GetFixtureA().GetBody().GetUserData(), contact.GetFixtureB().GetBody().GetUserData()); };
        }
        
        if(callbacks.EndContact) {
            
            listener.EndContact = function(contact) { callbacks.EndContact(contact.GetFixtureA().GetBody().GetUserData(), contact.GetFixtureB().GetBody().GetUserData()); };
        }

        this.world.SetContactListener(listener);
    }

    setContactListener() {

        this.addContactListener({

            BeginContact: function(idA, idB) {

                console.log("----------------", idA, idB);

                for(var i in idB.tags) {

                    var collisionVariable = "collidingWith" + i + "Tag";

                    if(idA[collisionVariable] != undefined) {
                        
                        idA[collisionVariable] = true;

                        //console.log("INICIO DE COLISION DETECTADO POR TAG", idA.name, collisionVariable, idA[collisionVariable]);
                    }
                }

                for(var i in idA.tags) {

                    var collisionVariable = "collidingWith" + i + "Tag";

                    if(idB[collisionVariable] != undefined) {
                        
                        idB[collisionVariable] = true;

                        //console.log("INICIO DE COLISION DETECTADO POR TAG", idB.name, collisionVariable, idB[collisionVariable]);
                    }
                }

                idA = idB = null;
            },

            EndContact: function(idA, idB) {

                for(var i in idB.tags) {

                    var collisionVariable = "collidingWith" + i + "Tag";

                    if(idA[collisionVariable] != undefined) {
                        
                        idA[collisionVariable] = false;

                        //console.log("FINAL DE COLISION DETECTADO POR TAG", idA.name, collisionVariable, idA[collisionVariable]);
                    }
                }

                for(var i in idA.tags) {

                    var collisionVariable = "collidingWith" + i + "Tag";

                    if(idB[collisionVariable] != undefined) {
                        
                        idB[collisionVariable] = false;

                        //console.log("FINAL DE COLISION DETECTADO POR TAG", idB.name, collisionVariable, idB[collisionVariable]);
                    }
                }

                idA = idB = null;
            }
        });
    }

    destroyActor(actor) {

        /** Comprobamos que el actor no ha sido previamente desactivado
         * ----------------------------------------------------------------------- */
        if(actor.physicBody != undefined && actor.physicBody != null) {

            /** Eliminamos el actor del physics world 
             * ----------------------------------------------------------------------- */
            this.world.DestroyBody(actor.physicBody.m_body); // Box2D JS Memory Leak: https://stackoverflow.com/questions/20840308/how-to-get-around-the-memory-leak-issue-in-box2d-for-javascript-port
            actor.physicBody.m_body.Destroy();
            Util.deepDestroy(actor.physicBody, "m_body");
            Util.deepDestroy(actor.physicBody);
            Util.destroy(actor, "physicBody");
            
            /** Eliminamos el actor de la lista de actores del motor de fisicas 
             * ----------------------------------------------------------------------- */
            delete this.actorList[actor.ID];
        }
    }




    
    /** ###############################################################################
     *  Elementos auxiliares para la ejecucion de las expresiones logicas 
     *  ############################################################################### */


     // ESTO DEBE DE ESTAR EN LA EXPRESION, por si strength y angle son expresiones

    ApplyForce(actor, strength, angle) {

        var thrustX = strength * Math.cos(-1*angle); // El -1 es porque box2d interpreta la direccion en sentido contrario.
        var thrustY = strength * Math.sin(-1*angle);

        actor.physicBody.m_body.ApplyForce(new b2Vec2(thrustX,thrustY), actor.physicBody.m_body.GetWorldCenter());
    }

}