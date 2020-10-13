class Editor {
    
    constructor(editorView,gameModel) {
      //  console.log(gameModel);
        this.view = editorView;
        this.model = gameModel;
        this.selectedSceneIndex=0;
        this.selectedActorIndex=null;
        this.selectedScriptIndex=0;
        this.previousNodeSelected=null;
        
        //App Bar
        if (gameModel.sceneList.length==0) this.appBarView=new AppBarView("Untitle"); 
        else this.appBarView=new AppBarView(gameModel.sceneList[0].name);
        this.view.addView(this.appBarView.html);

        // canvas
        this.canvasView = new CanvasView(gameModel,this.selectedSceneIndex);
        this.view.addView(this.canvasView.html);
        this.scriptCanvasView = new ScriptCanvasView();
        this.view.addView(this.scriptCanvasView.html);
        
        //Drawer 
        this.drawerHeaderView= new DrawerHeaderView(gameModel.name);
        this.drawerScenesView= new DrawerScenesView(gameModel.sceneList,this.canvasView);
        this.view.addView(this.drawerScenesView.html);
        this.view.addView(this.drawerHeaderView.html);

        //Side Sheet
        this.sideSheetView=new SideSheetView();
            this.gamePropertiesView = new GamePropertiesView(gameModel);
            this.sideSheetView.addView(this.gamePropertiesView.html);
            this.castView = new CastView(this.model.sceneList[this.selectedSceneIndex].actorList,this.model.imageList);
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
            this.canvasView.update(this.model.sceneList[this.selectedSceneIndex].actorList,this.model.allProperties);
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
        var saveToFile={};
        Object.assign(saveToFile,this.model);
        delete saveToFile.fontList;
        delete saveToFile.imageList;
        delete saveToFile.soundList;
        File.save(JSON.stringify(saveToFile, (key,value)=>{if(key!="id")return value}, '\t'));
     }

     takeScreenshot(){
        this.canvasView.takeScreenshot(400,240,0,this.model.sceneList[0].actorList,true); // 400x240 size of image for server 
     }

     playGame(){
        var gameData={};
        Object.assign(gameData,this.model);
        gameData=JSON.stringify(gameData, (key,value)=>{if(key!="id")return value}, '\t');
        localStorage.setItem("localStorage_GameData",gameData);

        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", "../engine/");
        form.setAttribute("target", "play");

        var inputFolder = document.createElement('input');
        inputFolder.type = 'text';
        inputFolder.name = "gameFolder";
        inputFolder.value = app.gameFolder;
        form.appendChild(inputFolder);
        
        var inputUrl = document.createElement('input');
        inputUrl.type = 'text';
        inputUrl.name = "serverGamesFolder";
        inputUrl.value = app.serverGamesFolder;
        form.appendChild(inputUrl);
        document.body.appendChild(form);

        form.submit();
        document.body.removeChild(form); 
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
    openSceneMenu(sceneID,x,y){
        this.drawerScenesView.openSceneMenu(sceneID,x,y);
    }

    selectScene(sceneID){
        var oldSelectedSceneIndex=this.selectedSceneIndex;
        this.selectedSceneIndex = this.model.sceneList.findIndex(i => i.id == sceneID);
        this.drawerScenesView.updateSelectedScene(sceneID);
        this.appBarView.updateSceneName(this.model.sceneList[this.selectedSceneIndex].name);
        this.canvasView.update(this.model.sceneList[this.selectedSceneIndex].actorList,this.model.allProperties); // actualiza el canvas
        this.castView.update(this.model.sceneList[this.selectedSceneIndex].actorList,this.model.imageList); //update castView
        if (oldSelectedSceneIndex!=this.selectedSceneIndex) {
            this.selectedActorIndex=null;
            switch (true) {
            case SideSheetView.isOpenCast(): this.openCast();break;
            case SideSheetView.isOpenGameProperties(): this.openGameProperties(); break;
            default :SideSheetView.closeSheetHandler(); this.view.openCanvas("canvas"); break;
            }
        }
        var d=64;
        this.canvasView.takeScreenshot(d,d,sceneID,this.model.sceneList[this.selectedSceneIndex].actorList,false);
    }

    openCast(){
        this.castView.update(this.model.sceneList[this.selectedSceneIndex].actorList,this.model.imageList);
        var actorID=null;
        if (this.selectedActorIndex!=null) actorID=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].id;
        this.castView.updateSelectedActor(actorID);
        SideSheetView.openSheetHandler("cast");
        this.view.openCanvas("canvas");
    }

    drawerToggle (){
        this.appBarView.drawerToogle();
        var actorID=null;
        if (this.selectedActorIndex!=null) actorID=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].id;
        this.canvasView.updateStageDrawer();
        if (SideSheetView.isOpenActorScripts()) this.scriptCanvasView.updateStageDrawer();
        if (actorID) this.canvasView.updateSelectedActor(actorID);
    }

