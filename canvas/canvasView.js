class CanvasView {

    constructor(game) {  
        this.game=game; 
		this.html = document.createElement("div");
        this.html.className +="canvas";
        this.html.style.display="block";
        this.html.style.transform="";
        this.html.innerHTML =
            '<button id="addactor" class="do-button mdc-fab mdc-ripple-upgraded add-property-button">'+
                '<i class="material-icons">add</i>'+
            '</button>';
        this.html.querySelector("#addactor").addEventListener("click",this.addActorHandler.bind(this));
        this.html.addEventListener("mousedown",this.mouseStageDown.bind(this));
        this.html.addEventListener("mouseup",this.mouseStageUp.bind(this));
        this.html.addEventListener("mousemove",this.mouseStageMove.bind(this));
        this.html.addEventListener("mouseout",this.mouseStageLeave.bind(this));
        this.html.addEventListener("wheel",this.mouseStageWheel.bind(this));
        window.addEventListener("resize",this.update.bind(this));
       
        this.lastPosition=null;
        this.init(game);  
    }

    init(){
        this.app = new PIXI.Application();
        this.app.renderer.backgroundColor = 0x061639;
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block"; 
        this.html.appendChild(this.app.view);

        this.loader = new PIXI.Loader("./images",this.game.imageList.length);
        this.loader.add(this.game.imageList);
        this.loader.onLoad.add((loader,resource) => {
            console.log(resource.name, " loaded");
        });
        this.loader.load((loader, resources)=>{
            console.log("Load finished!");
            this.update(); 
        });
    }
    
    update(actorID){
        
        var sceneID=document.querySelector(".sceneselected").id;
        var drawerApp=document.querySelector(".mdc-drawer-app-content");
       
        this.app.stage.removeChildren(); // se eliminan todos los objetos
        var width=window.innerWidth;
        var height=window.innerHeight;
        this.app.renderer.resize(width,height);
      
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(20, 0xDDDDDD, 1, 1, true);
        var centerX = width/2.0;
        var centerY = height/2.0;
        var offsetX=-drawerApp.getBoundingClientRect().x/this.app.stage.scale.x;
 
        graphics.drawRect(offsetX+centerX-this.game.width/2.0,centerY-this.game.height/2.0,this.game.width,this.game.height);
        this.app.stage.addChild(graphics);

        // Carga los actores de la scena actual como SPRITES
        var scenePos=this.game.sceneList.findIndex(i => i.id == sceneID);
        this.game.sceneList[scenePos].actorList.forEach(actor => {
            var texture = this.loader.resources[actor.image].texture;
            var guizmo=false;
            (actorID==actor.id) ? guizmo=true : guizmo=false;
            var displayActor= new DisplayActor(actor.properties,texture,guizmo);
            displayActor.id=actor.id;            
            displayActor.x=offsetX+centerX+actor.x;
            displayActor.y=centerY-actor.y;
            displayActor.interactive=true;
            displayActor.on('pointerdown',this.onSpriteClick);
            this.app.stage.addChild(displayActor); 
        });
    }

// Handlers
    addActorHandler(){
        console.log("Add Actor");
    }

    onSpriteClick(e){
        Command.selectActorCmd(this.id);
    }

    mouseStageDown(e){
        e.preventDefault();
        this.lastPosition={x:e.offsetX,y:e.offsetY};
    }

    mouseStageUp(e){
       this.lastPosition=null;
    }

    mouseStageMove(e){
       if (this.lastPosition!=null && e.buttons==1){ //se comprueba que esté pulsado el boton izq del raton (1) - sino falla
            this.app.stage.x += (e.offsetX-this.lastPosition.x);
            this.app.stage.y += (e.offsetY-this.lastPosition.y);
            this.lastPosition={x:e.offsetX,y:e.offsetY};
        }
    }

    mouseStageLeave(e){
        this.mouseStageUp();
    }

    mouseStageWheel(e){
        var drawerApp=document.querySelector(".mdc-drawer-app-content");
        var offsetX=drawerApp.getBoundingClientRect().x;
        this.zoom(e.deltaY,e.offsetX+offsetX,e.offsetY);
    }

// Utils
    zoom (s,x,y){
        s = s > 0 ? 1.1: 0.9;
        var stage = this.app.stage;
        var worldPos = {x: (x - stage.x) / stage.scale.x, y: (y - stage.y)/stage.scale.y};
        var newScale = {x: stage.scale.x * s, y: stage.scale.y * s};
        var newScreenPos = {x: (worldPos.x) * newScale.x + stage.x, y: (worldPos.y) * newScale.y + stage.y};
        stage.x -= (newScreenPos.x-x) ;
        stage.y -= (newScreenPos.y-y) ;
        stage.scale.x = newScale.x;
        stage.scale.y = newScale.y;
        this.app.stage=stage;
        this.update();
    }
}
