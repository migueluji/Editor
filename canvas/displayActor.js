class DisplayActor extends PIXI.Container {

    constructor(stage,actor,texture) {
        super();

        this.id=actor.id;  
        this.angle=-actor.rotation;
        this.interactive=true;
        this.buttonMode=true;
        this.x=actor.x;
        this.y=-actor.y;

        if (texture) {
            this.tilingSprite = new PIXI.TilingSprite(texture,texture.width,texture.height);
            this.tilingSprite.width=this.tilingSprite.texture.width*actor.tileX;
            this.tilingSprite.height=this.tilingSprite.texture.height*actor.tileY;
        }
        else {
         //   this.tilingSprite = new PIXI.TilingSprite(PIXI.Texture.EMPTY,50,50);
            this.tilingSprite.width=50*actor.tileX;
            this.tilingSprite.height=50*actor.tileY;
        }

        this.tilingSprite.scale.x=actor.scaleX;
        this.tilingSprite.scale.y=actor.scaleY;
        this.tilingSprite.anchor.set(0.5);
        this.addChild(this.tilingSprite);

        this
            .on('pointerdown',this.onPointerDown.bind(this))
            .on('pointerup',this.onPointerUp.bind(this))
            .on('pointerupoutside',this.onPointerUp.bind(this))
            .on('pointermove',this.onPointerMove.bind(this));

        stage.addChild(this);
    }

    removeGizmo(){
        this.removeChild(this.OBB);
        this.removeChild(this.gRotation);
        this.removeChild(this.gScaleUR);
    }

    createGizmo(){
     
        this.points=this.computePoints(0,0,this.width,this.height);
        var scale= {x:this.parent.scale.x,y:this.parent.scale.y};
       
        this.OBB = new PIXI.Graphics(); // Oriented Bounding Box
        this.OBB.lineStyle(1, 0xDDDDDD, 1, 0, true);
        this.OBB.moveTo(this.points[0].x,this.points[0].y);
        this.OBB.lineTo(this.points[2].x,this.points[2].y);
        this.OBB.lineTo(this.points[7].x,this.points[7].y);
        this.OBB.lineTo(this.points[5].x,this.points[5].y);
        this.OBB.closePath();
        this.OBB.moveTo(this.points[1].x,this.points[1].y);
        this.OBB.lineTo(this.points[8].x,this.points[8].y);
        this.addChild(this.OBB);

        this.gScaleUR = new PIXI.Graphics();
        this.gScaleUR.beginFill(0xDDDDDD);
        this.gScaleUR.drawRect(this.points[2].x-4/scale.x,this.points[2].y-4/scale.y,8/scale.x,8/scale.y);
        this.gScaleUR.endFill();
        this.gScaleUR.interactive=true;
        this.gScaleUR.on("pointerdown",this.gScale2.bind(this));
        this.addChild(this.gScaleUR);
        
         this.gRotation = new PIXI.Graphics(); // Rotation gizmo
         this.gRotation.lineStyle(1, 0xDDDDDD, 1, 0, true);
         this.gRotation.beginFill(0xDDDDDD);
         this.gRotation.drawCircle(0,this.points[0].y-20,4.0/this.parent.scale.x);
         this.gRotation.endFill();
         this.gRotation.interactive=true;
         this.gRotation.on("pointerdown",this.rotateStart.bind(this));
         this.addChild(this.gRotation);
    }

// Handlers

    gScale2(e){
        this.operation ="scaling";
        this.origenScaling=e.data.getLocalPosition(this.parent);
        this.originalWidth=this.width;
        this.originalX=this.x;
        console.log("scaling",this.width,this.x,this.origenScaling);
        e.stopPropagation();
    }

    rotateStart(e){
        this.operation="rotating";
        this.origenRotation={x:this.x,y:this.y};
        e.stopPropagation();
    }

    onPointerDown (e){
        this.operation="dragging";
        this.data=e.data;
        this.origen=this.data.getLocalPosition(this.parent);
        this.offsetX=this.origen.x-this.x;
        this.offsetY=this.origen.y-this.y;
        Command.selectActorCmd(this.id);
        e.stopPropagation();
    }

    onPointerMove(e){
        var newPosition= e.data.getLocalPosition(this.parent);
        switch (this.operation) {
            case "dragging":
                this.x=newPosition.x-this.offsetX; 
                this.y=newPosition.y-this.offsetY; break;
            case "rotating":
                this.angle = 90 -Math.atan2(this.origenRotation.y-newPosition.y,newPosition.x-this.origenRotation.x)*180/Math.PI; break;
            case "scaling" :
                this.removeGizmo();
                this.tilingSprite.scale.x=(this.originalWidth+(newPosition.x-this.origenScaling.x))/this.originalWidth;
                this.x = this.originalX + (newPosition.x-this.origenScaling.x)/2.0;
                this.createGizmo();
                break;            
        }
    }

    onPointerUp(e){    
        var sceneID=document.querySelector(".sceneselected").id;
        var newPosition= e.data.getLocalPosition(this.parent);
        switch (this.operation) {
            case "dragging":
                    if (newPosition.x!=this.origen.x || newPosition.y!=this.origen.y){
                        CmdManager.changeActorPropertyCmd(sceneID,this.id,"position",{x:this.x,y:-this.y});
                    }; break;
            case "rotating":
                    CmdManager.changeActorPropertyCmd(sceneID,this.id,"rotation",-this.angle); break;
            case "scaling":
                    CmdManager.changeActorPropertyCmd(sceneID,this.id,"scaleX",this.tilingSprite.scale.x.toFixed(2)); 
                    CmdManager.changeActorPropertyCmd(sceneID,this.id,"x",this.x);
                    break;
        } 
        this.operation=null;
        this.data=null;
    }

// Utils
    computePoints(x,y,w,h){
        var p=[];
        p[0]={x:x-w/2,y:y-h/2};
        p[1]={x:x,y:y-h/2};
        p[2]={x:x+w/2,y:y-h/2};
        p[3]={x:x-w/2,y:y};
        p[4]={x:x+w/2,y:y};
        p[5]={x:x-w/2,y:y+h/2};
        p[6]={x:x,y:y+h/2};
        p[7]={x:x+w/2,y:y+h/2};
        p[8]={x:x,y:y-h/2-20}
        return p;
    }
}