// ACTOR
    addActor(sceneID,actorPos,actor){
        var scenePos = this.model.sceneList.findIndex(i => i.id == sceneID);
        this.model.sceneList[scenePos].addActor(actor,actorPos);
        this.selectScene(sceneID); //necesario para los comandos de deshacer
        this.castView.update(this.model.sceneList[this.selectedSceneIndex].actorList,this.model.imageList); // update the cast view
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

        if (["width","height","scaleX","scaleY","size","opacity","volume","start","density","friction","restitution","dampingLinear","dampingAngular","tileX","tileY"].includes(property))
            if (value<=0) value=0;
        if (property in this.model.sceneList[scenePos].actorList[actorPos])
            this.model.sceneList[scenePos].actorList[actorPos][property]=value;

        var originalWidth=50;
        var originalHeight=50;
        if(app.file.loader.resources.hasOwnProperty(actor.image)){
            originalWidth= app.file.loader.resources[actor.image].texture.width;
            originalHeight= app.file.loader.resources[actor.image].texture.height;
        }

        switch  (true) {
            case property=="image":
                actor.width=originalWidth*actor.scaleX*actor.tileX;
                actor.height=originalHeight*actor.scaleY*actor.tileY;
                actor.spriteOn=true;
                break;
            case property=="position": 
                actor.x=value.x;
                actor.y=value.y;
                break;
            case property=="width":
                actor.scaleX=(value/actor.tileX)/originalWidth;
                break;
            case property=="height":
                actor.scaleY=(value/actor.tileY)/originalHeight;
                break;
            case property=="scaleX":
                actor.width=originalWidth*value*actor.tileX;
                break;
            case property=="scaleY":
                actor.height=originalHeight*value*actor.tileY;
                break;
            case property=="tileX": 
                actor.width=originalWidth*value*actor.scaleX;
                break;
            case property=="tileY": 
                actor.height=originalHeight*value*actor.scaleY;
                break;
            case property=="scale":
                actor.x=value.x;
                actor.y=value.y;
                actor.angle=value.angle;
                actor.width=originalWidth*value.scaleX*actor.tileX;
                actor.height=originalHeight*value.scaleY*actor.tileY;
                actor.scaleX=value.scaleX;
                actor.scaleY=value.scaleY;
                actor.flipX=value.flipX;
                break;
            case property=="scaleNoUniform": 
                actor.x=value.x;
                actor.y=value.y;
                actor.angle=value.angle;
                actor.width=originalWidth*value.scaleX*actor.tileX;
                actor.height=originalHeight*value.scaleY*actor.tileY;
                actor.scaleX=value.scaleX;
                actor.scaleY=value.scaleY;
                actor.flipX=value.flipX;
                break;
        }
        this.selectScene(sceneID);
        this.selectActor(actorID);      
        if (property=="name") this.openCast();
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
        this.selectScript(script.id,true);
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
            if(scriptPos>0) this.selectScript(this.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos-1].id,false);
            else   this.view.openCanvas("canvas");
        }
        else this.selectScript(this.model.sceneList[scenePos].actorList[actorPos].scriptList[this.selectedScriptIndex].id,false);
    }

    renameScript(sceneID,actorID,scriptID,scriptName){
        var scenePos = this.model.sceneList.findIndex(i => i.id == sceneID);
        var actorPos = this.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID); 
        var scriptPos = this.model.sceneList[scenePos].actorList[actorPos].scriptList.findIndex(i=>i.id==scriptID);
        this.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos].name=scriptName;
        this.selectScene(sceneID); //necesario para los comandos de deshacer
        this.selectActor(actorID);
        this.openActorScripts();
        this.selectScript(scriptID,false);
    }

