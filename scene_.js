class Scene_ {

    constructor(view,model,cmdManager) {
        this._view = view; // crea la estructura de la vista
        this._model = model; // el modelo es la lista de escenas
        this._view.menuSceneListener(this._view.menuSceneHandler.bind(this._view));
       
        this._view.dragstartSceneListener();
        this._view.dropSceneListener(cmdManager.moveSceneCmd.bind(cmdManager));
        this._view.dragenterSceneListener(this._view.dragenterSceneHandler.bind(this._view));
        this._view.dragoverSceneListener(this._view.dragoverSceneHandler.bind(this._view));
        this._view.dragleaveSceneListener(this._view.dragleaveSceneHandler.bind(this._view));


        this._view.dragendSceneListener();
    //    this._view.moveSceneListener(cmdManager.moveSceneCmd.bind(cmdManager));
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