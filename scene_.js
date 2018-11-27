class Scene_ {

    constructor(view,model,cmdManager) {
		this.model = model; // el modelo es la lista de escenas
        this.view = view; // crea la estructura de la vista
        this.view.removeSceneListener(cmdManager.removeSceneCmd.bind(cmdManager));
    }
    
    create (scene) { // actualiza el modelo y la vista 
		this.model.addScene(scene);
		this.view.set(scene);
    }

	getView() {
        return this.view;
    }
}