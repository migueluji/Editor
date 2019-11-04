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
        this.flipX=actor.flipX;
        this.flipY=actor.flipY;
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

    createGizmo(){
        this.gizmo=new PIXI.Container();
        this.addChild(this.gizmo);

        this.points=this.computePoints(0,0,this.width,this.height);

        this.createOBB(this.points);
        this.createHandler(this.points[0],"circle",this.initRotationHandler,{x:this.x,y:this.y});
        this.createHandler(this.points[1],"circle",this.initScaleUniformHandler,this.points[8]);
        this.createHandler(this.points[2],"rectangle",this.initScaleHandler,this.points[7]);
        this.createHandler(this.points[3],"circle",this.initScaleUniformHandler,this.points[6]);
        this.createHandler(this.points[4],"rectangle",this.initScaleHandler,this.points[5]);
        this.createHandler(this.points[5],"rectangle",this.initScaleHandler,this.points[4]);
        this.createHandler(this.points[6],"circle",this.initScaleUniformHandler,this.points[3]);
        this.createHandler(this.points[7],"rectangle",this.initScaleHandler,this.points[2]);
        this.createHandler(this.points[8],"circle",this.initScaleUniformHandler,this.points[1]);
    }

    removeGizmo(){
        this.removeChild(this.gizmo);
    }

