class Editor {
    
    constructor(editorView,gameModel) {
        this.view = editorView;
        this.model = gameModel;
        this.selectedScene=gameModel.sceneList[0].id;
        this.selectedSceneIndex=0;
        
        //App Bar
        this._appBarView=new AppBarView(gameModel.sceneList[0].name);
        this.view.addView(this._appBarView.html);

        //Drawer 
        this._drawerHeaderView= new DrawerHeaderView(gameModel.name);
        this._drawerScenesView= new DrawerScenesView(gameModel.sceneList);
        this.view.addView(this._drawerScenesView.html);
        this.view.addView(this._drawerHeaderView.html);

        //Side Sheet
        this._sideSheetView=new SideSheetView();
            this._gamePropertiesView = new GamePropertiesView(gameModel);
            this._sideSheetView.addView(this._gamePropertiesView.html);
        this.view.addView(this._sideSheetView.html);

    }

    addGameProperty(property,value,position){
        this.model[property]=value;
        var propertyNumberView = new PropertyView(property,value);
        this._gamePropertiesView._newPropertiesView.addProperty(propertyNumberView.html,position);
     }

    removeGameProperty(property){
        delete this.model[property];
        this._gamePropertiesView._newPropertiesView.removeProperty(property);
    }

    changeGameProperty(property,value){
        this.model[property]=value;
        this._gamePropertiesView.updateGameProperty(property,value);
        if (property == "name") this._drawerHeaderView.updateSceneName(value);
    }

    addScene(scene,pos) {  
        var sceneView = new SceneView();
        sceneView.addView(scene);
        this.model.addScene(scene,pos);
        this._drawerScenesView.addScene(sceneView,pos);
        if (pos==0){
            this.selectScene(scene.id);
        }
    }

    removeScene(sceneID){
        this.model.removeScene(sceneID);
        this._drawerScenesView.removeScene(sceneID);
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
        this._drawerScenesView.renameScene(sceneID,sceneName);
    }

    selectScene(sceneID){
        this.selectedScene=sceneID;
        this.selectedSceneIndex = this.model.sceneList.findIndex(i => i.id == sceneID);
        this._drawerScenesView.updateSelectedScene(sceneID);
        this._appBarView.updateSceneName(this.model.sceneList[this.selectedSceneIndex].name);
     }
}
