class CanvasView {

    constructor(game,sceneIndex) {  
        this.actorList=game.sceneList[sceneIndex].actorList;
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
        window.addEventListener("resize",this.resize.bind(this));
       
        this.gameProperties=game.properties;
        this.selected=false;
        this.displayObject=null;
        this.mouseDown=false;
        this.diff={x:0,y:0} 
        this.loadImages(game.imageList);
    }

    loadImages(imageList){
        this.loader = new PIXI.Loader("./images",imageList.length);
        this.loader.add(imageList);
        this.loader.onLoad.add((loader,resource) => {
            console.log(resource.name, " loaded");
        });
        this.loader.load((loader, resources)=>{
            console.log("Load finished!");
            this.initApp();
        });
    }

    initApp(){
        this.app = new PIXI.Application();
        console.log()
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block"; 
        this.html.appendChild(this.app.view);

        this.app.stage.interactive=true;
        this.app.stage
            .on("pointerdown",this.mouseStageDown.bind(this))
            .on("pointermove",this.mouseStageMove.bind(this))   
            .on("pointerupoutside",this.mouseStageUp.bind(this)) 
            .on("pointerup",this.mouseStageUp.bind(this));     

        var drawerApp=document.querySelector(".mdc-drawer-app-content");
        this.drawerOffset = drawerApp.getBoundingClientRect().x;
        this.app.renderer.resize(window.innerWidth,window.innerHeight);
        this.initStage={x:window.innerWidth/2.0-this.drawerOffset,y:window.innerHeight/2.0-32}
        this.app.stage.x =this.initStage.x ;
        this.app.stage.y =this.initStage.y ;
 
        this.update(this.actorList,this.gameProperties); 
    }


    updateStageDrawer(){
        var drawerApp=document.querySelector(".mdc-drawer-app-content");
        if (drawerApp.getBoundingClientRect().x ==0) this.app.stage.x = this.app.stage.x+this.drawerOffset;
        else this.app.stage.x = this.app.stage.x-this.drawerOffset; 
        this.hitArea(this.scene);
    }

    update(actorList,gameProperties){

        this.actorList=actorList;
        this.gameProperties=gameProperties;

        this.app.stage.removeChildren();
        this.app.renderer.backgroundColor="0x"+String(this.gameProperties.backgroundColor).substr(1);

        const frame = new PIXI.Graphics(); // draw the camera frame
        frame.lineStyle(20, 0xDDDDDD, 1, 1, true);
        frame.drawRect(-this.gameProperties.width/2.0,-this.gameProperties.height/2.0,this.gameProperties.width,this.gameProperties.height);
        this.app.stage.addChild(frame);
 
        this.scene= new PIXI.Container(); // create the scene container
        this.scene.position ={x:-this.gameProperties.cameraX,y:this.gameProperties.cameraY};
        this.scene.angle = this.gameProperties.cameraAngle;
        this.scene.scale = {x:this.gameProperties.cameraZoom,y:-this.gameProperties.cameraZoom};
  
        this.actorList.forEach(actor => {
            var displayActor = new DisplayActor(actor,this.actorList,this.gameProperties,this.loader); 
            this.scene.addChild(displayActor);
        });

        this.app.stage.addChild(this.scene);
        this.hitArea(this.scene);
    }

    updateSelectedActor(actorID){
        if (actorID){
            (this.selected) ? this.displayObject.removeGizmo() : this.selected=true;
            var displayObjectIndex =this.scene.children.findIndex(i=>i.id==actorID);
            this.displayObject = this.scene.children[displayObjectIndex];
            this.displayObject.createGizmo();
        }
        else{
            if (this.selected) this.displayObject.removeGizmo();
            this.selected=false;
        }
    }

// Handlers
    addActorHandler(){
        var sceneID=document.querySelector(".sceneselected").id;
		CmdManager.addActorCmd(sceneID,this.actorList.length);
    }

    resize(){
        var drawerApp=document.querySelector(".mdc-drawer-app-content");
        this.drawerOffset = drawerApp.getBoundingClientRect().x;
        this.app.renderer.resize(window.innerWidth,window.innerHeight);
        this.update(this.actorList,this.gameProperties);
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
    hitArea(container){
        var width=window.innerWidth/container.scale.x;
        var height=window.innerHeight/container.scale.y;
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
        this.hitArea(this.scene);
    }
}
