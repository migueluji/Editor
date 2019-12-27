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
        if (gameModel.sceneList.length==0) this.appBarView=new AppBarView("Untitle"); 
        else this.appBarView=new AppBarView(gameModel.sceneList[0].name);
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
            else {
                SideSheetView.closeSheetHandler();
                this.view.openCanvas("canvas");
            }
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
        if (SideSheetView.isOpenActorScripts()) this.scriptCanvasView.updateStageDrawer();
        if (actorID) this.canvasView.updateSelectedActor(actorID);
    }

// ACTOR
    addActor(sceneID,actorPos,actor){
        var scenePos = this.model.sceneList.findIndex(i => i.id == sceneID);
        this.model.sceneList[scenePos].addActor(actor,actorPos);
        this.selectScene(sceneID); //necesario para los comandos de deshacer
        this.castView.update(this.model.sceneList[this.selectedSceneIndex].actorList);
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
            case property=="imageSize":
                actor.width=Math.round(value.width*actor.scaleX*actor.tileX);
                actor.height=Math.round(value.height*actor.scaleY*actor.tileY);
                actor.image=value.image;
                break;
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
            case property=="tileX": 
                actor.width=Math.round(actor.width/actor.tileX*value);
                break;
            case property=="tileY": 
                actor.height=Math.round(actor.height/actor.tileY*value);
                break;
            case property=="scaleX":
                actor.width=Math.round(actor.width/actor.scaleX*value);
                break;
            case property=="scaleY": 
                actor.height=Math.round(actor.height/actor.scaleY*value);
                break;
            case property=="width":
                actor.scaleX=(value*actor.scaleX/actor.tileX/actor.width).toFixed(2);
                break;
            case property=="height":
                actor.scaleY=(value*actor.scaleY/actor.tileY/actor.height).toFixed(2);
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
        if (property=="name") this.openCast();
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
            if(scriptPos>0) this.selectScript(this.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos-1].id);
        }
        else this.selectScript(this.model.sceneList[scenePos].actorList[actorPos].scriptList[this.selectedScriptIndex].id);
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
        this.canvasView.updateSelectedActor(actorID);
        this.castView.updateSelectedActor(actorID);
    }

    openActorProperties(){
        this.actorPropertiesView.update(this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex]);
        SideSheetView.openSheetHandler("actor-properties");
        this.view.openCanvas("canvas");
    }

    selectScript(scriptID){ 
        var scriptList=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].scriptList;
        this.selectedScriptIndex=this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex].scriptList.findIndex(i=>i.id==scriptID);
        this.actorScriptsView.updateSelectedScript(scriptID);
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
        else this.view.openCanvas("canvas");
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
// ASSET
    openAssets(input,name,option){ // input (html field that makes the call) name (asset name) option (image, sound, font, animation)
        var assetList=[];
        switch (option){
            case "Sound" : assetList=this.model.soundList; break;
            case "Font"  : assetList=this.model.fontList; break;
            default: assetList=this.model.imageList; ; break; // images and animations
        }
        console.log(assetList,input,option,this.canvasView);
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

    addAsset(asset,option){
        if(!this.openAssetsDialog) { // for undo commands is necessary to open the asset dialog
            var assetList=[];
            switch (option){
                case "Sound" : assetList=this.model.soundList; break;
                case "Font"  : assetList=this.model.fontList; break;
                default: assetList=this.model.imageList; ; break; // images and animations
            }
            this.openAssets(assetList,"",option);
        }
        this.model.addAsset(asset,option);
        if (option == "Image" || option == "Animation") this.canvasView.loadImage(asset.name);
        var assetView = new AssetView(asset,option);
        this.assetDialog.addAsset(assetView);
    }

    removeAsset(assetID,option){
        if(!this.openAssetsDialog) { // for undo commands is necessary to open the asset dialog
            var assetList=[];
            switch (option){
                case "Sound" : assetList=this.model.soundList; break;
                case "Font"  : assetList=this.model.fontList; break;
                default: assetList=this.model.imageList; ; break; // images and animations
            }
            this.openAssets(assetList,"",option);
        }
        if (option == "Image" || option == "Animation") { // update the loader
            var index=this.model.imageList.findIndex(i=>i.id==assetID);
            this.canvasView.deleteImage(this.model.imageList[index].name);
        }
        this.model.removeAsset(assetID,option);
        this.assetDialog.removeAsset(assetID);
    }

    closeAsset(){
        var node=document.querySelector(".dialog-full-screen");
        node.parentNode.removeChild(node);
        this.openAssetsDialog=false;
    }

// SCRIPTING this.sceneID,this.actorID,this.scriptID,this.nodeID,this.if
    addNode(sceneID,actorID,scriptID,insert,node){
    //console.log("addNode",sceneID,actorID,scriptID,node.id);
      var scenePos = this.model.sceneList.findIndex(i => i.id == sceneID);
      var actorPos = this.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID);
      var scriptPos =  this.model.sceneList[scenePos].actorList[actorPos].scriptList.findIndex(i=>i.id==scriptID);
      this.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos].addNode(insert,node);
      this.selectScene(sceneID); //necesario para los comandos de deshacer
      this.selectActor(actorID);
      this.openActorScripts();
      this.selectScript(scriptID);
      //if(this.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos].nodelist) 
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
    //    this.scriptCanvasView.update(this.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos].nodeList);
        this.selectScene(sceneID); //necesario para los comandos de deshacer
        this.selectActor(actorID);
        this.openActorScripts();
        this.selectScript(scriptID);
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
        return (sceneList.sort());
    }

    getPropertiesList(element,type){
        var actor=null;
        var properties=[];
        if (element=="Game") {
            var object=Object.assign(this.model.newProperties,this.model.properties);
            properties=Object.assign(object,this.model.inputProperties);
        }
        else if (element=="Me")  {
            actor = this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex];
            properties=Object.assign(actor.newProperties,actor.properties);  
            }   
            else if (element) {
                    var actorPos = this.model.sceneList[this.selectedSceneIndex].actorList.findIndex(i=>i.name==element);
                    actor= this.model.sceneList[this.selectedSceneIndex].actorList[actorPos];
                    properties=Object.assign(actor.newProperties,actor.properties);  
                }  
        switch (type) {
            case "boolean": properties=this.checkType(element,properties,"boolean");break;
            case "number" : properties=this.checkType(element,properties,"number");break;
        }
        return(Object.keys(properties));
    }

// Utilities
    checkType(element,properties,type){
        var newProperties={};
        Object.keys(properties).forEach(name=>{
            var obj = new Object();
            obj[name]=properties[name];
           if (typeof properties[name] == type) Object.assign(newProperties,obj);
        })
        return (newProperties);
    }
}
