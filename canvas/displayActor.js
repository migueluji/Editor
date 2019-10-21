class DisplayActor extends PIXI.Container {

    constructor(actor,texture) {
        super();

        this.id=actor.id;  
        this.tilingSprite=null;
        this.angle=-actor.rotation;
        this.interactive=true;
        this.buttonMode=true;
        this.OBB=null;
        this.UP=null;
        this.initRotate=false;

        if (texture) {
            this.tilingSprite = new PIXI.TilingSprite(texture,texture.width,texture.height);
            this.tilingSprite.width=this.tilingSprite.texture.width*actor.tileX;
            this.tilingSprite.height=this.tilingSprite.texture.height*actor.tileY;
            this.tilingSprite.scale.x=actor.scaleX;
            this.tilingSprite.scale.y=actor.scaleY;
            this.tilingSprite.anchor.set(0.5);
            this.addChild(this.tilingSprite);
        }

        this
            .on('pointerdown',this.onDragStart.bind(this))
            .on('pointerup',this.onDragEnd.bind(this))
            .on('pointerupoutside',this.onDragEnd.bind(this))
            .on('pointermove',this.onDragMove.bind(this));
    }

    removeGizmo(){
        this.removeChild(this.OBB);
        this.removeChild(this.UP);
        this.OBB=null;
        this.UP=null;
    }

    createGizmo(){
        console.log(this,this.parent.scale);
        this.OBB = new PIXI.Graphics();
        this.OBB.lineStyle(1, 0xDDDDDD, 1, 0, true);
        this.OBB.drawRect(-this.width/2.0,-this.height/2.0,this.width,this.height);
        this.addChild(this.OBB);

        this.UP = new PIXI.Graphics();
        this.UP.lineStyle(1, 0xDDDDDD, 1, 0, true);
        this.UP.beginFill(0xDDDDDD);
        
        this.UP.drawCircle(0,-this.height/2.0-16/this.parent.scale.x,4.0/this.parent.scale.x);
        this.UP.endFill();
        this.UP.interactive=true;
        this.UP
            .on("pointerdown",this.rotateStart.bind(this))
            .on("pointermove",this.rotateMove.bind(this))
            .on("pointerup",this.rotateEnd.bind(this))
            .on("pointerupoutside",this.rotateEnd.bind(this));
        this.addChild(this.UP);
    }

    

// Handlers
    rotateStart(e){
        this.initRotate=true;
        this.origenRotation={x:this.x,y:this.y};
        e.stopPropagation();
    }

    rotateMove(e){
        if (this.initRotate){
            var position=e.data.getLocalPosition(this.parent);
            this.angle = 90 -Math.atan2(this.origenRotation.y-position.y,position.x-this.origenRotation.x)*180/Math.PI;
        }
    }

    rotateEnd(){
         this.initRotate=false;
         var sceneID=document.querySelector(".sceneselected").id;
         CmdManager.changeActorPropertyCmd(sceneID,this.id,"rotation",-this.angle);
    }

    onDragStart(e){
        this.data=e.data;
        this.dragging=true;
        this.origen=this.data.getLocalPosition(this.parent);
        this.offsetX=this.origen.x-this.x;
        this.offsetY=this.origen.y-this.y;
        Command.selectActorCmd(this.id);
    }

    onDragMove(e){
       if(this.dragging) {
           const newPosition = this.data.getLocalPosition(this.parent);
           this.x=newPosition.x-this.offsetX;
           this.y=newPosition.y-this.offsetY;
       }
    }

    onDragEnd(){     
        if (this.dragging){ //eivita que se ejecute el codigo en otro actor que no sea el que se mueve
            var position=this.origen;
            if (this.data) position = this.data.getLocalPosition(this.parent);  
            if (position.x!=this.origen.x || position.y!=this.origen.y){
                var sceneID=document.querySelector(".sceneselected").id;
                var drawerApp=document.querySelector(".mdc-drawer-app-content");
                var offsetX = -drawerApp.getBoundingClientRect().x/this.parent.scale.x;
                var xValue=this.x-window.innerWidth/2.0-offsetX;
                var yValue=window.innerHeight/2.0-this.y;
                CmdManager.changeActorPropertyCmd(sceneID,this.id,"position",{x:xValue,y:yValue});
            }      
        }
        this.dragging=false;
        this.data=null;
    }
}