class Editor_ {
    
    constructor(view) {
        this.view = view;
        this.model = new SceneList();  

        this.cmdManager = new CmdManager(this);

        this.view.undoListener(this.cmdManager.undo.bind(this.cmdManager));
        this.view.redoListener(this.cmdManager.redo.bind(this.cmdManager));

        // crea el presenter de la lista y lo añade al documento
        this.sceneList_ = new SceneList_(new SceneListDiv(),this.model,this.cmdManager);
        this.view.div.appendChild(this.sceneList_.getView().getHtml());
    }

    addScene(scene) {
        var scene_=new Scene_ (new SceneLi(),this.model,this.cmdManager);
        scene_.create(scene);
        this.sceneList_.view.addScene(scene_.getView()); //actualiza la vista de la lista de escenas
    }

    removeScene(scene){
        this.sceneList_.model.removeScene(scene.ID);
        this.sceneList_.view.removeScene(scene.ID);
    }

    getView() {
        return this.view;
    }


    
}