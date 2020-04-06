class CanvasView {

    constructor(game,sceneIndex) {  
        this.actorList=game.sceneList[sceneIndex].actorList;
        this.drawerOffset=256;
		this.html = document.createElement("div");
        this.html.className +="canvas";
        this.html.style.display="block";
        this.html.style.transform="";
        this.html.innerHTML =
            '<button id="addactor"  class="add-actor mdc-fab mdc-ripple-upgraded add-property-button">'+
                '<i class="material-icons">add</i>'+
            '</button>'+
            '<button id="actorbutton" style="visibility:hidden" class="mdc-fab mdc-ripple-upgrade actor-canvas-button">'+
                '<i class="material-icons">more_vert</i>'+
            '</button>'+
            '<div class="mdc-menu-surface--anchor">'+
                '<div id="menuActor" class="mdc-menu mdc-menu-surface mdc-menu-surface--close" tabindex="-1">'+
                    '<ul class="mdc-list" role="menu" aria-hidden="true">'+
                        '<li id="properties" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Properties</li>'+
                        '<li id="scripts" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Scripts</li>'+
                        '<li class="mdc-list-divider" role="separator" tabindex="-1"></li>'+
                        '<li id="rename" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Rename</li>'+
                        '<li id="duplicate" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Duplicate</li>'+
                        '<li id="delete" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Delete</li>'+
                '</ul>'+
                '</div>'+
            '</div>';
        this.html.querySelector("#actorbutton").addEventListener("click",this.menuActorHandler.bind(this));
        this.html.querySelector("#addactor").addEventListener("click",this.addActorHandler.bind(this));
        this.html.addEventListener("wheel",this.mouseStageWheel.bind(this));
        this.html.querySelector("#properties").addEventListener("click",this.propertiesActorHandler.bind(this));
		this.html.querySelector("#scripts").addEventListener("click",this.scriptsActorHandler.bind(this));
		this.html.querySelector("#rename").addEventListener("click",this.renameActorHandler.bind(this));
		this.html.querySelector('#duplicate').addEventListener("click",this.duplicateActorHandler.bind(this));
		this.html.querySelector('#delete').addEventListener("click",this.removeActorHandler.bind(this));
        window.addEventListener("resize",this.resize.bind(this));
        this.menu = mdc.menu.MDCMenu.attachTo(this.html.querySelector('.mdc-menu'));

        this.actorButton = this.html.querySelector("#actorbutton");
        this.gameProperties=game.allProperties;
        this.selected=false;
        this.displayActor=null;
        this.mouseDown=false;
        this.diff={x:0,y:0} 
        this.loadInitImages(game.imageList);
    }

    takeScreenshot(){
        console.log("take screenshoot");

        var app = new PIXI.Application();

        app.renderer.resize(this.gameProperties.width,this.gameProperties.height);
        app.stage.x =this.gameProperties.width/2;
        app.stage.y =this.gameProperties.height/2;
 
        var scene= new PIXI.Container(); // create the scene container
        scene.position ={x:-this.gameProperties.cameraX,y:this.gameProperties.cameraY};
        scene.angle = this.gameProperties.cameraAngle;
        scene.scale = {x:this.gameProperties.cameraZoom,y:-this.gameProperties.cameraZoom};
  
        this.actorList.forEach(actor => {
            var displayActor = new DisplayActor(this,actor,this.actorList,this.gameProperties,this.loader); 
            scene.addChild(displayActor);
        });
 
        app.renderer.extract.canvas(scene).toBlob((b) => {
            const a = document.createElement('a');
            document.body.append(a);
            a.download = 'screenshot';
            a.href = URL.createObjectURL(b);
            a.click();
            a.remove();
        }, 'image/png');
        
    }
    
    loadInitImages(imageList){
            this.loader = new PIXI.Loader(app.parentGamesFolder+"/"+app.gameFolder+"/images");
            if (imageList.length==0) this.loader.add("");
            else this.loader.add(imageList);   
             
            this.loader.onLoad.add((loader,resource) => {
                console.log(resource.name," loaded");
            });
            this.loader.load(()=>{
                console.log("Load finished!");
                this.initApp();
                if (this.loader.resources[""]) delete this.loader.resources[""];
            });
           
    }

    loadImage(image){
        while(this.loader.loading);
        this.loader.add(image);
    }

    deleteImage (image){
        while(this.loader.loading);
        this.loader.resources[image].texture.destroy(true);
        delete this.loader.resources[image];
    }

    initApp(){
        this.app = new PIXI.Application();
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block"; 
        this.html.appendChild(this.app.view);

        this.app.stage.interactive=true;
        this.app.stage
            .on("pointerdown",this.mouseStageDown.bind(this))
            .on("pointermove",this.mouseStageMove.bind(this))   
            .on("pointerupoutside",this.mouseStageUp.bind(this)) 
            .on("pointerup",this.mouseStageUp.bind(this));     

        this.app.renderer.resize(window.innerWidth,window.innerHeight);
        this.initStage={x:window.innerWidth/2.0-this.drawerOffset,y:window.innerHeight/2.0-32}
        this.app.stage.x =this.initStage.x ;
        this.app.stage.y =this.initStage.y ;
 
        this.update(this.actorList,this.gameProperties); 
    }

    updateStageDrawer(){
        var drawerApp=document.querySelector(".mdc-drawer-app-content");
        if (drawerApp.getBoundingClientRect().x == 0) this.app.stage.x = this.app.stage.x+this.drawerOffset;
        else this.app.stage.x = this.app.stage.x-this.drawerOffset; 
        this.hitArea(this.scene);
    }

    update(actorList,gameProperties){
        this.actorList=actorList;
        this.gameProperties=gameProperties;

        this.app.stage.removeChildren();
        this.app.renderer.backgroundColor="0x"+String(this.gameProperties.backgroundColor).substr(1);

        this.frame = new PIXI.Graphics(); // draw the camera frame
        this.frame.lineStyle(20, 0xDDDDDD, 1, 1, true);
        this.frame.drawRect(-this.gameProperties.displayWidth/2.0,-this.gameProperties.displayHeight/2.0,this.gameProperties.displayWidth,this.gameProperties.displayHeight);
     
        this.scene= new PIXI.Container(); // create the scene container
        this.scene.position ={x:-this.gameProperties.cameraX,y:this.gameProperties.cameraY};
        this.scene.angle = this.gameProperties.cameraAngle;
        this.scene.scale = {x:this.gameProperties.cameraZoom,y:-this.gameProperties.cameraZoom};
  
        this.actorList.forEach(actor => {
            var displayActor = new DisplayActor(this,actor,this.actorList,this.gameProperties,this.loader); 
            this.scene.addChild(displayActor);
        });

        this.app.stage.addChild(this.scene);
        this.app.stage.addChild(this.frame);
        this.hitArea(this.scene);
        this.updateActorButton();  
    }

    updateActorButton(){
       this.actorButton.style.visibility="hidden";  
    }

    updateSelectedActor(actorID){
        if (actorID){ // if actorED != mull
            (this.selected) ? this.displayActor.removeGizmo() : this.selected=true;
            var displayActorIndex =this.scene.children.findIndex(i=>i.id==actorID);
            this.displayActor = this.scene.children[displayActorIndex];
            if (this.displayActor!=undefined) this.displayActor.createGizmo();
           
            this.actorButton.style.visibility="visible";

            var p=this.displayActor.points;
            p[0].y=-p[0].y;
    
            var xMax=0; var xMin=0; var yMax=0; var yMin=0;
            p.forEach((i,index) => {
                i=Utils.rotatePoint(i,-this.displayActor.angle);
                if (i.x<xMin) xMin=i.x; if (i.x>xMax) xMax=i.x;
                if (i.y>yMin ) yMin=i.y; if (i.y<yMax && index!=0) yMax=i.y;
            });
    
            this.actorButton.style.left=((this.displayActor.transform.position.x+xMax+8)*this.app.stage.scale.x+this.app.stage.x)+"px";
            this.actorButton.style.top=((-this.displayActor.transform.position.y+yMax)*this.app.stage.scale.y+this.app.stage.y)+"px";
        }
        else{
            if (this.selected) this.displayActor.removeGizmo();
            this.selected=false;
            this.actorButton.style.visibility="hidden";
        }
    }

    positionToAddActor(){
        var position={x:0,y:this.app.stage.y};
        var drawerApp=document.querySelector(".mdc-drawer-app-content");
        (drawerApp.getBoundingClientRect().x==0) ? position.x = this.app.stage.x : position.x = this.app.stage.x+this.drawerOffset;
        position.x=-position.x+window.innerWidth/2.0;
        position.y=position.y-window.innerHeight/2+32; 
        position.x=position.x / this.app.stage.scale.x;
        position.y=position.y / this.app.stage.scale.y;
        return (position);
    }
// Handlers
    propertiesActorHandler(){
        Command.openActorPropertiesCmd();
    }

    scriptsActorHandler(){
        Command.openActorScriptsCmd();
    }

    renameActorHandler(){
        var dialog = new RenameDialogView("actor",this.displayActor.id);
        var editorFrame=document.querySelector(".editor-frame-root");
        editorFrame.appendChild(dialog.html);
        dialog.html.querySelector("input").focus();
    }

    duplicateActorHandler(){
        var sceneID=document.querySelector(".sceneselected").id;
        CmdManager.duplicateActorCmd(sceneID,this.displayActor.id);
    }

    removeActorHandler(){
        var sceneID=document.querySelector(".sceneselected").id;
        if (confirm('Are you sure you want to delete "'+this.displayActor.name+'" actor?')){
                CmdManager.removeActorCmd(sceneID,this.displayActor.id); 
                this.displayActor=null;
                this.selected=false;
        }
    }

    menuActorHandler(e){
        e.preventDefault();
        this.menu.open = true;
        var menu = this.html.querySelector(".mdc-menu-surface--anchor");
        menu.style.left=this.actorButton.style.left;
        menu.style.top=this.actorButton.style.top;
    }

    addActorHandler(){
        var sceneID=document.querySelector(".sceneselected").id;
        var position=this.positionToAddActor();
		CmdManager.addActorCmd(sceneID,this.actorList.length,position);
    }

    resize(){
        if (this.html.style.display=="block"){ 
            this.app.renderer.resize(window.innerWidth,window.innerHeight);
            this.update(this.actorList,this.gameProperties);
            if (this.selected) Command.selectActorCmd(this.displayActor.id);
        }
    }

    mouseStageDown(e){
        if (e.target instanceof DisplayActor == false){
            this.position0={x:e.data.global.x,y:e.data.global.y};
            this.stage={x:this.app.stage.x,y:this.app.stage.y};
            this.mouseDown=true;
            if (this.selected) Command.selectActorCmd(null);
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
        if (this.selected) Command.selectActorCmd(this.displayActor.id);
    }

// Utils
    hitArea(container){
        var width=window.innerWidth/container.scale.x;
        var height=window.innerHeight/container.scale.y;
        this.app.stage.hitArea = new PIXI.Rectangle(-width*50,height*50,width*100,-height*100);
    }

    zoom (s,x,y){
        s = s > 0 ? 0.9: 1.1;
        var stage = this.app.stage;
        var worldPos = {x: (x - stage.x ) / stage.scale.x, y: (y - stage.y)/stage.scale.y};
        var newScale = {x: stage.scale.x * s, y: stage.scale.y * s};
        var newScreenPos = {x: worldPos.x * newScale.x + stage.x, y: worldPos.y * newScale.y + stage.y};
        stage.scale.x = newScale.x;
        stage.scale.y = newScale.y;
       
        if (stage.scale.x<0.05) stage.scale.x=0.05;
        if (stage.scale.x>10.0) stage.scale.x=10.0;
        if (stage.scale.y<0.05) stage.scale.y=0.05;
        if (stage.scale.y>10.0) stage.scale.y=10.0;

        if (stage.scale.x==0.05 || stage.scale.x==10.0 || stage.scale.y==0.05 || stage.scale.y==10.0){
            stage.x = stage.x ;
            stage.y = stage.y ;
        }
        else{
            stage.x -= (newScreenPos.x-x) ;
            stage.y -= (newScreenPos.y-y) ;
        }

        this.app.stage=stage;
        this.hitArea(this.scene);
    }
}