/* Actor editor commands */
    openActorMenu(actorID,x,y){
        this.castView.openActorMenu(actorID,x,y);
    }

    openActorScriptMenu(scriptID,x,y){
        this.actorScriptsView.openActorScriptMenu(scriptID,x,y);
    }

    selectActor(actorID){
        if (actorID) {
            this.selectedActorIndex=this.model.sceneList[this.selectedSceneIndex].actorList.findIndex(i=>i.id==actorID);
            if(SideSheetView.isOpenActorProperties()) this.openActorProperties();
            if(SideSheetView.isOpenActorScripts()) this.openActorScripts();
        }
        else {
            this.selectedActorIndex=null;
            if(SideSheetView.isOpenActorProperties() || SideSheetView.isOpenActorScripts() )SideSheetView.closeSheetHandler();
        }
        this.canvasView.updateSelectedActor(actorID);
        this.castView.updateSelectedActor(actorID);
    }

    openActorProperties(){
        this.actorPropertiesView.update(this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex]);
        SideSheetView.openSheetHandler("actor-properties");
        this.view.openCanvas("canvas");
    }

    selectScript(scriptID,init){ 
        var scriptList=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].scriptList;
        this.selectedScriptIndex=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].scriptList.findIndex(i=>i.id==scriptID);
        this.actorScriptsView.updateSelectedScript(scriptID);
        this.view.openCanvas("scriptcanvas");
        this.scriptCanvasView.update(scriptList[this.selectedScriptIndex].nodeList,init);    
    }

    openActorScripts(){
        var scriptList=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].scriptList;
        var actorName=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].name;
        this.actorScriptsView.update(actorName,scriptList);
        SideSheetView.openSheetHandler("actor-scripts");
    }

    closeActorScripts(){
        SideSheetView.closeSheetHandler();
        this.view.openCanvas("canvas");
    };

    selectNode(nodeID){
        this.previousNodeSelected=nodeID;
        this.scriptCanvasView.updateSelectedNode(nodeID);
    }

// TAGS
    openTags(inputTags){
        this.input=inputTags;
        this.tagsDialog= new TagSelectionView(this.model.tagList,this.input);
        var editorFrame=document.querySelector(".editor-frame-root");
        editorFrame.appendChild(this.tagsDialog.html);
    }

    addTag(tag){
        this.model.tagList.push(tag);
        this.tagsDialog.add(tag);
    }

    removeTag(tag){
        var index = this.model.tagList.findIndex(i=>i==tag);
        this.model.tagList.splice(index,1);  
    }

