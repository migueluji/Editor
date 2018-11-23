class Editor_ {
    
    constructor(view) {
        this.view = view;
        this.model = new SceneList();  

        this.history= new History(this);
        
        this.view.undoListener(this.undo.bind(this));
        this.view.redoListener(this.redo.bind(this));

        // crea el presenter de la lista y lo añade al documento
        this.sceneList_ = new SceneList_(new SceneListDiv(),this);
        this.view.div.appendChild(this.sceneList_.getView().getHtml());
    }
    
    addSceneCmd(scenePos) {
        var cmd =new AddSceneCmd(new Scene(scenePos));
        this.execute(cmd);
    }

    removeSceneCmd(sceneID) {
        var cmd =new RemoveSceneCmd(sceneID);
        this.execute(cmd);
    }

    addScene(scene) {
        var scene_=new Scene_ (new SceneLi(),this);
        scene_.create(scene);
        this.sceneList_.view.addScene(scene_.getView()); //actualiza la vista de la lista de escenas
    }

    removeScene(scene){
        this.sceneList_.model.removeScene(scene.ID);
        this.sceneList_.view.removeScene(scene.ID);
    }

    execute (cmd){
        this.history.execute(cmd);
    }

    undo(){
        this.history.undo();
    }

    redo(){
        this.history.redo();
    }

    getView() {
        return this.view;
    }


    
}