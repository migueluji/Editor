class SceneList_ {
    
    constructor(view) {
        this.view = view;
        this.model = new SceneList();  
        this.history= new History(this);
        this.view.addSceneListener(this.addSceneCmd.bind(this));
        this.view.undoListener(this.undo.bind(this));
        this.view.redoListener(this.redo.bind(this));
    }
	
    addSceneCmd(sceneName) {
        var cmd =new AddSceneCmd(new Scene(sceneName));
        this.execute(cmd);
    }

    removeSceneCmd(sceneID) {
        var cmd =new RemoveSceneCmd(sceneID);
        this.execute(cmd);
    }

    addScene(scene) {
        var scene_=new Scene_ (new SceneLi(), this);
        scene_.create(scene);
        this.view.addScene(scene_.getView()); // //actualiza la vista de la lista de escenas
    }

    removeScene(scene){
        this.model.remove(scene.ID);
        this.view.remove(scene.ID);
    }

    getView() {
        return this.view;
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
}