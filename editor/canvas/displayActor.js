class DisplayActor extends PIXI.Container {

    constructor(canvas,actor,cast,game) {
        super();
        this.canvas=canvas;
        this.id=actor.id;
        this.name=actor.name;
        this.game=game;  
        this.angle=actor.angle;
        this.interactive=true;
        this.buttonMode=true;
        this.x=actor.x;
        this.y=actor.y;
        this.flipX=actor.flipX;
        this.flipY=actor.flipY;
                
        var texture = null;
        var existsImage=Boolean(app.file.loader.resources[actor.image]);
        if (actor.image && existsImage) texture = app.file.loader.resources[actor.image].texture;
        else texture=PIXI.Texture.WHITE;

        this.createSprite(actor,texture); 
   
        if ((!actor.spriteOn && !actor.textOn) || actor.image=="" || !existsImage){
            (!existsImage && actor.image!="") ? this.borderColor=0xff0000 : this.borderColor=0xaaaaaa;
            if(!actor.textOn) this.createBorder();
        } 
        if (actor.text && actor.textOn) this.createText(actor,cast,game);

        this.on('pointerdown',this.onPointerDown.bind(this))
            .on('pointerup',this.onPointerUp.bind(this))
            .on('pointerupoutside',this.onPointerUp.bind(this))
            .on('pointermove',this.onPointerMove.bind(this));

        this.operation=null;
        this.visibleActor=(actor.spriteOn || actor.text);
    }

    createText(actor,cast,game){
        var w = Math.abs(this.tilingSprite.width*this.tilingSprite.scale.x);
        const style = new PIXI.TextStyle({
            fontFamily: actor.font,
            fill: actor.fill,
            fontSize: actor.size,
            fontStyle: actor.style,
            align: actor.align.toLowerCase(),
            wordWrap: true,
            wordWrapWidth:  w,
            padding:w
        });
        var newText = this.convertText(actor.text,actor,cast,game);
        const text = new PIXI.Text(newText, style);
        var pivot={x:0,y:0};
        switch (actor.align) {
            case "Left": pivot={x:-w/2,y:text.height/2} ;break;
            case "Right": pivot={x:w/2-text.width,y:text.height/2}; break; 
            case "Center": pivot={x:-text.width/2,y:text.height/2}; break; 
        }
        text.position={x:pivot.x+actor.offsetX,y:pivot.y+actor.offsetY};
        text.scale.y=-1;
        this.addChild(text);
    }

    createSprite(actor,texture){
        this.tilingSprite = new PIXI.TilingSprite(texture);
      
        (actor.spriteOn) ? this.tilingSprite.alpha=actor.opacity : this.tilingSprite.alpha=0;
        if (actor.sleeping && actor.spriteOn) this.tilingSprite.alpha=0.5;
        this.tilingSprite.tint= "0x"+String(actor.color).substr(1);

        var textureSize;
        (texture==PIXI.Texture.WHITE) ? textureSize={w:50,h:50} : textureSize={w:this.tilingSprite.texture.width,h:this.tilingSprite.texture.height};

        this.tilingSprite.width=textureSize.w*actor.tileX;
        this.tilingSprite.height=textureSize.h*actor.tileY;

        (actor.flipX) ? this.tilingSprite.scale.x =-actor.scaleX : this.tilingSprite.scale.x=actor.scaleX; 
        (actor.flipY) ? this.tilingSprite.scale.y = actor.scaleY : this.tilingSprite.scale.y=-actor.scaleY; // axis change and rotate the sprite scale
        this.tilingSprite.anchor.set(0.5001);
        
        this.addChild(this.tilingSprite);
    }

    createBorder(){
        var w = this.tilingSprite.width*this.tilingSprite.scale.x;
        var h = this.tilingSprite.height*this.tilingSprite.scale.y;
        this.border = new PIXI.Graphics();
        this.border.lineStyle(1, this.borderColor, 1, 0, true);
        this.border.moveTo(-w/2,h/2);
        this.border.lineTo(w/2,h/2);
        this.border.lineTo(w/2,-h/2);
        this.border.lineTo(-w/2,-h/2);
        this.border.closePath();
        this.addChild(this.border);
    }

    removeBorder(){
        this.removeChild(this.border);
    }

    createGizmo(){
        if (!this.visibleActor) this.removeBorder();
        var w = this.tilingSprite.width*this.tilingSprite.scale.x;
        var h = this.tilingSprite.height*this.tilingSprite.scale.y;
        this.gizmo=new PIXI.Container();
        this.addChild(this.gizmo);
  
        if (this.flipY) h=-h;
        this.points=this.computePoints(0,0,w,-h);
        this.createOBB(this.points);
        this.createHandler(this.points[0],"circle",this.initRotationHandler,{x:this.x,y:this.y});
        this.createHandler(this.points[1],"circle",this.initScaleHandler,this.points[8]);
        this.createHandler(this.points[2],"rectangle",this.initScaleNoUniformHandler,this.points[7]); 
        this.createHandler(this.points[3],"circle",this.initScaleHandler,this.points[6]);
        this.createHandler(this.points[4],"rectangle",this.initScaleNoUniformHandler,this.points[5]);
        this.createHandler(this.points[5],"rectangle",this.initScaleNoUniformHandler,this.points[4]);
        this.createHandler(this.points[6],"circle",this.initScaleHandler,this.points[3]);
        this.createHandler(this.points[7],"rectangle",this.initScaleNoUniformHandler,this.points[2]);
        this.createHandler(this.points[8],"circle",this.initScaleHandler,this.points[1]);
    }

    removeGizmo(){
        if (!this.visibleActor) this.createBorder();
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

    initScaleHandler(pointHandler,pivot,e){
        this.operation ="scaling";
        this.mouseDown=e.data.getLocalPosition(this.parent); 
        this.initSize={w:this.tilingSprite.width*this.tilingSprite.scale.x,h:this.tilingSprite.height*-this.tilingSprite.scale.y};
        this.initScale={x:this.tilingSprite.scale.x,y:this.tilingSprite.scale.y};
        this.initAngle=this.angle;

        this.quadrant=1;
        if (pointHandler.x<pivot.x) this.quadrant=2;
        if (pointHandler.y<pivot.y) this.quadrant=4;
        if (pointHandler.x<pivot.x && pointHandler.y<pivot.y) this.quadrant=3;

        var newPivot=Utils.rotatePoint(pivot,this.angle);
        this.initPivot={x:this.x+newPivot.x,y:this.y+newPivot.y};
        var newPointHandler=Utils.rotatePoint(pointHandler,this.angle);
        this.initPointHandler={x:this.x+newPointHandler.x,y:this.y+newPointHandler.y};
        e.stopPropagation();
    }

    initScaleNoUniformHandler (pointHandler,pivot,e){ 
        this.operation ="scalingNoUniform";
        this.mouseDown=e.data.getLocalPosition(this.parent); 
        this.initSize={w:this.tilingSprite.width*this.tilingSprite.scale.x,h:this.tilingSprite.height*-this.tilingSprite.scale.y};
        this.initScale={x:this.tilingSprite.scale.x,y:this.tilingSprite.scale.y};
        this.initAngle=this.angle;
        this.initPointHandler=pointHandler;

        this.axis=1;
        if (pointHandler.y>pivot.y) this.axis=2;
        if (pointHandler.x<pivot.x) this.axis=3;
        if (pointHandler.y<pivot.y) this.axis=4;

        var newPivot=Utils.rotatePoint(pivot,this.angle);
        this.initPivot={x:this.x+newPivot.x,y:this.y+newPivot.y};
        e.stopPropagation();
    }

    onPointerMove(e){
        if (this.operation){
            this.canvas.updateActorButton();
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
                this.removeBorder();
                    
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
                diff=Utils.rotatePoint(diff,-this.initAngle*giro);

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
                this.position=Utils.rotatePoint(pivot,this.angle);
                
                this.position={x:this.x+this.initPivot.x,y:this.y+this.initPivot.y};

                if ((this.tilingSprite.scale.x<0 && !this.flipX) ||(this.tilingSprite.scale.x>0 && this.flipX)) {
                    this.angle=(this.initAngle+180) % 360;
                    this.tilingSprite.scale={x:-this.tilingSprite.scale.x,y:-this.tilingSprite.scale.y};
                }
          
                this.createGizmo();
                break;   
            case "scalingNoUniform" : 
                this.removeGizmo();
                this.removeBorder();
                if(this.flipX)  this.tilingSprite.scale={x:-this.tilingSprite.scale.x,y:this.tilingSprite.scale.y};
                this.x=0;this.y=0;this.angle=0;
                var giro=1;
                var diff={x:mouseMove.x-this.initPivot.x,y:mouseMove.y-this.initPivot.y}; // quadrant x,y
                
                switch (this.axis) {
                    case 3 : diff.x=-diff.x ; giro= -1; break;
                    case 4 : diff.y=-diff.y;  giro= -1; break;
                }
                if(this.flipX) {diff.x=-diff.x; giro=-giro}
                if(this.flipY) {diff.y=-diff.y; giro=-giro}

                diff=Utils.rotatePoint(diff,-this.initAngle*giro);

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
                this.position=Utils.rotatePoint(pivot,this.angle);
                this.position={x:this.x+this.initPivot.x,y:this.y+this.initPivot.y};

                if ((this.tilingSprite.scale.y>0 && !this.flipY) || (this.tilingSprite.scale.y<0 && this.flipY)){
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
                    CmdManager.changeActorPropertyCmd(sceneID,this.id,"angle",this.angle); 
                    break;
            case "scaling":              
                    var flipX;
                    if (this.tilingSprite.scale.x<0){
                        flipX=true;
                        this.tilingSprite.scale.x=-this.tilingSprite.scale.x;
                    }
                    if (this.tilingSprite.scale.y>0){
                         this.tilingSprite.scale.y=-this.tilingSprite.scale.y;
                    }
                    CmdManager.changeActorPropertyCmd(sceneID,this.id,"scale",{
                        x:this.x,y:this.y,angle:this.angle, flipX:flipX,
                        scaleX:this.tilingSprite.scale.x,scaleY:-this.tilingSprite.scale.y}); 
                    break;
            case "scalingNoUniform": 
                    var flipX;
                    if (this.tilingSprite.scale.x<0) {
                        flipX=true;
                        this.tilingSprite.scale.x=-this.tilingSprite.scale.x;
                    }
                    else flipX=false;
                    if (this.flipY) this.tilingSprite.scale.y=-this.tilingSprite.scale.y;
                    CmdManager.changeActorPropertyCmd(sceneID,this.id,"scaleNoUniform",{
                        x:this.x,y:this.y,angle:this.angle, flipX:flipX,
                        scaleX:this.tilingSprite.scale.x,scaleY:-this.tilingSprite.scale.y}); 
                break;            
        } 
        this.operation=null;
        this.data=null;
    }

// Utils
    computePoints(x,y,w,h){
        var p=[];                   p[0]={x:x,y:y+h/2+25/this.parent.parent.scale.x};
        p[1]={x:x-w/2,y:y+h/2};     p[2]={x:x,y:y+h/2};         p[3]={x:x+w/2,y:y+h/2};
        p[4]={x:x-w/2,y:y};                                     p[5]={x:x+w/2,y:y};
        p[6]={x:x-w/2,y:y-h/2};     p[7]={x:x,y:y-h/2};         p[8]={x:x+w/2,y:y-h/2};
        return p;
    }

    createOBB(p){
        var OBB = new PIXI.Graphics(); // Oriented Bounding Box
        OBB.lineStyle(1, 0xaaaaaa, 1, 0, true);
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
        var scale=this.parent.parent.scale.x;
        var graphic = new PIXI.Graphics();
        graphic.beginFill(0xaaaaaa);
        if (type=="circle") graphic.lineStyle(1,0xffffff,1,0.5,true);
        graphic.drawCircle(pointHandler.x,pointHandler.y,5.0/scale);
        graphic.lineStyle(1,0xffffff,1,0.5,true);
        if (type=="rectangle") graphic.drawRect(pointHandler.x-5/scale,pointHandler.y-5/scale,10.0/scale,10.0/scale); 
        graphic.endFill();
        graphic.interactive=true;
        graphic.buttonMode=true;
        graphic.on("pointerdown",handler.bind(this,pointHandler,pivot));
        this.gizmo.addChild(graphic);
    }

    convertText(text,actor,cast,game){
        var i=text.indexOf("$",0);
        while (i!=-1){
            if ((i!=-1) && (text[i+1]=="{")) {
                var j=text.indexOf("}",i+2);
                if (j!=-1) { // end of string
                    var string = text.substring(i+2,j);
                    var k=string.indexOf(".",0);
                    var textElement=null;
                    var textProperty=null;
                    var newValue=null;
                    textElement=string.substring(0,k);
                    textProperty=string.substring(k+1,string.length);
                    if (textElement=="Game") { // game property
                        if (game[textProperty]!=null) newValue=game[textProperty];
                        else newValue= '"error '+textElement + "."+textProperty+": property doesn't exist"+'"';
                    }
                    else 
                        if (textElement=="Me"){
                            if (actor[textProperty]!=null) newValue=actor[textProperty];
                            else newValue= '"error '+textElement + "."+textProperty+": property doesn't exist"+'"';
                        }
                        else { // actor cast property
                            var actorIndex=cast.findIndex(i => i.name == textElement);
                            if (actorIndex!=-1) {
                                if (cast[actorIndex][textProperty]!=undefined) newValue=cast[actorIndex][textProperty];
                                else newValue= '"error '+textElement + "."+textProperty+": property doesn't exist"+'"';
                            }
                            else newValue= '"error '+textElement + ": doesn't exist"+'"';
                        }
                    // adjust decimal values    
                    if (typeof(newValue)=="number"){ //si es un número
                        if (newValue % 1 != 0) {
                            var number=String(newValue).split(".");
                            if (number[1].length>2)	newValue=Number(newValue).toFixed(2);
                        }
                        else {
                            newValue=Math.round(newValue); 
                        }
                    }
                    text=text.replace(text.substring(i,j+1),newValue);
                }
            }
            i=text.indexOf("$",0);
        }
        return text;
    }

}