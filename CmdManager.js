class CmdManager {
    
    constructor(editor) {
        this.history= new History(editor);
    }

    addSceneCmd(scenePos) {
        var cmd =new AddSceneCmd(scenePos);
        this.history.execute(cmd);
    }

    duplicateSceneCmd(sceneId) {
        var cmd =new DuplicateSceneCmd(sceneId);
        this.history.execute(cmd);
    }

    moveSceneCmd(sceneID,scenePos) {
        var cmd =new MoveSceneCmd(sceneID,scenePos);
        this.history.execute(cmd);
    }

    removeSceneCmd(sceneID) {
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
    