class Editor {
    
    constructor(editorView,gameModel) {
        this.view = editorView;
        this.model = gameModel;
        this.selectedScene=gameModel.sceneList[0].id;
 //       this.selectedActor=null;
        var index=gameModel.soundList.findIndex(i => i.name == gameModel.sound);
        (index !== -1) ? this.selectedSound=gameModel.soundList[index].id : this.selectedSound=null;
        this.selectedSceneIndex=0;
  //      this.selectedActorIndex=0;
        
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
        this.view.addView(this.sideSheetView.html);

    }

// Game
    saveGame(){
        File.save(this.model.name+".json",JSON.stringify(this.model, null, '\t'));
    }

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
        this.gamePropertiesView.updateGameProperty(property,value);
        if (property === "name") this.drawerHeaderView.updateGameName(value);
        if (property === "sound") {
            (value == "Undefined") ?    this.selectSound(null) :
                                        this.selectSound(this.model.soundList[this.model.soundList.findIndex(i => i.name == this.model.sound)].id);
         }
    }

 //Scenes
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
        this.model.removeScene(sceneID);
        this.drawerScenesView.removeScene(sceneID);
        if(sceneID==this.selectedScene){
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
        if(this.selectedScene===sceneID)this.appBarView.updateSceneName(sceneName);
    }

    selectScene(sceneID){
        this.selectedScene=sceneID;
        this.selectedSceneIndex = this.model.sceneList.findIndex(i => i.id == sceneID);
        this.drawerScenesView.updateSelectedScene(sceneID);
        this.appBarView.updateSceneName(this.model.sceneList[this.selectedSceneIndex].name);
        this.castView = new CastView(this.model.sceneList[this.selectedSceneIndex].actorList);
        this.sideSheetView.addView(this.castView.html);
     }

// Actor
     addActor(actor,pos){
        var actorView = new ActorView();
        actorView.addView(actor);
        this.model.sceneList[this.selectedSceneIndex].addActor(actor,pos);
        this.castView.addActor(actorView,pos);
     }

     removeActor(actorID){
        this.model.sceneList[this.selectedSceneIndex].removeActor(actorID);
        this.castView.removeActor(actorID);
     }

     renameActor(actorID,actorName){
        var scene=this.model.sceneList[this.selectedSceneIndex];
        var index=scene.actorList.findIndex(i=>i.id===actorID);
        scene.actorList[index].name=actorName;
        this.castView.renameActor(actorID,actorName);
    }

    selectActor(actorID){
         this.castView.updateSelectedActor(actorID);
    }

// sounds
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

     selectSound(soundID){
    //  (this.selectedSound===soundID || soundID==null) ?  this.selectedSound=null : this.selectedSound=soundID;
        this.soundSelectionView.updateSelectedSound(soundID);
    }
}
