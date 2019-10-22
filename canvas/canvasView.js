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
        this.width=width;
        this.height=height;
        this.offsetX=0;
        this.lastPosition=null;
        this.selected=false;
        this.actorSelected=null;
        this.displayObject=null;

        this.initApp();
        this.loadImageList(imageList);
    }

    initApp(){
        this.app = new PIXI.Application();
        this.app.renderer.backgroundColor = 0x061639;
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block"; 
        this.html.appendChild(this.app.view);

        this.app.stage.interactive=true;
        this.app.stage.hitArea = new PIXI.Rectangle(0,0,window.innerWidth,window.innerHeight);
        this.app.stage
            .on("pointerdown",this.mouseStageDown.bind(this))
            .on("pointermove",this.mouseStageMove.bind(this))   
            .on("pointerupoutside",this.mouseStageUp.bind(this)) 
            .on("pointerup",this.mouseStageUp.bind(this));     
    }

    loadImageList(imageList){
        this.loader = new PIXI.Loader("./images",imageList.length);
        this.loader.add(imageList);
        this.loader.onLoad.add((loader,resource) => {
            console.log(resource.name, " loaded");
        });
        this.loader.load((loader, resources)=>{
            console.log("Load finished!");
            this.update(this.actorList); 
        });
    }
    
    update(actorList){
        
        var drawerApp=document.querySelector(".mdc-drawer-app-content");
        var offsetX = -drawerApp.getBoundingClientRect().x/this.app.stage.scale.x;

        this.app.stage.removeChildren(); // se eliminan todos los objetos
        this.app.renderer.resize(window.innerWidth,window.innerHeight);

        var centerX = window.innerWidth/2.0;
        var centerY = window.innerHeight/2.0;
  
        // Carga los actores de la scena actual como SPRITES
        var actor=null;
        for (let i=actorList.length -1; i>=0; i--){
            actor=actorList[i];
            var texture = null;
            if (actor.image) texture = this.loader.resources[actor.image].texture;
            var displayActor= new DisplayActor(actor,texture);      
            displayActor.x= offsetX+centerX+actor.x;
            displayActor.y= centerY-actor.y;
            this.app.stage.addChild(displayActor); 
        }

        // dibuja el rectangulo del tamaño del juego
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(20, 0xDDDDDD, 1, 1, true);
        graphics.drawRect(offsetX+centerX-this.width/2.0,centerY-this.height/2.0,this.width,this.height);
        this.app.stage.addChild(graphics);
    }

    updateSelectedActor(actorID){
            if (actorID){
                (this.selected) ? this.displayObject.removeGizmo() : this.selected=true;

                var displayObjectIndex =this.app.stage.children.findIndex(i=>i.id==actorID);
                this.displayObject = this.app.stage.children[displayObjectIndex];
                this.displayObject.createGizmo();
            }
            else{
                this.displayObject.removeGizmo();
                this.selected=false;
            }
    }

// Handlers
    addActorHandler(){
        console.log("Add Actor");
    }

    resize(actorList){
        var stage=this.app.stage;
        stage.hitArea = new PIXI.Rectangle(-stage.x/stage.scale.x-100,-stage.y/stage.scale.y-100,window.innerWidth/stage.scale.x+200,window.innerHeight/stage.scale.y+200);
        this.stage=stage;
        this.update(actorList);
        Command.selectActorCmd(this.displayObject.id);
    }

    mouseStageDown(e){
        console.log("mouseStageDown",e.target);
        if (e.target instanceof DisplayActor == false){
            this.origenX=e.data.global.x-this.app.stage.x;
            this.origenY=e.data.global.y-this.app.stage.y;
            Command.selectActorCmd(null);
        }
    }

    mouseStageUp(e){
       e.data=null;
       this.origenX=null;
       this.origenY=null;
       var stage=this.app.stage;
       stage.hitArea = new PIXI.Rectangle(-stage.x/stage.scale.x-100,-stage.y/stage.scale.y-100,window.innerWidth/stage.scale.x+200,window.innerHeight/stage.scale.y+200);
       this.stage=stage;
    }

    mouseStageMove(e){
       if (this.origenX!=null && this.origenY!=null){ 
         var newPosition=e.data.global;
         this.app.stage.x = newPosition.x-this.origenX;
         this.app.stage.y = newPosition.y-this.origenY;
       }
    }

    mouseStageLeave(e){
        this.mouseStageUp(e);
    }

    mouseStageWheel(e){
        var drawerApp=document.querySelector(".mdc-drawer-app-content");
        var offsetX=drawerApp.getBoundingClientRect().x;
        this.zoom(e.deltaY,e.offsetX+offsetX,e.offsetY);
        if (this.displayObject) Command.selectActorCmd(this.displayObject.id);
    }

// Utils
    zoom (s,x,y){
        s = s > 0 ? 1.1: 0.9;
        var stage = this.app.stage;
        var worldPos = {x: (x - stage.x ) / stage.scale.x, y: (y - stage.y)/stage.scale.y};
        var newScale = {x: stage.scale.x * s, y: stage.scale.y * s};
        var newScreenPos = {x: (worldPos.x) * newScale.x + stage.x, y: (worldPos.y) * newScale.y + stage.y};
        stage.x -= (newScreenPos.x-x) ;
        stage.y -= (newScreenPos.y-y) ;
        stage.scale.x = newScale.x;
        stage.scale.y = newScale.y;
        this.app.stage=stage;
        this.app.stage.hitArea = new PIXI.Rectangle(-stage.x/newScale.x-100,-stage.y/newScale.y-100,window.innerWidth/newScale.x+200,window.innerHeight/newScale.y+200);
        this.update(this.actorList);
    }
}
