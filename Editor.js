class Editor {
    
    constructor(editorView,gameModel) {
        console.log(gameModel);
        this.view = editorView;
        this.model = gameModel;
        this.selectedSceneIndex=0;
        this.selectedActorIndex=null;
        this.selectedScriptIndex=0;
        this.previousNodeSelected=null;
        
        //App Bar
        this.appBarView=new AppBarView(gameModel.sceneList[0].name);
        this.view.addView(this.appBarView.html);

        //Drawer 
        this.drawerHeaderView= new DrawerHeaderView(gameModel.name);
        this.drawerScenesView= new DrawerScenesView(gameModel.sceneList);
        this.view.addView(this.drawerScenesView.html);
        this.view.addView(this.drawerHeaderView.html);

        this.canvasView = new CanvasView(gameModel,this.selectedSceneIndex);
        this.view.addView(this.canvasView.html);
        this.scriptCanvasView = new ScriptCanvasView();
        this.view.addView(this.scriptCanvasView.html);

        //Side Sheet
        this.sideSheetView=new SideSheetView();
            this.gamePropertiesView = new GamePropertiesView(gameModel);
            this.sideSheetView.addView(this.gamePropertiesView.html);
            this.soundSelectionView = new SoundSelectionView(gameModel.soundList);
            this.sideSheetView.addView(this.soundSelectionView.html);
            this.imageSelectionView = new ImageSelectionView(gameModel.imageList);
            this.sideSheetView.addView(this.imageSelectionView.html);
            this.fontSelectionView = new FontSelectionView(gameModel.fontList);
            this.sideSheetView.addView(this.fontSelectionView.html);
            this.castView = new CastView(this.model.sceneList[this.selectedSceneIndex].actorList);
            this.sideSheetView.addView(this.castView.html);
            this.actorPropertiesView = new ActorPropertiesView(this.model.sceneList[this.selectedSceneIndex].actorList[0]);
            this.sideSheetView.addView(this.actorPropertiesView.html);
            this.actorScriptsView = new ActorScriptsView();
            this.sideSheetView.addView(this.actorScriptsView.html);
        this.view.addView(this.sideSheetView.html);
    }

// GAME
    addGameProperty(property,value){
        this.model[property]=value;
        this.openGameProperties();
    }

    removeGameProperty(property){
        delete this.model[property];
        this.openGameProperties();
    }

    changeGameProperty(property,value){
        this.model[property]=value;
        if(property!="name"){
            this.openGameProperties();
            this.gamePropertiesView.updateGameProperty(property,value);
            this.canvasView.update(this.model.sceneList[this.selectedSceneIndex].actorList,this.model);
        }
        else {
            if (!document.querySelector(".mdc-drawer").classList.contains("mdc-drawer--open")) this.drawerToggle();
            this.drawerHeaderView.updateGameName(value);
        }
     }

/* Game editor commands */
    openGameProperties(){
        this.gamePropertiesView.update(this.model);
        SideSheetView.openSheetHandler("game-properties");            
        this.view.openCanvas("canvas");
    }

    saveGame(){
        File.save(this.model.name+".json",JSON.stringify(this.model, null, '\t'));
    }

//SCENES
    addScene(scene,pos) {  
        this.model.addScene(scene,pos);
        var sceneView = new SceneView();
        sceneView.addView(scene);
        this.drawerScenesView.addScene(sceneView,pos);
        this.selectScene(scene.id);
    }

    removeScene(sceneID){
        this.model.removeScene(sceneID);
        this.drawerScenesView.removeScene(sceneID);
        if(this.model.sceneList.length==this.selectedSceneIndex){
            if (this.selectedSceneIndex>0) this.selectScene(this.model.sceneList[this.selectedSceneIndex-1].id);
        }
        else this.selectScene(this.model.sceneList[this.selectedSceneIndex].id);
    }
 
    renameScene(sceneID,sceneName){
        this.model.sceneList[this.model.sceneList.findIndex(i=>i.id===sceneID)].name=sceneName;
        this.drawerScenesView.renameScene(sceneID,sceneName);
        var selectedSceneName=this.model.sceneList[this.selectedSceneIndex].name;
        if (selectedSceneName === sceneName) this.appBarView.updateSceneName(sceneName);
    }

 /* Scene editor commands */
    selectScene(sceneID){
       var oldSelectedSceneIndex=this.selectedSceneIndex;
       this.selectedSceneIndex = this.model.sceneList.findIndex(i => i.id == sceneID);
       this.drawerScenesView.updateSelectedScene(sceneID);
       this.appBarView.updateSceneName(this.model.sceneList[this.selectedSceneIndex].name);
       this.canvasView.update(this.model.sceneList[this.selectedSceneIndex].actorList,this.model.properties); // actualiza el canvas
       if (oldSelectedSceneIndex!=this.selectedSceneIndex) this.selectedActorIndex=null;
       if (SideSheetView.isOpenCast()) this.openCast();
       else if (SideSheetView.isOpenGameProperties()) this.openGameProperties();
            else SideSheetView.closeSheetHandler();
    }

    openCast(){
        this.castView.update(this.model.sceneList[this.selectedSceneIndex].actorList);
        var actorID=null;
        if (this.selectedActorIndex!=null) actorID=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].id;
        this.castView.updateSelectedActor(actorID);
        SideSheetView.openSheetHandler("cast");
    }

    drawerToggle (){
        this.appBarView.drawerToogle();
        var actorID=null;
        if (this.selectedActorIndex!=null) actorID=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].id;
        this.canvasView.updateStageDrawer();
        if (actorID) this.canvasView.updateSelectedActor(actorID);
    }

