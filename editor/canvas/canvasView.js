class CanvasView {

    constructor(game,sceneIndex) {  
        this.actorList=game.sceneList[sceneIndex].actorList;
        this.drawerOffset=256;
		this.html = document.createElement("div");
        this.html.className +="canvas";
        this.html.style.display="block";
        this.html.style.transform="";
        this.html.innerHTML =
            '<button id="addactor" style="z-index:2" class="mdc-fab add-actor-button">'+
                '<div class="mdc-fab__ripple"></div>'+
                '<span class="mdc-fab__icon material-icons">add</span>'+
            '</button>'+
            '<button id="actorbutton" style="visibility:hidden;box-shadow: 0px 0px 3px darkslategrey;" class="mdc-fab mdc-ripple-upgrade actor-canvas-button">'+
                '<i class="material-icons">more_vert</i>'+
                '<div class="mdc-menu-surface--anchor">'+
                    '<div id="menuActor" class="mdc-menu mdc-menu-surface">'+
                        '<ul id="mylist" class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">'+
                                '<li id="properties" class="mdc-list-item" role="menuitem">'+
                                    '<span class="mdc-list-item__ripple"></span>'+
                                    '<span class="mdc-list-item__text">Properties</span>'+
                                '</li>'+
                                '<li id="scripts" class="mdc-list-item" role="menuitem">'+
                                    '<span class="mdc-list-item__ripple"></span>'+
                                    '<span class="mdc-list-item__text">Scripts</span>'+
                                '</li>'+
                                '<li role="separator" class="mdc-list-divider"></li>'+
                                '<li id="rename" class="mdc-list-item" role="menuitem">'+
                                    '<span class="mdc-list-item__ripple"></span>'+
                                    '<span class="mdc-list-item__text">Rename</span>'+
                                '</li>'+
                                '<li id="duplicate" class="mdc-list-item" role="menuitem">'+
                                    '<span class="mdc-list-item__ripple"></span>'+
                                    '<span class="mdc-list-item__text">Duplicate</span>'+
                                '</li>'+
                                '<li id="delete" class="mdc-list-item" role="menuitem">'+
                                    '<span class="mdc-list-item__ripple"></span>'+
                                    '<span class="mdc-list-item__text">Delete</span>'+
                                '</li>'+
                            '</li>'+
                        '</ul>'+
                    '</div>'+
                '</div>'+  
            '</button>';
    
        this.html.querySelector("#actorbutton").addEventListener("click",this.menuActorHandler.bind(this));
        mdc.ripple.MDCRipple.attachTo(this.html.querySelector('#addactor'));

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
 
        this.appRenderer = new PIXI.Renderer();
        this.appStage = new  PIXI.Container();

        requestAnimationFrame(animate.bind(this));
        function animate(){
            requestAnimationFrame(animate.bind(this));
            this.appRenderer.render(this.appStage);
        };

        this.initApp();
    }

    takeScreenshot(w,h,sceneID,actorList,upload){

        var renderer = this.appRenderer;
        var stage= new PIXI.Container();

        const frame = new PIXI.Graphics(); // draw the camera frame
        frame.beginFill(0xffffff);
        frame.drawRect(-w/2.0,-h/2.0,w,h);
        frame.endFill();
 
        const frameTexture = new PIXI.Sprite(PIXI.Texture.WHITE); // draw background sprite
        frameTexture.tint="0x"+String(this.gameProperties.backgroundColor).substr(1);;
        frameTexture.width=this.gameProperties.displayWidth*3/this.gameProperties.cameraZoom;
        frameTexture.height=this.gameProperties.displayHeight*3/this.gameProperties.cameraZoom;
        frameTexture.anchor.set(0.5);

        const scene= new PIXI.Container(); // create the scene container
        scene.addChild(frameTexture);
        scene.position ={x:-this.gameProperties.cameraX,y:this.gameProperties.cameraY};
        scene.angle = this.gameProperties.cameraAngle;
        scene.scale = {x:this.gameProperties.cameraZoom,y:-this.gameProperties.cameraZoom};
        scene.mask=frame;  
    
        actorList.forEach(actor => {
            var displayActor = new DisplayActor(this,actor,actorList,this.gameProperties); 
            scene.addChild(displayActor);
        });
        stage.addChild(scene);
    
        var sx=w/this.gameProperties.displayWidth;
        var sy=h/this.gameProperties.displayHeight;
        var s;
        (sy>sx) ? s=sy : s=sx;
        stage.scale.x=stage.scale.y=s; 
       
        renderer.extract.canvas(stage).toBlob((blob) => {
                if (upload){
                    var formData= new FormData();
                    formData.append("file",blob,"image.jpg");
                    File.uploadFile(blob,formData,"ScreenShoot");
                }
                else {
                    var image=document.querySelector("#"+sceneID).querySelector("img");
                    var url=window.URL || Window.webkitURL;
                    image.src=url.createObjectURL(blob);
                }
        }, 'image/png');
    }

    loadImage(image){
        while(app.file.loader.loading);
        app.file.loader.add(image);
    }

    deleteImage (image){
        while(app.file.loader.loading);
        app.file.loader.resources[image].texture.destroy(true);
        delete app.file.loader.resources[image];
    }

    initApp(){

        this.appRenderer.view.style.position = "absolute";
        this.appRenderer.view.style.display = "block"; 
        this.html.appendChild(this.appRenderer.view);

        this.appStage.interactive=true;
        this.appStage
            .on("pointerdown",this.mouseStageDown.bind(this))
            .on("pointermove",this.mouseStageMove.bind(this))   
            .on("pointerupoutside",this.mouseStageUp.bind(this)) 
            .on("pointerup",this.mouseStageUp.bind(this));     

        this.appRenderer.resize(window.innerWidth,window.innerHeight);
        this.initStage={x:window.innerWidth/2.0-this.drawerOffset,y:window.innerHeight/2.0-32}
        this.appStage.x =this.initStage.x ;
        this.appStage.y =this.initStage.y ;
 
        this.update(this.actorList,this.gameProperties); 
    }

    updateStageDrawer(){
        var drawerApp=document.querySelector(".mdc-drawer-app-content");
        if (drawerApp.getBoundingClientRect().x == 0) this.appStage.x = this.appStage.x+this.drawerOffset;
        else this.appStage.x = this.appStage.x-this.drawerOffset; 
        this.hitArea(this.scene);
    }

    update(actorList,gameProperties){

        this.actorList=actorList;
        this.gameProperties=gameProperties;

        this.appStage.removeChildren();
        this.appRenderer.backgroundColor="0x"+String(this.gameProperties.backgroundColor).substr(1);
      
        this.frame = new PIXI.Graphics(); // draw the camera frame
        this.frame.lineStyle(20, 0xDDDDDD, 1, 1, true);
        this.frame.drawRect(-this.gameProperties.displayWidth/2.0,-this.gameProperties.displayHeight/2.0,this.gameProperties.displayWidth,this.gameProperties.displayHeight);

        this.scene= new PIXI.Container(); // create the scene container
        this.scene.position ={x:-this.gameProperties.cameraX,y:this.gameProperties.cameraY};
        this.scene.angle = this.gameProperties.cameraAngle;
        this.scene.scale = {x:this.gameProperties.cameraZoom,y:-this.gameProperties.cameraZoom};

        this.actorList.forEach(actor => {
            var displayActor = new DisplayActor(this,actor,this.actorList,this.gameProperties); 
            this.scene.addChild(displayActor);
        });

        this.appStage.addChild(this.scene);
        this.appStage.addChild(this.frame);
        this.hitArea(this.scene);
        this.updateActorButton();  
    }

    updateActorButton(){
       this.actorButton.style.visibility="hidden";  
    }

    updateSelectedActor(actorID){
        if (actorID){ // if actorID != mull
            (this.selected) ? this.displayActor.removeGizmo() : this.selected=true;
            var displayActorIndex =this.scene.children.findIndex(i=>i.id==actorID);
            this.displayActor = this.scene.children[displayActorIndex];
            if (this.displayActor!=undefined) {
                this.displayActor.createGizmo();
           
                var p=this.displayActor.points;
                p[0].y=-p[0].y;
        
                var xMax=0; var xMin=0; var yMax=0; var yMin=0;
                p.forEach((i,index) => {
                    i=Utils.rotatePoint(i,-this.displayActor.angle);
                    if (i.x<xMin) xMin=i.x; if (i.x>xMax) xMax=i.x;
                    if (i.y>yMin ) yMin=i.y; if (i.y<yMax && index!=0) yMax=i.y;
                });
                this.actorButton.style.left=((this.displayActor.transform.position.x+xMax+8)*this.appStage.scale.x+this.appStage.x)+"px";
                this.actorButton.style.top=((-this.displayActor.transform.position.y+yMax)*this.appStage.scale.y+this.appStage.y)+"px";
                this.actorButton.style.visibility="visible";
                this.selected=true;
            }
            else this.selected=false;
        }
        else{
            if (this.selected) this.displayActor.removeGizmo();
            this.selected=false;
            this.actorButton.style.visibility="hidden";
        }
    }

    positionToAddActor(){
        var position={x:0,y:this.appStage.y};
        var drawerApp=document.querySelector(".mdc-drawer-app-content");
        (drawerApp.getBoundingClientRect().x==0) ? position.x = this.appStage.x : position.x = this.appStage.x+this.drawerOffset;
        position.x=-position.x+window.innerWidth/2.0;
        position.y=position.y-window.innerHeight/2+32; 
        position.x=position.x / this.appStage.scale.x;
        position.y=position.y / this.appStage.scale.y;
        return (position);
    }
    
// Handlers
    propertiesActorHandler(e){
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
        if (e.target.id=="actorbutton") this.menu.open = true;
    }

    addActorHandler(){
        var sceneID=document.querySelector(".sceneselected").id;
        var position=this.positionToAddActor();
		CmdManager.addActorCmd(sceneID,this.actorList.length,position);
    }

    resize(){
        if (this.html.style.display=="block"){ 
            this.appRenderer.resize(window.innerWidth,window.innerHeight);
            this.update(this.actorList,this.gameProperties);
            if (this.selected) Command.selectActorCmd(this.displayActor.id);
        }
    }

    mouseStageDown(e){
        if (e.target instanceof DisplayActor == false){
            this.position0={x:e.data.global.x,y:e.data.global.y};
            this.stage={x:this.appStage.x,y:this.appStage.y};
            this.mouseDown=true;
            if (this.selected) Command.selectActorCmd(null);
        }
    }

    mouseStageUp(){
        this.appStage.hitArea.x -=this.diff.x;
        this.appStage.hitArea.y +=this.diff.y;
        this.mouseDown=false;
    }

    mouseStageMove(e){
       if (this.mouseDown){ 
         var position1={x:e.data.global.x,y:e.data.global.y};
         this.diff={x:position1.x-this.position0.x,y:position1.y-this.position0.y};
         this.appStage.x = this.stage.x+this.diff.x;
         this.appStage.y = this.stage.y+this.diff.y;
       }
    }

    mouseStageWheel(e){
        this.zoom(e.deltaY,e.offsetX,e.offsetY);
        if (this.selected && this.displayActor) Command.selectActorCmd(this.displayActor.id);
    }

// Utils
    hitArea(container){
        var width=window.innerWidth/container.scale.x;
        var height=window.innerHeight/container.scale.y;
        this.appStage.hitArea = new PIXI.Rectangle(-width*50,height*50,width*100,-height*100);
    }

    zoom (s,x,y){
        s = s > 0 ? 0.9: 1.1;
        var stage = this.appStage;
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

        this.appStage=stage;
        this.hitArea(this.scene);
    }
}
