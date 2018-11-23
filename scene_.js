class Scene_ {

    constructor(sceneLi,editor_) {
		this.model = editor_.model; // el modelo es la lista de escenas
		this.view = sceneLi; // crea la estructura de la vista
        this.view.removeListener(editor_.removeSceneCmd.bind(editor_));
    }
    
    create (scene) { // actualiza el modelo y la vista 
		this.model.addScene(scene);
		this.view.set(scene);
    }

	getView() {
        return this.view;
    }
}