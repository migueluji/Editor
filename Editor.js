class Editor {
    
    constructor(editorView,gameModel) {
        console.log(gameModel);
        this.view = editorView;
        this.model = gameModel;
        this.selectedSceneIndex=0;
        this.selectedActorIndex=0;
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

        this.canvasView = new CanvasView(gameModel);
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
        this.openGameProperties();
        this.gamePropertiesView.updateGameProperty(property,value);
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
            if (this.selectedSceneIndex>0) {//si hay escenas que seleccionar
                this.selectScene(this.model.sceneList[this.selectedSceneIndex-1].id);
            }
        }
        else {
            this.selectScene(this.model.sceneList[this.selectedSceneIndex].id);
        }
    }
 
    renameScene(sceneID,sceneName){
        this.model.sceneList[this.model.sceneList.findIndex(i=>i.id===sceneID)].name=sceneName;
        this.drawerScenesView.renameScene(sceneID,sceneName);
        var selectedSceneName=this.model.sceneList[this.selectedSceneIndex].name;
        if (selectedSceneName === sceneName) this.appBarView.updateSceneName(sceneName);
    }

 /* Scene editor commands */
    selectScene(sceneID){
       this.selectedSceneIndex = this.model.sceneList.findIndex(i => i.id == sceneID);
       this.drawerScenesView.updateSelectedScene(sceneID);
       this.appBarView.updateSceneName(this.model.sceneList[this.selectedSceneIndex].name);
       this.canvasView.update(); // actualiza el canvas
       if (SideSheetView.isOpenCast()) this.openCast();
       else if (SideSheetView.displayed!="game-properties") SideSheetView.closeSheetHandler();
     }

    openCast(){
        this.castView.update(this.model.sceneList[this.selectedSceneIndex].actorList);
        var actorID=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].id;
        this.castView.updateSelectedActor(actorID);
        SideSheetView.openSheetHandler("cast");
    }

    drawerToggle (){
        this.appBarView.drawerToogle();
        var actorID=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].id;
        this.canvasView.update(actorID);
    }

// ACTOR
    addActor(sceneID,actorPos,actor){
        var scenePos = this.model.sceneList.findIndex(i => i.id == sceneID);
        this.model.sceneList[scenePos].addActor(actor,actorPos);
        this.selectScene(sceneID); //necesario para los comandos de deshacer
        this.openCast();
        this.selectActor(actor.id);
    }

    removeActor(sceneID,actorID){
        var scenePos = this.model.sceneList.findIndex(i => i.id == sceneID);
        this.model.sceneList[scenePos].removeActor(actorID);
        this.selectScene(sceneID); //necesario para los comandos de deshacer
        this.openCast();
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
        var width=this.model.sceneList[scenePos].actorList[actorPos]["width"];
        var height=this.model.sceneList[scenePos].actorList[actorPos]["height"];
        var originalWidth=width;
        var originalHeight=height;

        switch  (property) {
            case "tileX": {
                var tileX=this.model.sceneList[scenePos].actorList[actorPos]["tileX"];
                originalWidth = width/tileX;
                this.model.sceneList[scenePos].actorList[actorPos]["width"] = Math.round(originalWidth*value);
                break;
                }
            case "tileY":{
                var tileY=this.model.sceneList[scenePos].actorList[actorPos]["tileY"];;
                originalHeight = height/tileY;
                this.model.sceneList[scenePos].actorList[actorPos]["height"] = Math.round(originalHeight*value);          
                break;
            }
            case "width":{
                var scaleX =this.model.sceneList[scenePos].actorList[actorPos]["scaleX"];
                originalWidth = width/scaleX;
                this.model.sceneList[scenePos].actorList[actorPos]["scaleX"] = (value/originalWidth).toFixed(2);
                break;
            }
            case "height":{
                var scaleY =this.model.sceneList[scenePos].actorList[actorPos]["scaleY"];
                originalHeight = height/scaleY;
                this.model.sceneList[scenePos].actorList[actorPos]["scaleY"] = (value/originalHeight).toFixed(2);
                break;
            }
            case "scaleX":{
                var scaleX =this.model.sceneList[scenePos].actorList[actorPos]["scaleX"];
                originalWidth = width/scaleX;
                this.model.sceneList[scenePos].actorList[actorPos]["width"] = Math.round(originalWidth*value);
                break;
            }
            case "scaleY":{
                var scaleY =this.model.sceneList[scenePos].actorList[actorPos]["scaleY"];
                originalHeight = height/scaleY;
                this.model.sceneList[scenePos].actorList[actorPos]["height"] = Math.round(originalHeight*value);
                break;
            }
        }
        this.model.sceneList[scenePos].actorList[actorPos][property]=value;
        this.selectScene(sceneID);
        this.selectActor(actorID);
        (property=="name")?this.openCast():this.openActorProperties()
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
      //  console.log("editor select actor",actorID,);
        this.selectedActorIndex=this.model.sceneList[this.selectedSceneIndex].actorList.findIndex(i=>i.id==actorID);
        if (SideSheetView.isOpenCast()) {
            this.castView.updateSelectedActor(actorID);
        }
        else {
            if (SideSheetView.isOpenActorProperties()) this.openActorProperties();
        }
        this.canvasView.update(actorID);
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
