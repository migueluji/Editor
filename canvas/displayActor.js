class DisplayActor extends PIXI.Container {

    constructor(stage,actor,texture) {
        super();

        this.id=actor.id;  
        this.angle=actor.rotation;
        this.interactive=true;
        this.buttonMode=true;
        this.x=actor.x;
        this.y=actor.y;

        if (texture) {
            this.tilingSprite = new PIXI.TilingSprite(texture,texture.width,texture.height);
            this.tilingSprite.width=this.tilingSprite.texture.width*actor.tileX;
            this.tilingSprite.height=this.tilingSprite.texture.height*actor.tileY;
        }
        else {
            this.tilingSprite = new PIXI.TilingSprite(PIXI.Texture.EMPTY,50,50);
            this.tilingSprite.width=50*actor.tileX;
            this.tilingSprite.height=50*actor.tileY;
        }

        this.tilingSprite.scale.x=actor.scaleX;
        this.tilingSprite.scale.y=-actor.scaleY; // cambio eje y gira la escala del sprite
        this.tilingSprite.anchor.set(0.5);
        this.addChild(this.tilingSprite);

        this
            .on('pointerdown',this.onPointerDown.bind(this))
            .on('pointerup',this.onPointerUp.bind(this))
            .on('pointerupoutside',this.onPointerUp.bind(this))
            .on('pointermove',this.onPointerMove.bind(this));

        stage.addChild(this);
        console.log("constructor",this.tilingSprite.height,this.height);
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
        this.OBB.moveTo(this.points[1].x,this.points[1].y);
        this.OBB.lineTo(this.points[3].x,this.points[3].y);
        this.OBB.lineTo(this.points[8].x,this.points[8].y);
        this.OBB.lineTo(this.points[6].x,this.points[6].y);
        this.OBB.closePath();
        this.OBB.moveTo(this.points[2].x,this.points[2].y);
        this.OBB.lineTo(this.points[0].x,this.points[0].y);
        this.addChild(this.OBB);

        this.gScaleUR = new PIXI.Graphics();
        this.gScaleUR.beginFill(0xDDDDDD);
        this.gScaleUR.drawCircle(this.points[3].x,this.points[3].y,4.0/this.parent.scale.x);
        this.gScaleUR.endFill();
        this.gScaleUR.interactive=true;
        this.gScaleUR.on("pointerdown",this.scaleStart.bind(this));
        this.addChild(this.gScaleUR);
        
        this.gRotation = new PIXI.Graphics(); // Rotation gizmo
        this.gRotation.lineStyle(1, 0xDDDDDD, 1, 0, true);
        this.gRotation.beginFill(0xDDDDDD);
        this.gRotation.drawCircle(0,this.points[0].y,4.0/this.parent.scale.x);
        this.gRotation.endFill();
        this.gRotation.interactive=true;
        this.gRotation.on("pointerdown",this.rotateStart.bind(this));
        this.addChild(this.gRotation);
        console.log("create gizmo",this.tilingSprite.height,this.height);
    }

// Handlers

    scaleStart(e){
        this.operation ="scaling";
        this.p0=e.data.getLocalPosition(this.parent); 
        this.size0={w:this.tilingSprite.width*this.tilingSprite.scale.x,h:this.tilingSprite.height*-this.tilingSprite.scale.y};
        this.scale0={x:this.tilingSprite.scale.x,y:this.tilingSprite.scale.y};
        this.position0={x:this.x,y:this.y};

        var p={x:-this.size0.w/2,y:-this.size0.h/2};

        var newx= p.x*Math.cos(this.rotation)-p.y*Math.sin(this.rotation);
        var newy= p.x*Math.sin(this.rotation)+p.y*Math.cos(this.rotation);

        this.origen={x:this.x+newx,y:this.y+newy};

        this.angle0=this.angle;
        console.log("scale start",this.tilingSprite.height,this.height,this.size0.h);
        e.stopPropagation();
    }

    rotateStart(e){
        this.operation="rotating";
        this.position0={x:this.x,y:this.y};
        e.stopPropagation();
    }

    onPointerDown (e){
        this.operation="dragging";
        this.point0=e.data.getLocalPosition(this.parent);
        this.offset={x:this.point0.x-this.x,y:this.point0.y-this.y};
        Command.selectActorCmd(this.id);
        e.stopPropagation();
    }

    onPointerMove(e){
        var p1= e.data.getLocalPosition(this.parent);
        switch (this.operation) {
            case "dragging":
                this.x=p1.x-this.offset.x; 
                this.y=p1.y-this.offset.y; 
                break;
            case "rotating":
                this.angle =  -90 + Math.atan2(p1.y-this.position0.y,p1.x-this.position0.x)*180/Math.PI; 
                break;
            case "scaling" :
                var dispX=p1.x-this.p0.x;
                var dispY=p1.y-this.p0.y;
                this.removeGizmo();
                this.x=0;this.y=0;this.angle=0;
                this.updateWorldTransform;

                this.tilingSprite.scale.x=this.scale0.x*(this.size0.w+dispX)/this.size0.w;
                this.tilingSprite.scale.y=this.scale0.y*(this.size0.h+dispY)/this.size0.h;
                console.log("move1",this.tilingSprite.height,this.height,this.size0.h);
                this.updateWorldTransform;

                this.angle=this.angle0;
                var p={x:this.tilingSprite.width*this.tilingSprite.scale.x/2,y:-this.tilingSprite.height*this.tilingSprite.scale.y/2};
                this.x= p.x*Math.cos(this.rotation)-p.y*Math.sin(this.rotation);
                this.y= p.x*Math.sin(this.rotation)+p.y*Math.cos(this.rotation);
                console.log("move2",this.tilingSprite.height,this.height,this.size0.h);
                this.updateWorldTransform;
        
                this.x= this.x+this.position0.x;
                this.y= this.y+this.position0.y;
                console.log("move3",this.tilingSprite.height,this.height,-this.tilingSprite.height*this.tilingSprite.scale.y);
                this.updateWorldTransform;

                console.log(this.x,this.y);
                this.x= this.x-(this.position0.x-this.origen.x);
                this.y= this.y-(this.position0.y-this.origen.y);
                console.log((this.position0.x-this.origen.x),this.position0.x,this.origen.x);
                console.log("move4",this.tilingSprite.height,this.height,this.size0.h);
                this.updateWorldTransform;

                this.createGizmo();
                break;            
        }
    }

    onPointerUp(e){    
        var sceneID=document.querySelector(".sceneselected").id; 
        var point1= e.data.getLocalPosition(this.parent);point1.y=-point1.y;
        switch (this.operation) {
            case "dragging":
                    if (point1.x!=this.point0.x || point1.y!=this.point0.y){
                        CmdManager.changeActorPropertyCmd(sceneID,this.id,"position",{x:this.x,y:this.y});
                    }; break;
            case "rotating":
                    CmdManager.changeActorPropertyCmd(sceneID,this.id,"rotation",this.angle); break;
            case "scaling":
                    CmdManager.changeActorPropertyCmd(sceneID,this.id,"scaleX",this.tilingSprite.scale.x.toFixed(2)); 
                    CmdManager.changeActorPropertyCmd(sceneID,this.id,"scaleY",-this.tilingSprite.scale.y.toFixed(2));
                    CmdManager.changeActorPropertyCmd(sceneID,this.id,"x",this.x);
                    CmdManager.changeActorPropertyCmd(sceneID,this.id,"y",this.y);
                    break;
        } 
        this.operation=null;
        this.data=null;
    }

// Utils
    computePoints(x,y,w,h){
        var p=[];
        p[0]={x:x,y:y+h/2+20}
        p[1]={x:x-w/2,y:y+h/2};
        p[2]={x:x,y:y+h/2};
        p[3]={x:x+w/2,y:y+h/2};
        p[4]={x:x-w/2,y:y};
        p[5]={x:x+w/2,y:y};
        p[6]={x:x-w/2,y:y-h/2};
        p[7]={x:x,y:y-h/2};
        p[8]={x:x+w/2,y:y-h/2};
        return p;
    }
}