// ACTOR
    addActor(sceneID,actorPos,actor){
        var scenePos = this.model.sceneList.findIndex(i => i.id == sceneID);
        this.model.sceneList[scenePos].addActor(actor,actorPos);
        this.selectScene(sceneID); //necesario para los comandos de deshacer
        this.selectActor(actor.id);
    }

    removeActor(sceneID,actorID){
        var scenePos = this.model.sceneList.findIndex(i => i.id == sceneID);
        this.model.sceneList[scenePos].removeActor(actorID);
        this.selectedActorIndex=null;
        this.selectScene(sceneID); //necesario para los comandos de deshacer
    }

    renameActor(sceneID,actorID,actorName){
        var scenePos = this.model.sceneList.findIndex(i => i.id == sceneID);
        var actorPos = this.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID); 
        this.model.sceneList[scenePos].actorList[actorPos].name=actorName;
        this.selectScene(sceneID); //necesario para los comandos de deshacer
        this.openCast();
        this.selectActor(actorID);
    }

    changeActorProperty(sceneID,actorID,property,value){
        var scenePos=this.model.sceneList.findIndex(i => i.id == sceneID);
        var actorPos=this.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID); 
        var actor = this.model.sceneList[scenePos].actorList[actorPos];
        switch  (true) {
            case property=="position": 
                actor.x=Math.round(value.x);
                actor.y=Math.round(value.y);
                break;
            case property=="scale":
                actor.x=Math.round(value.x);
                actor.y=Math.round(value.y);
                actor.angle=Math.round(value.angle);
                actor.width=Math.round(actor.width/actor.scaleX*value.scaleX);
                actor.height=Math.round(actor.height/actor.scaleY*value.scaleY);
                actor.scaleX=Number(value.scaleX).toFixed(2);
                actor.scaleY= Number(value.scaleY).toFixed(2);
                actor.flipX=value.flipX;
                break;
            case property=="scaleNoUniform": 
                actor.x=Math.round(value.x);
                actor.y=Math.round(value.y);
                actor.angle=Math.round(value.angle);
                actor.width=Math.round(actor.width/actor.scaleX*value.scaleX);
                actor.height=Math.round(actor.height/actor.scaleY*value.scaleY);
                actor.scaleX=Number(value.scaleX).toFixed(2);
                actor.scaleY= Number(value.scaleY).toFixed(2);
                actor.flipX=value.flipX;
                break;
            case property=="tileX" || property=="scaleX": 
                actor.width=Math.round(actor.width/actor.tileX*value);
                console.log(actor.width);
                break;
            case property=="tileY" || property=="scaleY":
                actor.height=Math.round(actor.height/actor.tileY*value);
                break;
            case property=="width":
                actor.scaleX=(value*actor.scaleX/actor.width).toFixed(2);
                break;
            case property=="height":
                actor.scaleY=(value*actor.scaleY/actor.height).toFixed(2);
                break;
            case property=="angle":
                value=Math.round(value);
                break;
        }
        if (property in this.model.sceneList[scenePos].actorList[actorPos])
             this.model.sceneList[scenePos].actorList[actorPos][property]=value;
        var isOpen = SideSheetView.isOpenActorProperties();
       this.selectScene(sceneID);
       this.selectActor(actorID);
       if (property=="name")this.openCast();
        if (isOpen) this.openActorProperties();
    }

    addActorProperty(sceneID,actorID,property,value){
        var scenePos=this.model.sceneList.findIndex(i => i.id == sceneID);
        var actorPos=this.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID); 
        this.model.sceneList[scenePos].actorList[actorPos][property]=value;
        this.selectScene(sceneID);
        this.selectActor(actorID);
        this.openActorProperties();
    }

    removeActorProperty(sceneID,actorID,property){
        var scenePos=this.model.sceneList.findIndex(i => i.id == sceneID);
        var actorPos=this.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID); 
        delete this.model.sceneList[scenePos].actorList[actorPos][property];
        this.selectScene(sceneID);
        this.selectActor(actorID);
        this.openActorProperties();
    }

    addScript(sceneID,actorID,scriptPos,script){
        var scenePos=this.model.sceneList.findIndex(i => i.id == sceneID);
        var actorPos=this.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID); 
        this.model.sceneList[scenePos].actorList[actorPos].addScript(script,scriptPos);
        this.selectScene(sceneID);
        this.selectActor(actorID);
        this.openActorScripts();
        this.selectScript(script.id);
    }

    removeScript(sceneID,actorID,scriptID){
        var scenePos = this.model.sceneList.findIndex(i => i.id == sceneID);
        var actorPos = this.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID); 
        var scriptPos = this.model.sceneList[scenePos].actorList[actorPos].scriptList.findIndex(i=>i.id==scriptID);
        this.model.sceneList[scenePos].actorList[actorPos].removeScript(scriptID);
        this.selectScene(sceneID);
        this.selectActor(actorID);
        this.openActorScripts();
        if (this.model.sceneList[scenePos].actorList[actorPos].scriptList.length==scriptPos){
            if(scriptPos>0){
                this.selectScript(this.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos-1].id);
            }
        }
        else {
            this.selectScript(this.model.sceneList[scenePos].actorList[actorPos].scriptList[this.selectedScriptIndex].id);
        }
    }

    renameScript(sceneID,actorID,scriptID,scriptName){
        var scenePos = this.model.sceneList.findIndex(i => i.id == sceneID);
        var actorPos = this.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID); 
        var scriptPos = this.model.sceneList[scenePos].actorList[actorPos].scriptList.findIndex(i=>i.id==scriptID);
        this.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos].name=scriptName;
        this.selectScene(sceneID); //necesario para los comandos de deshacer
        this.selectActor(actorID);
        this.openActorScripts();
        this.selectScript(scriptID);
    }

