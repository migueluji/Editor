class Scene_ {

    constructor(view,model,cmdManager) {
        this._view = view; // crea la estructura de la vista
        this._model = model; // el modelo es la lista de escenas
        this._view.moveSceneListener(cmdManager.moveSceneCmd.bind(cmdManager));
        this._view.duplicateSceneListener(cmdManager.duplicateSceneCmd.bind(cmdManager));
        this._view.removeSceneListener(cmdManager.removeSceneCmd.bind(cmdManager));
    }
    
    get view() {
        return this._view;
    }

    create (scene,pos) { // actualiza el modelo y la vista 
		this._model.addScene(scene,pos);
		this._view.html=scene;
    }

}