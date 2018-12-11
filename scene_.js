class Scene_ {

    constructor(view,model) {
        this._view = view; // crea la estructura de la vista
        this._model = model; // el modelo es la lista de escenas
        this._view.menuSceneListener();
        this._view.propertiesSceneListener();
        this._view.duplicateSceneListener(CmdManager.duplicateSceneCmd.bind(CmdManager));
        this._view.removeSceneListener(CmdManager.removeSceneCmd.bind(CmdManager));
        this._view.dragSceneListeners(CmdManager.moveSceneCmd.bind(CmdManager));
    }
    
    get view() {
        return this._view;
    }

    create (scene,pos) { // actualiza el modelo y la vista 
		this._model.addScene(scene,pos);
		this._view.html=scene;
    }

}