class DisplayActor extends PIXI.Container {

    constructor(stage,actor,texture) {
        super();

        this.id=actor.id;  
        this.angle=actor.rotation;
        this.interactive=true;
        this.buttonMode=true;
        this.x=actor.x;
        this.y=actor.y;
        this.texture= texture || PIXI.Texture.EMPTY;
        this.w= texture.width || 50;
        this.h= texture.height || 50;

        this.tilingSprite = new PIXI.TilingSprite(this.texture,this.w,this.h);
        this.tilingSprite.width=this.tilingSprite.texture.width*actor.tileX;
        this.tilingSprite.height=this.tilingSprite.texture.height*actor.tileY;
        (actor.flipX) ? this.tilingSprite.scale.x=-actor.scaleX : this.tilingSprite.scale.x=actor.scaleX; 
        (actor.flipY) ? this.tilingSprite.scale.y=actor.scaleY : this.tilingSprite.scale.y=-actor.scaleY; // axis change and rotate the sprite scale
        this.tilingSprite.anchor.set(0.5);

        this.addChild(this.tilingSprite);

        this
            .on('pointerdown',this.onPointerDown.bind(this))
            .on('pointerup',this.onPointerUp.bind(this))
            .on('pointerupoutside',this.onPointerUp.bind(this))
            .on('pointermove',this.onPointerMove.bind(this));

        stage.addChild(this);
        this.operation=null;
    }

    removeGizmo(){
        this.removeChild(this.gizmo);
    }

    createGizmo(){
        this.gizmo=new PIXI.Container();
        this.addChild(this.gizmo);

        this.points=this.computePoints(0,0,this.width,this.height);

        this.createOBB(this.points);
        this.createHandler(this.points[0],"circle",this.initRotationHandler,{x:this.x,y:this.y});
        this.createHandler(this.points[1],"circle",this.initScaleHandler,this.points[8]);
        this.createHandler(this.points[3],"circle",this.initScaleHandler,this.points[6]);
    }

// Handlers

    initScaleHandler(pivot,e){
    //    console.log("initScale3",this,e,pivot);
        this.operation ="scaling";
        this.mouseDown=e.data.getLocalPosition(this.parent); 

        this.initSize={w:this.tilingSprite.width*this.tilingSprite.scale.x,h:this.tilingSprite.height*-this.tilingSprite.scale.y};
        this.initScale={x:this.tilingSprite.scale.x,y:this.tilingSprite.scale.y};
        this.initAngle=this.angle;

        var pivotX= pivot.x*Math.cos(this.rotation)-pivot.y*Math.sin(this.rotation);
        var pivotY= pivot.x*Math.sin(this.rotation)+pivot.y*Math.cos(this.rotation);
        this.initPivot={x:this.x+pivotX,y:this.y+pivotY};

        e.stopPropagation();
    }

    initRotationHandler(pivot,e){
        this.operation="rotating";
        this.mouseDown={x:pivot.x,y:pivot.y}; // pivot = this.x,this.y
        e.stopPropagation();
    }

    onPointerDown (e){
        this.operation="dragging";
        this.mouseDown=e.data.getLocalPosition(this.parent);
        this.initPosition={x:this.x,y:this.y};
        Command.selectActorCmd(this.id);
        e.stopPropagation();
    }

