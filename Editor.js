class Editor {
    
    constructor(editorView,gameModel) {
        this.view = editorView;
        this.model = gameModel;
        var index=gameModel.soundList.findIndex(i => i.name == gameModel.sound);
        (index !== -1) ? this.selectedSound=gameModel.soundList[index].id : this.selectedSound=null;
        this.selectedSceneIndex=0;
        
        //App Bar
        this.appBarView=new AppBarView(gameModel.sceneList[0].name);
        this.view.addView(this.appBarView.html);

        //Drawer 
        this.drawerHeaderView= new DrawerHeaderView(gameModel.name);
        this.drawerScenesView= new DrawerScenesView(gameModel.sceneList);
        this.view.addView(this.drawerScenesView.html);
        this.view.addView(this.drawerHeaderView.html);

        //Side Sheet
        this.sideSheetView=new SideSheetView();
            this.gamePropertiesView = new GamePropertiesView(gameModel);
            this.sideSheetView.addView(this.gamePropertiesView.html);
            this.soundSelectionView = new SoundSelectionView(gameModel.soundList,this.selectedSound);
            this.sideSheetView.addView(this.soundSelectionView.html);
            this.castView = new CastView(this.model.sceneList[this.selectedSceneIndex].actorList);
            this.sideSheetView.addView(this.castView.html);
            this.actorPropertiesView = new ActorPropertiesView(this.model.sceneList[this.selectedSceneIndex].actorList[0]);
            this.sideSheetView.addView(this.actorPropertiesView.html);
        this.view.addView(this.sideSheetView.html);
    }

// GAME
    addGameProperty(property,value,position){
        this.model[property]=value;
        var propertyNumberView = new PropertyView(property,value);
        this.gamePropertiesView.newPropertiesView.addProperty(propertyNumberView.html,position);
    }

    removeGameProperty(property){
        delete this.model[property];
        this.gamePropertiesView.newPropertiesView.removeProperty(property);
    }

    changeGameProperty(property,value){
        this.model[property]=value;
        if (property === "name") this.drawerHeaderView.updateGameName(value);
        else this.gamePropertiesView.updateGameProperty(property,value);
        if (property === "sound") {
            (value == "Undefined") ?    this.selectSound(null) :
                                        this.selectSound(this.model.soundList[this.model.soundList.findIndex(i => i.name == this.model.sound)].id);
         }
    }

/* Game editor commands */
    openGameProperties(){
        SideSheetView.openSheetHandler("game-properties");
    }

    saveGame(){
        File.save(this.model.name+".json",JSON.stringify(this.model, null, '\t'));
    }

//SCENES
    addScene(scene,pos) {  
        var sceneView = new SceneView();
        sceneView.addView(scene);
        this.model.addScene(scene,pos);
        this.drawerScenesView.addScene(sceneView,pos);
        if (pos==0){
            this.selectScene(scene.id);
        }
    }

    removeScene(sceneID){
        var sceneSelectedID=this.model.sceneList[this.selectedSceneIndex].id;
        this.model.removeScene(sceneID);
        this.drawerScenesView.removeScene(sceneID);
        if(sceneID==sceneSelectedID){
             if (this.model.sceneList.length==this.selectedSceneIndex ){
                if (this.selectedSceneIndex>0){ //si hay scenas que seleccionar
                    this.selectScene(this.model.sceneList[this.selectedSceneIndex-1].id);
                }
            }
            else {
                this.selectScene(this.model.sceneList[this.selectedSceneIndex].id);
            }    
        }
    }
 
    renameScene(sceneID,sceneName){
        this.model.sceneList[this.model.sceneList.findIndex(i=>i.id===sceneID)].name=sceneName;
        this.drawerScenesView.renameScene(sceneID,sceneName);
        var selectedSceneName=this.model.sceneList[this.selectedSceneIndex].name;
        if(selectedSceneName===sceneName) this.appBarView.updateSceneName(sceneName);
      }

 /* Scene editor commands */
    selectScene(sceneID){
        var currentSelectedSceneIndex= this.selectedSceneIndex;
        this.selectedSceneIndex = this.model.sceneList.findIndex(i => i.id == sceneID);
        this.drawerScenesView.updateSelectedScene(sceneID);
        this.appBarView.updateSceneName(this.model.sceneList[this.selectedSceneIndex].name);
        if (SideSheetView.displayed=="cast") this.openCast();
        else if (SideSheetView.displayed=="actor-properties")
            if (currentSelectedSceneIndex != this.selectedSceneIndex) SideSheetView.closeSheetHandler();
     }

     openCast(){
        this.castView.update(this.model.sceneList[this.selectedSceneIndex].actorList);
        SideSheetView.openSheetHandler("cast");
     }

// ACTOR
    addActor(sceneID,actorPos,actor){
        this.selectScene(sceneID); //necesario para los comandos de deshacer
        var actorView = new ActorView();
        actorView.addView(actor);
        this.selectedSceneIndex = this.model.sceneList.findIndex(i => i.id == sceneID);
        this.model.sceneList[this.selectedSceneIndex].addActor(actor,actorPos);
        this.castView.addActor(actorView,actorPos);    
        this.selectActor(actor.id);
    }

    removeActor(sceneID,actorID){
        this.selectScene(sceneID); //necesario para los comandos de deshacer
        this.selectedSceneIndex = this.model.sceneList.findIndex(i => i.id == sceneID);
        this.model.sceneList[this.selectedSceneIndex].removeActor(actorID);
        this.castView.removeActor(actorID);
    }

    renameActor(sceneID,actorID,actorName){
        this.selectScene(sceneID); //necesario para los comandos de deshacer
        this.selectedSceneIndex = this.model.sceneList.findIndex(i => i.id == sceneID);
        var scene=this.model.sceneList[this.selectedSceneIndex];
        var index=scene.actorList.findIndex(i=>i.id===actorID);
        scene.actorList[index].name=actorName;
        if (SideSheetView.displayed=="cast")
            this.castView.renameActor(actorID,actorName);
        else if (SideSheetView.displayed=="actor-properties")
            this.actorPropertiesView.updateActorName(actorName);
    }


    changeActorProperty(scenePos,actorPos,property,value){
        this.model.sceneList[scenePos].actorList[actorPos][property]=value;
        this.actorPropertiesView.updateActorProperty(property,value);
 /*       if (property === "sound") {
            (value == "Undefined") ?    this.selectSound(null) :
                                        this.selectSound(this.model.soundList[this.model.soundList.findIndex(i => i.name == this.model.sound)].id);
         }
         */
    }

/* Actor editor commands */
    selectActor(actorID){
        this.selectedActorIndex=this.model.sceneList[this.selectedSceneIndex].actorList.findIndex(i=>i.id==actorID);
        this.castView.updateSelectedActor(actorID);
    }

    openActorProperties(){
        this.actorPropertiesView.update(this.model.sceneList[this.selectedSceneIndex].actorList[this.selectedActorIndex]);
        SideSheetView.openSheetHandler("actor-properties");
    }

// SOUNDS
    addSound(sound){
        var soundView = new SoundView(sound);
        soundView.addView(sound);
        this.model.addSound(sound);
        this.model.sound=sound.name;
        this.soundSelectionView.addSound(soundView);
        this.gamePropertiesView.updateGameProperty("sound",this.model.sound);
    }

    removeSound(soundID){
        this.model.removeSound(soundID);
        this.model.sound="Undefined";
        this.soundSelectionView.removeSound(soundID);
        this.gamePropertiesView.updateGameProperty("sound",this.model.sound);
    }

/* Sounds editor commands */
    selectSound(soundID){
         this.soundSelectionView.updateSelectedSound(soundID);
    }

}
