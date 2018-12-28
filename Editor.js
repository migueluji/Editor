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
            this._gamePropertiesSettingsView= new GamePropertiesSettingsView();
            this._gamePropertiesSoundView= new GamePropertiesSoundView();
            this._gamePropertiesNewView = new GamePropertiesNewView();
        console.log(this._gamePropertiesNewView.html);
        this._gamePropertiesView.addView(this._gamePropertiesSettingsView.html);
        this._gamePropertiesView.addView(this._gamePropertiesSoundView.html);
        this._gamePropertiesView.addView(this._gamePropertiesNewView.html);
        this._gamePropertiesView._init(gameModel.properties); // inicializa la vista con las propiedades iniciales dle juego

        //Scene Properties
        this._scenePropertiesView = new ScenePropertiesView();

        //Side Sheet
        this._sideSheetView=new SideSheetView();
            this._sideSheetView.addView(this._gamePropertiesView.html);
            this._sideSheetView.addView(this._scenePropertiesView.html);
        this.view.addView(this._sideSheetView.html);

    }

    addGameProperty(property,type,value){
        this.model.newProperties.push({"property":property,"type":type, "value":value });
    }

    removeGameProperty(property){
       this.model.newProperties.splice(this.model.newProperties.findIndex(i=> i["property"]==property),1);
    }

    changeGameProperty(property,value){
        this.model[property]=value;
        this._gamePropertiesView.updateGameProperty(property,value);
        if (property == "name") this._draverHeaderView.updateSceneName(value);
        if (property == "play") this._gamePropertiesSoundView.onClickHandler();
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
 
}
