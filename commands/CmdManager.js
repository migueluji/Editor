class CmdManager {
    
    constructor(editor) {
        if (editor!== undefined){
            CmdManager.history =new History(editor);
        }
        this.history= CmdManager.history;
    }

    static addSceneCmd(scenePos) {
        var cmd =new AddSceneCmd(scenePos);
        this.history.execute(cmd);
    }

    static duplicateSceneCmd(sceneId) {
        var cmd =new DuplicateSceneCmd(sceneId);
        this.history.execute(cmd);
    }

    static moveSceneCmd(sceneID,scenePos) {
        var cmd =new MoveSceneCmd(sceneID,scenePos);
        this.history.execute(cmd);
    }

    static removeSceneCmd(sceneID) {
        var cmd =new RemoveSceneCmd(sceneID);
        this.history.execute(cmd);
    }

    static changeGamePropertyCmd(property,value){
        var cmd = new ChangeGamePropertyCmd(property,value);
        this.history.execute(cmd);
    }

    static addGamePropertyCmd(property,type,value){
        var cmd = new AddGamePropertyCmd(property,type,value);
        this.history.execute(cmd);
    }

    static undo(){
        this.history.undo();
    }

    static redo(){
        this.history.redo();
    }

}
    