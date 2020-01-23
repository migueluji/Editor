class Physics {

    constructor() {

        this.actorList          = {};                       /** */

        this.gravity            = new b2Vec2(0.0, 9.81);    /** */
        this.sleep              = false;                    /** */
        this.deltaTime          = 1.0 / 60.0;               /** */
        this.velocityIterations = 10.0;                     /** */
        this.positionIterations = 10.0;                     /** */
        this.scaleFactor        = 1 / 100;                  /** Para compensar el factor de escala del sistema de referencia de Box2D */ 

        this.world              = new b2World(this.gravity, this.sleep);

        this.setContactListener();
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
            
                this.drawDebug(this.actorList[i]);

            /** FIN --- DEBUG (ELIMINAR SIN PROBLEMA) */
        }
    }

    setActorPhysics(actor) {

        /** Definicion del physics body. */
        var bodyDef             = new b2BodyDef();
        bodyDef.position.Set(this.scaleFactor * actor.x, this.scaleFactor * actor.y);
        bodyDef.angle           = actor.angle;
        bodyDef.fixedRotation   = actor.fixedRotation;

        /** Definicion del fixture con las propiedades fisicas. */
        var fixDef      = new b2FixtureDef;
        fixDef.shape    = new b2PolygonShape;
        
        /** Definicion del tipo de objeto fisico y configuracion de sus propiedades. */
        if(actor.physics) {

            switch(actor.physicMode) {

                case "static":
                    bodyDef.type = b2Body.b2_staticBody;  
                    break;
                case "kinematic":
                    bodyDef.type = b2Body.b2_kinematicBody;
                    fixDef.isSensor = true; 
                    break;
                default:
                case "dynamic":
                    bodyDef.type = b2Body.b2_dynamicBody;
                    break;
            }

            fixDef.density      = actor.density;
            fixDef.friction     = actor.friction;
            fixDef.restitution  = actor.restitution;
        }
        else {

            fixDef.isSensor = true;
        }

        /** Configuracion de la forma geometrica del objeto fisico */
        if(actor.physicVertices != null) {
 
            this.createCustomPolygonShape(actor.physicVertices, fixDef.shape);
        }
        else {

            fixDef.shape.SetAsBox(this.scaleFactor * actor.scaleX * actor.width / 2, this.scaleFactor * actor.scaleY * actor.height / 2); // tiene que ser siempre la mitad y ademas multiplicado por la escala
        }

        /** Creacion del physics body en el sistema y en el mundo fisico de Box2D */
        actor.physicBody = this.world.CreateBody(bodyDef).CreateFixture(fixDef);

        /** Activamos su velocidad lineal, por si tuviera algo preconfigurado */
        actor.physicBody.m_body.SetLinearVelocity(new b2Vec2(actor.velocityX, actor.velocityY));

        /** Definicion del objeto padre del physics body (NECESARIO PARA LA DETECCION DE COLISIONES) */
        actor.physicBody.m_body.SetUserData(actor);




        actor.physicBody.m_body.SetSleepingAllowed(false);
        //console.log(actor.physicBody);





        /** Añadimos el actor a la lista del motor de fisicas */
        this.actorList[actor.ID] = actor;

        /* DEBUG -- Borrar sin problemas */
            actor.physicsDebugSprite = new PIXI.Sprite();
        /* FIN DEBUG */
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

        /* Dado que Box2D al rotar un body no actualiza los vertices de su shape 
        es necesario aplicar una transformacion a los vertices para ver correctamente
        su contorno en el modo debug 
        ---------------------------------------------------------------------------------*/
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

        /* Con los vertices ya rotados, se dibuja el controrno del objeto 
        ---------------------------------------------------------------------------------*/
        var graphics = new PIXI.Graphics();
        
        if(actor.physics) {

            graphics.lineStyle(3, 0xff0000, 1);
        }
        else {

            graphics.lineStyle(1, 0x00ff00, 1);
        }
        

        graphics.moveTo(actor.x + 1 / this.scaleFactor * vertexTransformList[0].x, actor.y + 1 / this.scaleFactor * vertexTransformList[0].y);

        for(var j = 1; j < vertexTransformList.length; j++) {

            graphics.lineTo(actor.x + 1 / this.scaleFactor * vertexTransformList[j].x, actor.y + 1 / this.scaleFactor * vertexTransformList[j].y);
        }

        graphics.lineTo(actor.x + 1 / this.scaleFactor * vertexTransformList[0].x, actor.y + 1 / this.scaleFactor * vertexTransformList[0].y);

        actor.physicsDebugSprite.addChild(graphics);
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

                if(idB.name.includes("RightUpCollider")) {
                    
                    if(idA.name.includes("Bullet")) {
                        console.log(idA, idB);
                    }
                }

                if(idA.name.includes("RightUpCollider")) {
                    
                    if(idB.name.includes("Bullet")) {
                        console.log(idA, idB);
                    }
                }

                //console.log("----------------", idA, idB);

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

                if(idB.name.includes("RightUpCollider")) {
                    
                    if(idA.name.includes("Bullet")) {
                        console.log(idA, idB);
                    }
                }

                if(idA.name.includes("RightUpCollider")) {
                    
                    if(idB.name.includes("Bullet")) {
                        console.log(idA, idB);
                    }
                }

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

                if(idB.name.includes("RightUpCollider")) {
                    
                    if(idA.name.includes("Bullet")) {
                        console.log(idA, idB);
                    }
                }

                if(idA.name.includes("RightUpCollider")) {
                    
                    if(idB.name.includes("Bullet")) {
                        console.log(idA, idB);
                    }
                }
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