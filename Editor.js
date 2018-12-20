class Editor {
    
    constructor(editorView,gameModel) {
        this.view = editorView;
        this.model = gameModel;
        
        //App Bar
        this._appBarView=new AppBarView();
        this.view.addView(this._appBarView.html);

        //Drawer 
        this._draverHeaderView= new DrawerHeaderView();
        this._drawerScenesView= new DrawerScenesView();
        this.view.addView(this._drawerScenesView.html);
        this.view.addView(this._draverHeaderView.html);
  
        //Game Properties
        this._gamePropertiesView = new GamePropertiesView();
            this._gamePropertiesSettingsView= new GamePropertiesSettingsView();
            this._gamePropertiesSoundView= new GamePropertiesSoundView();
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

    addScene(scene,pos) {  
        var sceneView = new SceneView();
        sceneView.addView(scene);
        this.model.addScene(scene,pos);
        this._drawerScenesView.addScene(sceneView,pos);
    }

    removeScene(sceneID){
        this.model.removeScene(sceneID);
        this._drawerScenesView.removeScene(sceneID);
    }
 
}