// Handlers
    onPointerDown (e){
        this.operation="dragging";
        this.mouseDown=e.data.getLocalPosition(this.parent);
        this.initPosition={x:this.x,y:this.y};
        Command.selectActorCmd(this.id);
        e.stopPropagation();
    }

    initRotationHandler(pointHandler,pivot,e){
        this.operation="rotating";
        this.mouseDown={x:pivot.x,y:pivot.y}; // pivot = this.x,this.y
        e.stopPropagation();
    }

    initScaleUniformHandler(pointHandler,pivot,e){
        
        this.operation ="scalingUniform";
        this.mouseDown=e.data.getLocalPosition(this.parent); 
        this.initSize={w:this.tilingSprite.width*this.tilingSprite.scale.x,h:this.tilingSprite.height*-this.tilingSprite.scale.y};
        this.initScale={x:this.tilingSprite.scale.x,y:this.tilingSprite.scale.y};
        this.initAngle=this.angle;

        this.quadrant=1;
        if (pointHandler.x<pivot.x) this.quadrant=2;
        if (pointHandler.y<pivot.y) this.quadrant=4;
        if (pointHandler.x<pivot.x && pointHandler.y<pivot.y) this.quadrant=3;

        var newPivot=this.rotatePoint(pivot,this.rotation);
        this.initPivot={x:this.x+newPivot.x,y:this.y+newPivot.y};
        var newPointHandler=this.rotatePoint(pointHandler,this.rotation);
        this.initPointHandler={x:this.x+newPointHandler.x,y:this.y+newPointHandler.y};
        e.stopPropagation();
    }

    initScaleHandler (pointHandler,pivot,e){
        this.operation ="scaling";
        this.mouseDown=e.data.getLocalPosition(this.parent); 
        this.initSize={w:this.tilingSprite.width*this.tilingSprite.scale.x,h:this.tilingSprite.height*-this.tilingSprite.scale.y};
        this.initScale={x:this.tilingSprite.scale.x,y:this.tilingSprite.scale.y};
        this.initAngle=this.angle;
        this.initPointHandler=pointHandler;

        this.axis=1;
        if (pointHandler.y>pivot.y) this.axis=2;
        if (pointHandler.x<pivot.x) this.axis=3;
        if (pointHandler.y<pivot.y) this.axis=4;

        var newPivot=this.rotatePoint(pivot,this.rotation);
        this.initPivot={x:this.x+newPivot.x,y:this.y+newPivot.y};
            e.stopPropagation();
    }

    onPointerMove(e){
        
        if (this.operation){
            var mouseMove= e.data.getLocalPosition(this.parent);
            var diff={x:mouseMove.x-this.mouseDown.x,y:mouseMove.y-this.mouseDown.y};
        }     
        switch (this.operation) {
            case "scaling" :
                    this.removeGizmo();
                        
                    this.x=0;this.y=0;this.angle=0;
                    var giro=1;
                    var diff={x:mouseMove.x-this.initPivot.x,y:mouseMove.y-this.initPivot.y}; // quadrant x,y
                    
                    switch (this.axis) {
                        case 3 : diff.x=-diff.x ; giro= -1; break;
                        case 4 : diff.y=-diff.y;  giro= -1; break;
                    }
                    if(this.flipX) {diff.x=-diff.x; giro=-giro}
                    if(this.flipY) {diff.y=-diff.y; giro=-giro}

                    diff=this.rotatePoint(diff,-this.initAngle*Math.PI/180*giro);

                    switch (true) {
                        case (this.axis==1) || (this.axis==3):
                            this.tilingSprite.scale.x= this.initScale.x* (diff.x)/this.initSize.w;
                            this.tilingSprite.scale.y= this.initScale.y; 
                            break;
                        case (this.axis==2) || (this.axis==4) :                        
                            this.tilingSprite.scale.y= this.initScale.y* (diff.y)/this.initSize.h;
                            this.tilingSprite.scale.x= this.initScale.x; 
                            break;
                    }

                    this.angle=this.initAngle;
                    var pivot={x:this.tilingSprite.width*this.tilingSprite.scale.x/2,y:-this.tilingSprite.height*this.tilingSprite.scale.y/2};
                    switch (this.axis) {
                        case 1: 
                            pivot.y=0;
                            break;
                        case 2:
                            pivot.x=0; 
                            break;
                        case 3 :
                            pivot.x=-pivot.x; pivot.y=0; 
                            break;
                        case 4 : 
                            pivot.x=0;pivot.y=-pivot.y; 
                            break;
                    }
                  
                    if(this.flipX) pivot.x=-pivot.x;
                    if(this.flipY) pivot.y=-pivot.y;
                    this.position=this.rotatePoint(pivot,this.rotation);
                    this.position={x:this.x+this.initPivot.x,y:this.y+this.initPivot.y};

                    if ((this.tilingSprite.scale.y>0 && !this.flipY) || (this.tilingSprite.scale.y<0 && this.flipY)){
                        this.angle=(this.initAngle+180) % 360;
                        this.tilingSprite.scale={x:-this.tilingSprite.scale.x,y:-this.tilingSprite.scale.y};
                    }
                   
                    this.createGizmo();
                    break;    
            case "dragging":
                this.x= this.initPosition.x + diff.x;
                this.y= this.initPosition.y + diff.y; 
                break;
            case "rotating":
                this.angle = - 90 + Math.atan2(diff.y,diff.x)*180/Math.PI;
                if (this.angle<0.0) this.angle +=360; //convert atan2 value to standar 360 degree system value
                break;
            case "scalingUniform" :
                this.removeGizmo();
                    
                this.x=0;this.y=0;this.angle=0;
                var giro=1; 
                var diff={x:mouseMove.x-this.initPivot.x,y:mouseMove.y-this.initPivot.y}; // quadrant x,y
    
                switch (this.quadrant) {
                    case 2 : diff.x=-diff.x ; giro=-1; break;
                    case 3 : diff.x=-diff.x; diff.y=-diff.y; giro=1; break;
                    case 4 : diff.y=-diff.y; giro=-1; break;
                }   
                if(this.flipX) {diff.x=-diff.x; giro=-giro}
                if(this.flipY) {diff.y=-diff.y; giro=-giro}
                diff=this.rotatePoint(diff,-this.initAngle*Math.PI/180*giro);

                this.tilingSprite.scale.x= this.initScale.x* (diff.x)/this.initSize.w;
                this.tilingSprite.scale.y= this.initScale.y * this.tilingSprite.scale.x/ this.initScale.x;
         
                this.angle=this.initAngle;
                var pivot={x:this.tilingSprite.width*this.tilingSprite.scale.x/2,y:-this.tilingSprite.height*this.tilingSprite.scale.y/2};// quadrant x,y
                switch (this.quadrant) {
                    case 2 : pivot.x=-pivot.x; break;
                    case 3 : pivot.x=-pivot.x; pivot.y=-pivot.y; break;
                    case 4 : pivot.y=-pivot.y; break;
                }
                if(this.flipX) pivot.x=-pivot.x;
                if(this.flipY) pivot.y=-pivot.y;
                this.position=this.rotatePoint(pivot,this.rotation);
                
                this.position={x:this.x+this.initPivot.x,y:this.y+this.initPivot.y};

                if ((this.tilingSprite.scale.x<0 && !this.flipX) ||(this.tilingSprite.scale.x>0 && this.flipX)) {
                    this.angle=(this.initAngle+180) % 360;
                    this.tilingSprite.scale={x:-this.tilingSprite.scale.x,y:-this.tilingSprite.scale.y};
                }
          
                this.createGizmo();
                break;         
        }
    }

    onPointerUp(e){    
        var sceneID=document.querySelector(".sceneselected").id; 
        var mouseUp= e.data.getLocalPosition(this.parent);mouseUp.y=mouseUp.y;
        switch (this.operation) {
            case "dragging":
                    if (mouseUp.x!=this.mouseDown.x || mouseUp.y!=this.mouseDown.y){
                        CmdManager.changeActorPropertyCmd(sceneID,this.id,"position",{x:this.x,y:this.y});
                    }; break;
            case "rotating":
                    CmdManager.changeActorPropertyCmd(sceneID,this.id,"rotation",this.angle); 
                    break;
            case "scalingUniform":
                    console.log(this.tilingSprite.scale);
                    var flipX;
                    if (this.tilingSprite.scale.x<0){
                        flipX=true;
                        this.tilingSprite.scale.x=-this.tilingSprite.scale.x;
                    }
                    if (this.tilingSprite.scale.y>0){
                         this.tilingSprite.scale.y=-this.tilingSprite.scale.y;
                    }
                    CmdManager.changeActorPropertyCmd(sceneID,this.id,"scaleUniform",{
                        x:this.x,y:this.y,rotation:this.angle, flipX:flipX,
                        scaleX:this.tilingSprite.scale.x,scaleY:-this.tilingSprite.scale.y}); 
                    break;
            case "scaling":
                    var flipX;
                    if (this.tilingSprite.scale.x<0) {
                        flipX=true;
                        this.tilingSprite.scale.x=-this.tilingSprite.scale.x;
                    }
                    else flipX=false;
                    if (this.flipY) this.tilingSprite.scale.y=-this.tilingSprite.scale.y;
                    CmdManager.changeActorPropertyCmd(sceneID,this.id,"scale",{
                        x:this.x,y:this.y,rotation:this.angle, flipX:flipX,
                        scaleX:this.tilingSprite.scale.x,scaleY:-this.tilingSprite.scale.y}); 
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

    rotatePoint(p,angle){
        var newX= p.x*Math.cos(angle)-p.y*Math.sin(angle);
        var newY= p.x*Math.sin(angle)+p.y*Math.cos(angle);
        return {x:newX,y:newY}
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

    createHandler(pointHandler,type,handler,pivot){
        var graphic = new PIXI.Graphics();
        graphic.beginFill(0xDDDDDD);
        if (type=="rectangle") graphic.drawRect(pointHandler.x-5/this.parent.scale.x,pointHandler.y-5/this.parent.scale.y,10.0/this.parent.scale.x,10.0/this.parent.scale.y);
        graphic.drawCircle(pointHandler.x,pointHandler.y,5.0/this.parent.scale.x);
        graphic.endFill();
        graphic.interactive=true;
        graphic.buttonMode=true;
        graphic.on("pointerdown",handler.bind(this,pointHandler,pivot));
        this.gizmo.addChild(graphic);
    }

}