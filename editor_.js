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
        if (scene.name==="scene "){//si la escena se crea por primera vez, no como resultado de un undo
            var index = scene.pos+1;
            scene.name="scene "+index;
            while(this.model.list.findIndex(i=>i.name==scene.name)!== -1){
                index++;
                scene.name="scene "+index;
            }
        }
        scene_.create(scene);
        this.sceneList_.view.addScene(scene_.getView(),scene.pos); //actualiza la vista de la lista de escenas
    }

    removeScene(scene){
        this.sceneList_.model.removeScene(scene.id);
        this.sceneList_.view.removeScene(scene.id);
    }

    getView() {
        return this.view;
    }


    
}