/* Actor editor commands */
    selectActor(actorID){
        if (actorID) this.selectedActorIndex=this.model.sceneList[this.selectedSceneIndex].actorList.findIndex(i=>i.id==actorID);
        else this.selectedActorIndex=null;
        if (SideSheetView.isOpenActorProperties() && actorID!=null) this.openActorProperties();
        if (actorID==null && !SideSheetView.isOpenCast()) SideSheetView.closeSheetHandler();
        if (SideSheetView.isOpenCast() || SideSheetView.isOpenActorProperties()) this.castView.updateSelectedActor(actorID);
        this.canvasView.updateSelectedActor(actorID);
    }

    openActorProperties(){
        this.actorPropertiesView.update(this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex]);
        SideSheetView.openSheetHandler("actor-properties");
        this.view.openCanvas("canvas");
    }

    selectScript(scriptID){
        this.selectedScriptIndex=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].scriptList.findIndex(i=>i.id==scriptID);
        this.actorScriptsView.updateSelectedScript(scriptID);
        var scriptList=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].scriptList;
        this.scriptCanvasView.update(scriptList[this.selectedScriptIndex].nodeList); 
    }

    openActorScripts(){
        var scriptList=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].scriptList;
        var actorName=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].name;
        this.actorScriptsView.update(actorName,scriptList);
        SideSheetView.openSheetHandler("actor-scripts");
        if (scriptList.length>0) {
            this.view.openCanvas("scriptcanvas");
            this.selectScript(scriptList[scriptList.length-1].id);
        }
        else {
            this.view.openCanvas("canvas");
        }
    }

    closeActorScripts(){
        SideSheetView.closeSheetHandler();
        this.view.openCanvas("canvas");
    };

    selectNode(nodeID){
        this.previousNodeSelected=nodeID;
        this.scriptCanvasView.updateSelectedNode(nodeID);
    }

// SOUNDS
    addSound(sound){
        var soundView = new SoundView();
        soundView.addView(sound);
        this.model.addSound(sound);
        this.soundSelectionView.addSound(soundView);
    }

    removeSound(soundID){
        this.model.removeSound(soundID);
        this.soundSelectionView.removeSound(soundID);
    }

