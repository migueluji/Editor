class CanvasView {

    constructor(imageList,actorList,width,height) {  
		this.html = document.createElement("div");
        this.html.className +="canvas";
        this.html.style.display="block";
        this.html.style.transform="";
        this.html.innerHTML =
            '<button id="addactor" class="do-button mdc-fab mdc-ripple-upgraded add-property-button">'+
                '<i class="material-icons">add</i>'+
            '</button>';
        this.html.querySelector("#addactor").addEventListener("click",this.addActorHandler.bind(this));
        this.html.addEventListener("wheel",this.mouseStageWheel.bind(this));
        window.addEventListener("resize",this.resize.bind(this,actorList));
       
        this.actorList=actorList;
        this.selected=false;
        this.displayObject=null;
        this.mouseDown=false;
        this.width=width;
        this.height=height;
        this.diff={x:0,y:0}
        
        this.loadImages(imageList);
    }

    loadImages(imageList){
        this.loader = new PIXI.Loader("./images",imageList.length);
        this.loader.add(imageList);
        this.loader.onLoad.add((loader,resource) => {
            console.log(resource.name, " loaded");
        });
        this.loader.load((loader, resources)=>{
            console.log("Load finished!");
            this.initApp(this.width,this.height);
        });
    }

    initApp(width,height){
        this.app = new PIXI.Application();
        this.app.renderer.backgroundColor = 0x061639;
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block"; 
        this.html.appendChild(this.app.view);

        this.app.stage.interactive=true;
        this.app.stage
            .on("pointerdown",this.mouseStageDown.bind(this))
            .on("pointermove",this.mouseStageMove.bind(this))   
            .on("pointerupoutside",this.mouseStageUp.bind(this)) 
            .on("pointerup",this.mouseStageUp.bind(this));     

        // dibuja el rectangulo del tamaño del juego
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(20, 0xDDDDDD, 1, 1, true);
        graphics.drawRect(-width/2.0,-height/2.0,width,height);
        this.app.stage.addChild(graphics);

        var drawerApp=document.querySelector(".mdc-drawer-app-content");
        this.drawerOffset = drawerApp.getBoundingClientRect().x;
        this.app.renderer.resize(window.innerWidth,window.innerHeight);
        this.app.stage.x = window.innerWidth/2.0-this.drawerOffset;
        this.app.stage.y = window.innerHeight/2.0-32;
  
        this.app.stage.scale.y=-1; //cambio eje y
        this.hitArea(this.app.stage);
        
        this.update(this.actorList); 
    }

    updateStage(){
        var drawerApp=document.querySelector(".mdc-drawer-app-content");
        if (drawerApp.getBoundingClientRect().x ==0) this.app.stage.x = this.app.stage.x+this.drawerOffset;
        else this.app.stage.x = this.app.stage.x-this.drawerOffset; 
        this.hitArea(this.app.stage);
    }

    update(actorList){
        var length=this.app.stage.children.length;
        if (length>1) this.app.stage.removeChildren(1,length); // se eliminan todos los objetos menos el marco    
        var actor=null;
        for (let i=actorList.length -1; i>=0; i--){ // Carga los actores de la scena actual como SPRITES
            actor=actorList[i];
            var texture = null;
            if (actor.image) texture = this.loader.resources[actor.image].texture;
            new DisplayActor(this.app.stage,actor,texture); 
        }

        const graphics1 = new PIXI.Graphics();
        graphics1.lineStyle(20, 0xDD0000, 1, 1, true);
        graphics1.drawRect(this.app.stage.hitArea.x,this.app.stage.hitArea.y,
                            this.app.stage.hitArea.width,this.app.stage.hitArea.height);
        this.app.stage.addChild(graphics1);
    
    }

    updateSelectedActor(actorID){
        if (actorID){
            (this.selected) ? this.displayObject.removeGizmo() : this.selected=true;
            var displayObjectIndex =this.app.stage.children.findIndex(i=>i.id==actorID);
            this.displayObject = this.app.stage.children[displayObjectIndex];
            this.displayObject.createGizmo();
        }
        else{
            if (this.selected) this.displayObject.removeGizmo();
            this.selected=false;
        }
    }

// Handlers
    addActorHandler(){
        console.log("Add Actor");
    }

    resize(actorList){
        var drawerApp=document.querySelector(".mdc-drawer-app-content");
        this.drawerOffset = drawerApp.getBoundingClientRect().x;
        this.app.renderer.resize(window.innerWidth,window.innerHeight);
        this.update(actorList);
        if (this.selected) Command.selectActorCmd(this.displayObject.id);
    }

    mouseStageDown(e){
        if (e.target instanceof DisplayActor == false){
            this.position0={x:e.data.global.x,y:e.data.global.y};
            this.stage={x:this.app.stage.x,y:this.app.stage.y};
            this.mouseDown=true;
            Command.selectActorCmd(null);
        }
    }

    mouseStageUp(){
        this.app.stage.hitArea.x -=this.diff.x;
        this.app.stage.hitArea.y +=this.diff.y;
        this.mouseDown=false;
    }

    mouseStageMove(e){
       if (this.mouseDown){ 
         var position1={x:e.data.global.x,y:e.data.global.y};
         this.diff={x:position1.x-this.position0.x,y:position1.y-this.position0.y};
         this.app.stage.x = this.stage.x+this.diff.x;
         this.app.stage.y = this.stage.y+this.diff.y;
       }
    }

    mouseStageWheel(e){
        this.zoom(e.deltaY,e.offsetX,e.offsetY);
        if (this.displayObject) Command.selectActorCmd(this.displayObject.id);
    }

// Utils
    hitArea(stage){
        console.log(stage.scale.x);
        var width=window.innerWidth/stage.scale.x;
        var height=window.innerHeight/stage.scale.y;
        this.app.stage.hitArea = new PIXI.Rectangle(-width*5,height*5,width*10,-height*10);
    }

    zoom (s,x,y){
        s = s > 0 ? 1.1: 0.9;
        var stage = this.app.stage;
        var worldPos = {x: (x - stage.x ) / stage.scale.x, y: (y - stage.y)/stage.scale.y};
        var newScale = {x: stage.scale.x * s, y: stage.scale.y * s};
        var newScreenPos = {x: worldPos.x * newScale.x + stage.x, y: worldPos.y * newScale.y + stage.y};
        stage.x -= (newScreenPos.x-x) ;
        stage.y -= (newScreenPos.y-y) ;
        stage.scale.x = newScale.x;
        stage.scale.y = newScale.y;
        this.app.stage=stage;
        this.hitArea(stage);
    }
}