    onPointerMove(e){
        if (this.operation){
            var mouseMove= e.data.getLocalPosition(this.parent);
            var diff={x:mouseMove.x-this.mouseDown.x,y:mouseMove.y-this.mouseDown.y};
        }     
        switch (this.operation) {
            case "dragging":
                this.x= this.initPosition.x + diff.x;
                this.y= this.initPosition.y + diff.y; 
                break;
            case "rotating":
                this.angle = - 90 + Math.atan2(diff.y,diff.x)*180/Math.PI;
                if (this.angle<0.0) this.angle +=360; //convert atan2 value to standar 360 degree system value
                break;
            case "scaling" :
                this.removeGizmo();
                this.x=0;this.y=0;this.angle=0;
                diff.x=diff.y=(diff.x+diff.y)/2.0;
                this.tilingSprite.scale.x=this.initScale.x*(this.initSize.w+diff.x)/this.initSize.w;
                this.tilingSprite.scale.y=-this.tilingSprite.scale.x;
          
                //this.tilingSprite.scale.y=this.initScale.y*(this.initSize.h+diff.y)/this.initSize.h;

                this.angle=this.initAngle;
                var p={x:this.tilingSprite.width*this.tilingSprite.scale.x/2,y:-this.tilingSprite.height*this.tilingSprite.scale.y/2};
                this.x= p.x*Math.cos(this.rotation)-p.y*Math.sin(this.rotation);
                this.y= p.x*Math.sin(this.rotation)+p.y*Math.cos(this.rotation);
        
                this.x= (this.x+this.initPivot.x);
                this.y= (this.y+this.initPivot.y);

                if (this.tilingSprite.scale.x<0){
                    this.angle=this.initAngle+180;
                    this.tilingSprite.scale.x=-this.tilingSprite.scale.x;
                    this.tilingSprite.scale.y=-this.tilingSprite.scale.x;
                }
      
                console.log(this.tilingSprite.scale.x,this.x,this.y);
                this.createGizmo();
                break;            
        }
    }

    onPointerUp(e){    
        var sceneID=document.querySelector(".sceneselected").id; 
        var mouseUp= e.data.getLocalPosition(this.parent);mouseUp.y=-mouseUp.y;
        switch (this.operation) {
            case "dragging":
                    if (mouseUp.x!=this.mouseDown.x || mouseUp.y!=this.mouseDown.y){
                        CmdManager.changeActorPropertyCmd(sceneID,this.id,"position",{x:this.x,y:this.y});
                    }; break;
            case "rotating":
                    CmdManager.changeActorPropertyCmd(sceneID,this.id,"rotation",this.angle); break;
            case "scaling":
                    CmdManager.changeActorPropertyCmd(sceneID,this.id,"scale",{
                        x:this.x,y:this.y,rotation:this.angle,
                        scaleX:this.tilingSprite.scale.x,scaleY:this.tilingSprite.scale.x}); 
                    break;
        } 
        this.operation=null;
        this.data=null;
    }

// Utils
    computePoints(x,y,w,h){
        var p=[];                   p[0]={x:x,y:y+h/2+25};
        p[1]={x:x-w/2,y:y+h/2};     p[2]={x:x,y:y+h/2};         p[3]={x:x+w/2,y:y+h/2};
        p[4]={x:x-w/2,y:y};                                     p[5]={x:x+w/2,y:y};
        p[6]={x:x-w/2,y:y-h/2};     p[7]={x:x,y:y-h/2};         p[8]={x:x+w/2,y:y-h/2};
        return p;
    }

    createOBB(p){
        var OBB = new PIXI.Graphics(); // Oriented Bounding Box
        OBB.lineStyle(1, 0xDDDDDD, 1, 0, true);
        OBB.moveTo(p[1].x,p[1].y);
        OBB.lineTo(p[3].x,p[3].y);
        OBB.lineTo(p[8].x,p[8].y);
        OBB.lineTo(p[6].x,p[6].y);
        OBB.closePath();
        OBB.moveTo(p[2].x,p[2].y);
        OBB.lineTo(p[0].x,p[0].y);
        this.gizmo.addChild(OBB);
    }

    createHandler(p,type,handler,pivot){
        var graphic = new PIXI.Graphics();
        graphic.beginFill(0xDDDDDD);
        if(type=="circle") graphic.drawCircle(p.x,p.y,4.0/this.parent.scale.x);
        graphic.endFill();
        graphic.interactive=true;
        graphic.on("pointerdown",handler.bind(this,pivot));
        this.gizmo.addChild(graphic);
    }

}