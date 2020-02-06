class Physics {

    constructor(physics) {

        this.actorList          = {};                       /** */

        this.gravity            = new b2Vec2(physics.gravityX, physics.gravityY);    /** */
        this.sleep              = false;                    /** */
        this.deltaTime          = 1.0 / 60.0;               /** */
        this.velocityIterations = 10.0;                     /** */
        this.positionIterations = 10.0;                     /** */
        this.scaleFactor        = 1 / 1;                  /** Para compensar el factor de escala del sistema de referencia de Box2D */ 
        
        this.PIXELS_PER_METER = 100;
        this.HALF_PIXELS_PER_METER = this.PIXELS_PER_METER / 2;

        this.world              = new b2World(this.gravity, this.sleep);

        //this.setContactListener();
    }

    run() {

        this.updateBodies();
        this.world.Step(this.deltaTime, this.velocityIterations, this.positionIterations); // dt, velocityIterations, positionIterations
        this.world.ClearForces();
        this.updateActors(this.scaleFactor);
    }

    updateBodies() {

        for(var i in this.actorList) {

            this.actorList[i].physicBody.m_body.SetPosition(new b2Vec2(this.actorList[i].x * this.scaleFactor, this.actorList[i].y * this.scaleFactor));
            this.actorList[i].physicBody.m_body.SetAngle(this.actorList[i].angle);
            this.actorList[i].physicBody.m_body.SetLinearVelocity(new b2Vec2(this.actorList[i].velocityX, this.actorList[i].velocityY));

            // TODO: Set Angular Velocity
            
            // TODO: Set physics properties (restitution, friction, density, etc)
        }
    }

    updateActors(scaleFactor) {

        for(var i in this.actorList) {

            this.actorList[i].getPhysicsProperties(scaleFactor);

            /** --- DEBUG (ELIMINAR SIN PROBLEMA) */
            
                //this.drawDebug(this.actorList[i]);

            /** FIN --- DEBUG (ELIMINAR SIN PROBLEMA) */
        }
    }

    setActorPhysics(actor) {

        this.createPhysicsBody(actor);          /** */
        actor.physicBody.SetUserData(actor);    /** Definicion del objeto padre del physics body (NECESARIO PARA LA DETECCION DE COLISIONES) */
        this.actorList[actor.ID] = actor;       /** Añadimos el actor a la lista del motor de fisicas */

        /* DEBUG -- Borrar sin problemas */
            actor.physicsDebugSprite = new PIXI.Sprite();
        /* FIN DEBUG */
    }

    createPhysicsBody(actor) {

        var body = new b2BodyDef();
        body.position.Set(actor.x, actor.y);
        body.angle = 0.0;
        body.linearVelocity.Set(actor.velocityX, actor.velocityY); /** Activamos su velocidad lineal, por si tuviera algo preconfigurado */
        body.fixedRotation = actor.fixedAngle;
        //body.SetSleepingAllowed(false);

        //console.log(actor.name, "x: " + actor.x, "y: " + actor.y, "px: " + body.position.x, "py: " + body.position.y);
        body.angularVelocity = 0;
        body.linearDamping = 0;
        body.angularDamping = 0;
        body.fixedRotation = false;
        //console.log(actor.type);
        body.type = this["set" + actor.type + "Body"]();

        var fixture = new b2FixtureDef();
        fixture.restitution = actor.restitution;
        fixture.friction = actor.friction;
        fixture.density = actor.density;
        fixture.shape = this["set" + actor.collider + "Shape"](); /** Configuracion de la forma geometrica del objeto fisico */

        actor.physicBody = this.world.CreateBody(body).CreateFixture(fixture); /** Creacion del physics body en el sistema y en el mundo fisico de Box2D */
    }

    setDynamicBody() {

        return b2Body.b2_dynamicBody;
    }

    setKinematicBody() {

        return b2Body.b2_kinematicBody;
    }

    setStaticBody() {

        return b2Body.b2_staticBody;
    }

    setBoxShape() {

        var shape = new b2PolygonShape;
        shape.SetAsBox(this.width / 2, this.height / 2); // Tiene que ser la mitad.
        return shape;
    }

    setCircleShape() {

        var shape = new b2CircleShape;
        shape.m_p.x = this.x;
        shape.m_p.y = this.y;
        shape.m_radius = this.radius;
        return shape;
    }

    setPolygonShape() {

        // TODO (provisional con BOX)
        console.log("POLYGON");
        this.setBoxShape();
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

        console.log(_vertices);
    }

    drawDebug(actor) {
        
        actor.physicsDebugSprite.removeChildren();

        this.drawCircleShape(actor.physicsDebugSprite, actor);

        if(actor.collider == "Circle") {

            this.drawCircleShape(actor.physicsDebugSprite, actor);
        }
        else {

            this.drawPolygonShape(actor.physicsDebugSprite, actor);
        }
    }

    drawCircleShape(debug, actor) {

        var graphics = new PIXI.Graphics();

        graphics.lineStyle(1, 0xff0000);

        //console.log(actor.physicBody.m_shape.m_radius, actor.radius, actor.physicBody.m_body.m_xf.position)

        graphics.drawCircle(actor.physicBody.m_body.m_xf.position.x, actor.physicBody.m_body.m_xf.position.y, actor.radius); //actor.physicBody.m_shape.m_radius

        debug.addChild(graphics);
    }

    

    drawPolygonShape(debug, actor) {

        var vertexTransformList = [];

        var x_origin = actor.physicBody.m_shape.m_centroid.x;
        var y_origin = actor.physicBody.m_shape.m_centroid.y;

        //console.log(x_origin, y_origin);

        for(var i = 0; i < actor.physicBody.m_shape.m_vertices.length; i++) {

            var x = actor.physicBody.m_shape.m_vertices[i].x;
            var y = actor.physicBody.m_shape.m_vertices[i].y;

            //console.log(actor.physicBody.m_shape.m_vertices, y);

            var x_rotated = ((x - x_origin) * Math.cos(actor.angle)) - ((y_origin - y) * Math.sin(actor.angle)) + x_origin;
            var y_rotated = ((y_origin - y) * Math.cos(actor.angle)) + ((x - x_origin) * Math.sin(actor.angle)) + y_origin;

            vertexTransformList.push({x: x_rotated, y: y_rotated});
        }

        var graphics = new PIXI.Graphics();

        graphics.lineStyle(1, 0x0000ff);
        graphics.moveTo(actor.x + vertexTransformList[0].x, actor.y + vertexTransformList[0].y);

        for(var j = 1; j < vertexTransformList.length; j++) {

            graphics.lineTo(actor.x + vertexTransformList[j].x, actor.y + vertexTransformList[j].y);
        }

        graphics.lineTo(actor.x + vertexTransformList[0].x, actor.y + vertexTransformList[0].y);

        debug.addChild(graphics);
    }

    addContactListener(callbacks) {
                
        var listener = new Box2D.Dynamics.b2ContactListener;

        if(callbacks.BeginContact) {

            listener.BeginContact = function(contact) { 

                callbacks.BeginContact(contact.GetFixtureA().GetBody().GetUserData(), contact.GetFixtureB().GetBody().GetUserData());
            };
        }
        
        if(callbacks.EndContact) {
            
            listener.EndContact = function(contact) {
                
                callbacks.EndContact(contact.GetFixtureA().GetBody().GetUserData(), contact.GetFixtureB().GetBody().GetUserData());
            };
        }
        
        if(callbacks.PreSolve) {
            
            listener.PreSolve = function(contact) {
                
                callbacks.PreSolve(contact.GetFixtureA().GetBody().GetUserData(), contact.GetFixtureB().GetBody().GetUserData());
            };
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
            },

            PreSolve: function(idA, idB) {

                console.log("----------------", idA, idB);
            },

            PostSolve: function(idA, idB) {

                console.log("----------------", idA, idB);
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