class CmdManager {
    
    constructor(editor) {
        if (editor!== undefined){
            CmdManager.history =new History(editor);
        }
        this.history= CmdManager.history;
    }

// Tag
    static addTagCmd(tag){
        var cmd = new AddTagCmd(tag);
        this.history.execute(cmd);
    }

    static removeTagCmd(tag){
        var cmd = new RemoveTagCmd(tag);
        this.history.execute(cmd);
    }

// Game
    static changeGamePropertyCmd(property,value){
        var cmd = new ChangeGamePropertyCmd(property,value);
        this.history.execute(cmd);
    }

    static addGamePropertyCmd(property,value){
        var cmd = new AddGamePropertyCmd(property,value);
        this.history.execute(cmd);
    }

    static removeGamePropertyCmd(property,value,pos){
        var cmd = new RemoveGamePropertyCmd(property,value,pos);
        this.history.execute(cmd);
    }

// Scenes
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

    static renameSceneCmd(sceneID,name) {
        var cmd =new RenameSceneCmd(sceneID,name);
        this.history.execute(cmd);
    }

// Actor
    static addActorCmd(sceneID,actorPos,position) {
        var cmd =new AddActorCmd(sceneID,actorPos,position);
        this.history.execute(cmd);
    }

    static removeActorCmd(sceneID,actorID) {
        var cmd =new RemoveActorCmd(sceneID,actorID);
        this.history.execute(cmd);
    }

    static duplicateActorCmd(sceneID,actorID) {
        var cmd =new DuplicateActorCmd(sceneID,actorID);
        this.history.execute(cmd);
    }

    static moveActorCmd(sceneID,actorID,actorPos) {
        var cmd =new MoveActorCmd(sceneID,actorID,actorPos);
        this.history.execute(cmd);
    }

    static renameActorCmd(sceneID,actorID,actorName) {
        var cmd =new RenameActorCmd(sceneID,actorID,actorName);
        this.history.execute(cmd);
    }

    static changeActorPropertyCmd(sceneID,actorID,property,value){
        var cmd = new ChangeActorPropertyCmd(sceneID,actorID,property,value);
        this.history.execute(cmd);
    }

    static addActorPropertyCmd(sceneID,actorID,property,value){
        var cmd = new AddActorPropertyCmd(sceneID,actorID,property,value);
        this.history.execute(cmd);
    }

    static removeActorPropertyCmd(sceneID,actorID,property,value,pos){
        var cmd = new RemoveActorPropertyCmd(sceneID,actorID,property,value,pos);
        this.history.execute(cmd);
    }

    static addScriptCmd(sceneID,actorID,scriptPos){
        var cmd =new AddScriptCmd(sceneID,actorID,scriptPos);
        this.history.execute(cmd);
    }

    static renameScriptCmd(sceneID,actorID,scriptID,scriptName) {
        var cmd =new RenameScriptCmd(sceneID,actorID,scriptID,scriptName);
        this.history.execute(cmd);
    }

    static duplicateScriptCmd (sceneID,actorID,scriptID){
        var cmd =new DuplicateScriptCmd(sceneID,actorID,scriptID);
        this.history.execute(cmd);
    }

    static removeScriptCmd (sceneID,actorID,scriptID){
        var cmd =new RemoveScriptCmd(sceneID,actorID,scriptID);
        this.history.execute(cmd);
    }

    static moveScriptCmd (sceneID,actorID,scriptID,scriptPos){
        var cmd = new MoveScriptCmd(sceneID,actorID,scriptID,scriptPos);
        this.history.execute(cmd);
    }

    static addNodeCmd(sceneID,actorID,scriptID,insert,node){// node can be an if structure
        var cmd = new AddNodeCmd(sceneID,actorID,scriptID,insert,node);
        this.history.execute(cmd);
    }

    static removeNodeCmd(sceneID,actorID,scriptID,nodeID){
        var cmd = new RemoveNodeCmd(sceneID,actorID,scriptID,nodeID);
        this.history.execute(cmd);
    }

    static moveNodeCmd(sceneID,actorID,scriptID,insert,nodeID){
        var cmd = new MoveNodeCmd(sceneID,actorID,scriptID,insert,nodeID);
        this.history.execute(cmd);
    }
    
    static changeNodeCmd(sceneID,actorID,scriptID,nodeID,parameters){
        var cmd = new ChangeNodeCmd(sceneID,actorID,scriptID,nodeID,parameters);
        this.history.execute(cmd);
    }

// Utils
    static undo(){
        this.history.undo();
    }

    static redo(){
        this.history.redo();
    }

}
    