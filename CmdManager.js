class CmdManager {
    
    constructor(editor) {
        this.history= new History(editor);
    }

    addSceneCmd(scenePos) {
        var cmd =new AddSceneCmd(new Scene(scenePos));
        this.history.execute(cmd);
    }

    removeSceneCmd(sceneID) {
        console.log("removeSceneCmd",sceneID);
        var cmd =new RemoveSceneCmd(sceneID);
        this.history.execute(cmd);
    }

    undo(){
        this.history.undo();
    }

    redo(){
        this.history.redo();
    }

}
    