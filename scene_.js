class Scene_ {

    constructor(sceneLi,sceneList_) {
		 this.model = sceneList_.model; // el modelo es la lista de escenas
		 this.view = sceneLi; // crea la estructura de la vista
	//	 this.view.removeListener(this.delete.bind(this)); // añade la función de borrar para tratar el evento check
        this.view.removeListener(sceneList_.removeSceneCmd.bind(sceneList_));
    }
    
    create (scene) { // actualiza el modelo y la vista 
		this.model.add(scene);
		this.view.set(scene);
    }
	
   /* delete (sceneID) { // actualiza el modelo y la vista
	    sceneList_.removeSceneCmd(sceneID);
    }
	*/
	getView() { // devuelve la vista (se llama desde el html)
        return this.view;
    }
}