/* Sounds editor commands */
    selectSound(soundID){
         this.soundSelectionView.updateSelectedSound(soundID);
    }

    openSounds(actorID){
        this.soundSelectionView.actorID=actorID // null si se abren los sonidos desde las propiedades del juego
        this.soundSelectionView.selectedSound=null; // inicializa el sonido seleccionado a null
        if (actorID==null){
            this.soundSelectionView.elementSound=this.model.sound;
            var index=this.model.soundList.findIndex(i => i.name == this.model.sound);
           (index !== -1) ? this.selectedSound=this.model.soundList[index].id : this.selectedSound=null;
        }
        else {
            this.soundSelectionView.elementSound=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].sound;
            var index=this.model.soundList.findIndex(i=> i.name == this.soundSelectionView.elementSound);
            (index !== -1) ? this.selectedSound=this.model.soundList[index].id : this.selectedSound=null;
        }
        this.selectSound(this.selectedSound);
        SideSheetView.openSheetHandler("sound-selection");
     }

// IMAGES
    addImage(image){
        var imageView = new ImageView();
        imageView.addView(image);
        this.model.addImage(image);
        this.imageSelectionView.addImage(imageView);
    }

    removeImage(imageID){
        this.model.removeImage(imageID);
        this.imageSelectionView.removeImage(imageID);
    }

/* Images editor commands */
    selectImage(imageID){
        this.imageSelectionView.updateSelectedImage(imageID);
    }

    openImages(){
        this.imageSelectionView.selectedImage=null; // inicializa la imagen seleccionada a null
        this.imageSelectionView.actorImage=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].image;
        var index=this.model.imageList.findIndex(i=> i.name == this.imageSelectionView.actorImage);
        (index !== -1) ? this.selectedImage=this.model.imageList[index].id : this.selectedImage=null;
        this.selectImage(this.selectedImage);
        SideSheetView.openSheetHandler("image-selection");
    }

// FONTS
    addFont(font){
        var fontView = new FontView();
        fontView.addView(font);
        this.model.addFont(font);
        this.fontSelectionView.addFont(fontView);
    }

    removeFont(fontID){
        this.model.removeFont(fontID);
        this.fontSelectionView.removeFont(fontID);
    }

/* Fonts editor commands */
    selectFont(fontID){
        this.fontSelectionView.updateSelectedFont(fontID);
    }

    openFonts(){
        this.fontSelectionView.selectedFont=null;
        this.fontSelectionView.actorFont=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].font;
        var index=this.model.fontList.findIndex(i=> i.name == this.fontSelectionView.actorFont);
        (index !== -1) ? this.selectedFont=this.model.fontList[index].id : this.selectedFont=null;
        this.selectFont(this.selectedFont);
        SideSheetView.openSheetHandler("font-selection");
    }

// SCRIPTING this.sceneID,this.actorID,this.scriptID,this.nodeID,this.if
    addNode(sceneID,actorID,scriptID,nodeID,insertPoint,node){
      var scenePos = this.model.sceneList.findIndex(i => i.id == sceneID);
      var actorPos = this.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID);
      var scriptPos =  this.model.sceneList[scenePos].actorList[actorPos].scriptList.findIndex(i=>i.id==scriptID);
      this.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos].addNode(nodeID,insertPoint,node);
      this.scriptCanvasView.update(this.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos].nodeList);
      this.selectScene(sceneID); //necesario para los comandos de deshacer
      this.selectActor(actorID);
      this.openActorScripts();
      this.selectScript(scriptID);
      this.selectNode(node.id);
    }

    removeNode (sceneID,actorID,scriptID,nodeID){
        var scenePos = this.model.sceneList.findIndex(i => i.id == sceneID);
        var actorPos = this.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID);
        var scriptPos =  this.model.sceneList[scenePos].actorList[actorPos].scriptList.findIndex(i=>i.id==scriptID);
        this.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos].removeNode(nodeID);
        this.scriptCanvasView.update(this.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos].nodeList);
        this.selectScene(sceneID); //necesario para los comandos de deshacer
        this.selectActor(actorID);
        this.openActorScripts();
        this.selectScript(scriptID);
        this.selectNode(null);
    }

    changeNode(sceneID,actorID,scriptID,nodeID,parameters){
        var scenePos = this.model.sceneList.findIndex(i => i.id == sceneID);
        var actorPos = this.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID);
        var scriptPos =  this.model.sceneList[scenePos].actorList[actorPos].scriptList.findIndex(i=>i.id==scriptID);
        this.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos].changeNode(nodeID,parameters);
        this.scriptCanvasView.update(this.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos].nodeList);
        this.selectScene(sceneID); //necesario para los comandos de deshacer
        this.selectActor(actorID);
        this.openActorScripts();
        this.selectScript(scriptID);
        this.selectNode(nodeID);
    }
}
