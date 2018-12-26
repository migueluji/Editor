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
        this._draverHeaderView= new DrawerHeaderView(gameModel.name);
        this._drawerScenesView= new DrawerScenesView(gameModel.sceneList);
        this.view.addView(this._drawerScenesView.html);
        this.view.addView(this._draverHeaderView.html);
  
        //Game Properties
        this._gamePropertiesView = new GamePropertiesView();
            this._gamePropertiesSettingsView= new GamePropertiesSettingsView(gameModel);
            this._gamePropertiesSoundView= new GamePropertiesSoundView(gameModel);
        this._gamePropertiesView.addView(this._gamePropertiesSettingsView.html);
        this._gamePropertiesView.addView(this._gamePropertiesSoundView.html);

        //Scene Properties
        this._scenePropertiesView = new ScenePropertiesView();

        //Side Sheet
        this._sideSheetView=new SideSheetView();
            this._sideSheetView.addView(this._gamePropertiesView.html);
            this._sideSheetView.addView(this._scenePropertiesView.html);
        this.view.addView(this._sideSheetView.html);

    }

    changeGameProperty(property,value){
        this._gamePropertiesView.updateGameProperty(property,value);
    }

    selectScene(sceneID){
        this.selectedScene=sceneID;
        this.selectedSceneIndex = this.model.sceneList.findIndex(i => i.id == sceneID);
        this._drawerScenesView.updateSelectedScene(sceneID);
        this._appBarView.updateSceneName(this.model.sceneList[this.selectedSceneIndex].name);
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
        if(sceneID!=this.selectedScene){
            this.selectScene(this.selectedScene);
        }
        else {
            if (this.model.sceneList.length==this.selectedSceneIndex ){
                if (this.selectedSceneIndex>0){ //si hay scenas qque sleccionar
                    this.selectScene(this.model.sceneList[this.selectedSceneIndex-1].id);
                }
            }
            else {
                this.selectScene(this.model.sceneList[this.selectedSceneIndex].id);
            }
        }

    }
 
}