// SCRIPTING this.sceneID,this.actorID,this.scriptID,this.nodeID,this.if
    addNode(sceneID,actorID,scriptID,insert,node){
      var scenePos = this.model.sceneList.findIndex(i => i.id == sceneID);
      var actorPos = this.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID);
      var scriptPos =  this.model.sceneList[scenePos].actorList[actorPos].scriptList.findIndex(i=>i.id==scriptID);
      this.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos].addNode(insert,node);
      this.selectScene(sceneID); //necesario para los comandos de deshacer
      this.selectActor(actorID);
      this.openActorScripts();
      this.selectScript(scriptID,false);
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
        this.selectScript(scriptID,false);
        this.selectNode(null);
    }

    changeNode(sceneID,actorID,scriptID,nodeID,parameters){
        var scenePos = this.model.sceneList.findIndex(i => i.id == sceneID);
        var actorPos = this.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID);
        var scriptPos =  this.model.sceneList[scenePos].actorList[actorPos].scriptList.findIndex(i=>i.id==scriptID);
        this.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos].changeNode(nodeID,parameters);
        this.selectScene(sceneID); //necesario para los comandos de deshacer
        this.selectActor(actorID);
        this.openActorScripts();
        this.selectScript(scriptID,false);
        this.selectNode(nodeID);
    }

    getTagList(){
        return (this.model.tagList);
    }

    getActorList(){
        var actorList=[];
        this.model.sceneList[this.selectedSceneIndex].actorList.forEach(element => {
            actorList.push(element.name);
        });
        return (actorList.sort());
    }

    getSceneList(){
        var sceneList=[];
        this.model.sceneList.forEach(element => {
            sceneList.push(element.name);
        });
        return (sceneList);
    }

    getPropertiesList(element,type){
        var actor=null;
        var properties=[];
        switch (element){
            case "Game": 
                var object=Object.assign(this.model.newProperties,this.model.properties);
                properties=Object.assign(object,this.model.inputProperties); break;
            case "Me":
                actor = this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex];
                properties=Object.assign(actor.newProperties,actor.properties); break;
            default:
                var actorPos = this.model.sceneList[this.selectedSceneIndex].actorList.findIndex(i=>i.name==element);
                actor= this.model.sceneList[this.selectedSceneIndex].actorList[actorPos];
                properties=Object.assign(actor.newProperties,actor.properties); break;
        }
        switch (type) {
            case "Boolean": properties=this.checkType(properties,"boolean");break;
            case "Number" : properties=this.checkType(properties,"number");break;
        }
        return(Object.keys(properties));
    }

// Utilities
    checkType(properties,type){
        var newProperties={};
        Object.keys(properties).forEach(name=>{
            var obj = new Object();
            obj[name]=properties[name];
           if (typeof properties[name] == type) Object.assign(newProperties,obj);
        })
        return (newProperties);
    }

// ASSET
    openAssets(input,name,option){ // input (html field that makes the call) name (asset name) option (image, sound, font, animation)
        var assetList=[];
        switch (option){
            case "Sound" : assetList=this.model.soundList; break;
            case "Font"  : assetList=this.model.fontList; break;
            default: assetList=this.model.imageList; ; break; // images and animations
        }

        this.assetDialog = new AssetSelectionView(assetList,input,option,this.canvasView);

        var assetNameList=name.split(",");// selected asset (can include multiple names for animations)
        var assetIDList=[];
        assetNameList.forEach(name=>{
            var index=assetList.findIndex(i=>i.name==name);
        if (index!=-1) assetIDList.push(assetList[index].id);
        })
        this.assetDialog.updateSelectedAsset(assetIDList); // one or more selected asset elements

        var editorFrame=document.querySelector(".editor-frame-root");
        editorFrame.appendChild(this.assetDialog.html);
        this.openAssetsDialog=true;
    }

    selectAsset(assetID){
        var assetIDList=[];
        assetIDList[0]=assetID;
        this.assetDialog.updateSelectedAsset(assetIDList);
    }

    uploadFile(file,type){
        var formData = new FormData();
        formData.append('file', file, file.name); 				
        File.uploadFile(file,formData,type);		
    }

    addAsset(name, type){
        var asset=new Object({"id":Utils.id(), "name":name});
        this.model.addAsset(asset,type);
        if (type == "Image" || type == "Animation") this.canvasView.loadImage(asset.name);
        var assetView = new AssetView(asset,type);
        this.assetDialog.addAsset(assetView);
    }

    deleteFile(assetID, fileName, type){   
            File.deleteFile(app.gameFolder, assetID, fileName, type);
    }
    
    removeAsset(assetID, type){
        if (type == "Image" || type == "Animation") { // update the loader
            var index=this.model.imageList.findIndex(i=>i.id==assetID);
            this.canvasView.deleteImage(this.model.imageList[index].name);
        }
        this.model.removeAsset(assetID,type);
        this.assetDialog.removeAsset(assetID);
    }

    closeAsset(){
        var node=document.querySelector(".dialog-full-screen");
        node.parentNode.removeChild(node);
        this.openAssetsDialog=false;
        this.canvasView.update(this.model.sceneList[this.selectedSceneIndex].actorList,this.model.allProperties);
    }

}
