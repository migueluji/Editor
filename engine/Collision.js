class Collision {

    constructor(collision) {

        this.actorList = {}; /** */
        this.tagList   = {}; /** */

        this.setTagLists(collision.tagList); /**  */
    }

    run() {

        this.updateCollisionShape();
        this.checkCollisions();
    }

    reset() {

        for(var i in this.actorList) {

            for(var j in this.actorList[i].collisionList) {

                this.actorList[i]["collidingWith" + j + "Tag"] = false;
            }
        }
    }

    destroyActor(actor) {

        /** Eliminamos las shapes
         * ----------------------------------------------------------------------- */
        Util.destroy(actor, "collisionBroadShape");
        Util.destroy(actor, "collisionNarrowShape");

        /** Eliminamos tosos los scripts junto con sus nodos
         * ----------------------------------------------------------------------- */
        for(var i in this.tagList) {

            for(var j = 0; j < this.tagList[i].length; j++) {

                if(this.tagList[i][j].ID == actor.ID) {

                    this.tagList[i].splice(j, 1);
                }
            }
        }

        /** Eliminamos los sprites de debug. 
         * ----------------------------------------------------------------------- */
        actor.collisionBroadDebugSprite.destroy();
        actor.collisionNarrowDebugSprite.destroy();

        /** Eliminamos el actor de la lista de actores del motor de colisiones. 
         * ----------------------------------------------------------------------- */
        delete this.actorList[actor.ID];
    }

    setTagLists(tags) {

        for(var i = 0; i < tags.length; i++) {

            this.tagList[tags[i]] = [];
        }
    }

    setActorCollision(actor) {

        /** ¿Tiene algun nodo colision? --> A la lista de actores. */ 
        if(actor.collisionOn) {
            
            this.setActorCollisionShape(actor);
            this.actorList[actor.ID] = actor;
        }

        /** ¿Tiene algun TAG? --> A la lista del tag correspondiente. */ 
        for(var i in actor.tags) {

            this.setActorCollisionShape(actor);
            this.tagList[i].push(actor);
        }
    }

    setActorCollisionShape(actor) {

        /** Broad shape */
        if(actor.collisionBroadShape == undefined) {

            actor.collisionBroadShape = new SAT.Circle(new SAT.Vector(actor.x, actor.y), actor.radius);
        }
        
        /** Narrow shape */
        if(actor.collisionNarrowShape == undefined) {

            actor.collisionNarrowShape = (actor.collider == "Box") ? new SAT.Box(new SAT.Vector(actor.x - actor.width / 2, actor.y - actor.height / 2), actor.width, actor.height).toPolygon() : actor.collisionBroadShape;
        }
    }

    checkCollisions() {

        for(var i in this.actorList) {
            
            //this.drawCollisionShape(this.actorList[i]); /** Debug */

            for(var j in this.actorList[i].collisionList) {

                for(var k = 0; k < this.tagList[j].length; k++) {

                    //this.drawCollisionShape(this.tagList[j][k]); /** Debug */

                    /** Broad phase */
                    if(SAT.testCircleCircle(this.actorList[i].collisionBroadShape, this.tagList[j][k].collisionBroadShape, null)) {

                        /** Narrow phase */
                        switch(this.actorList[i].collider + this.tagList[j][k].collider) {

                            case "CircleCircle":
                                this.actorList[i]["collidingWith" + j + "Tag"] = true;
                                break;
                            case "BoxBox":
                                this.actorList[i]["collidingWith" + j + "Tag"] = SAT.testPolygonPolygon(this.actorList[i].collisionNarrowShape, this.tagList[j][k].collisionNarrowShape);
                                break;
                            case "CircleBox":
                                this.actorList[i]["collidingWith" + j + "Tag"] = SAT.testCirclePolygon(this.actorList[i].collisionNarrowShape, this.tagList[j][k].collisionNarrowShape);
                                break;
                            case "BoxCircle":
                                this.actorList[i]["collidingWith" + j + "Tag"] = SAT.testPolygonCircle(this.actorList[i].collisionNarrowShape, this.tagList[j][k].collisionNarrowShape);
                                break;
                            default:
                                console.log("ERROR: Hay alguna colision sin configurar.");
                                break;
                        }
                    }
                }
            }
        }
    }

    updateCollisionShape() {

        for(var i in this.actorList) {

            this.updateActorCollisionShape(this.actorList[i]);
        }

        for(var i in this.tagList) {

            for(var j = 0; j < this.tagList[i].length; j++) {

                this.updateActorCollisionShape(this.tagList[i][j]);
            }
        }
    }

    updateActorCollisionShape(actor) {

        actor.collisionBroadShape.pos.x = actor.x;
        actor.collisionBroadShape.pos.y = actor.y;

        actor.collisionNarrowShape.pos.x = actor.x - actor.width / 2;
        actor.collisionNarrowShape.pos.y = actor.y - actor.height / 2;
    }

    drawCollisionShape(actor) {

        actor.collisionBroadDebugSprite.removeChildren();
        actor.collisionNarrowDebugSprite.removeChildren();

        if(actor.collider == "Box") {

            var vertices = actor.collisionNarrowShape.points;

            var graphics = new PIXI.Graphics();

            graphics.lineStyle(1, 0x0000ff);
            graphics.moveTo(actor.collisionNarrowShape.pos.x + vertices[0].x, actor.collisionNarrowShape.pos.y + vertices[0].y);

            for(var j = 1; j < vertices.length; j++) {

                graphics.lineTo(actor.collisionNarrowShape.pos.x + vertices[j].x, actor.collisionNarrowShape.pos.y + vertices[j].y);
            }

            graphics.lineTo(actor.collisionNarrowShape.pos.x + vertices[0].x, actor.collisionNarrowShape.pos.y + vertices[0].y);

            actor.collisionNarrowDebugSprite.addChild(graphics);
        }
        
        
        var graphics = new PIXI.Graphics();

        graphics.lineStyle(5, 0x00ff00);

        graphics.drawCircle(actor.collisionBroadShape.pos.x, actor.collisionBroadShape.pos.y, actor.collisionBroadShape.r); 

        actor.collisionBroadDebugSprite.addChild(graphics);
    }

    testCircles(actorA, actorB) {

        //console.log(actorA, actorB, this.getActorsDistance(actorA, actorB), (actorA.radius + actorB.radius));

        return this.getActorsDistance(actorA, actorB) < (actorA.radius + actorB.radius) ? true : false;
    }

    getActorsDistance(actorA, actorB) {

        return Math.hypot(actorB.x - actorA.x, actorB.y - actorA.y);
    }
}