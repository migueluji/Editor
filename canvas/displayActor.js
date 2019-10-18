class DisplayActor extends PIXI.Container {

    constructor(actor,texture) {
        super();

        this.id=actor.id;  
        var tilingSprite;
        this.angle=-actor.rotation;
        this.interactive=true;
        this.buttonMode=true;

        if (texture) {
            tilingSprite = new PIXI.TilingSprite(texture,texture.width,texture.height);
            tilingSprite.width=tilingSprite.texture.width*actor.tileX;
            tilingSprite.height=tilingSprite.texture.height*actor.tileY;
            tilingSprite.scale.x=actor.scaleX;
            tilingSprite.scale.y=actor.scaleY;
            tilingSprite.anchor.set(0.5);
            this.addChild(tilingSprite);
        }

        this
            .on('pointerdown',this.onDragStart.bind(this))
            .on('pointerup',this.onDragEnd.bind(this))
            .on('pointerupoutside',this.onDragEnd.bind(this))
            .on('pointermove',this.onDragMove.bind(this));
    }

// Handlers
    onDragStart(e){
        this.data=e.data;
        this.dragging=true;
        this.origen=this.data.getLocalPosition(this.parent);
        this.offsetX=this.origen.x-this.x;
        this.offsetY=this.origen.y-this.y;
        Command.selectActorCmd(this.id);
    }

    onDragEnd(){     
        var sceneID=document.querySelector(".sceneselected").id;
        var drawerApp=document.querySelector(".mdc-drawer-app-content");
        var offsetX = -drawerApp.getBoundingClientRect().x/this.parent.scale.x;
        var position=this.origen;
        if (this.data) position = this.data.getLocalPosition(this.parent);  
        if (position!=this.origen){
            var xValue=this.x-window.innerWidth/2.0-offsetX;
            var yValue=window.innerHeight/2.0-this.y;
            CmdManager.changeActorPropertyCmd(sceneID,this.id,"position",{x:xValue,y:yValue});
        }      
        this.dragging=false;
        this.data=null;
    }

    onDragMove(){
        if(this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
            this.x=newPosition.x-this.offsetX;
            this.y=newPosition.y-this.offsetY;
            Command.selectActorCmd(this.id);
        }
    }

}