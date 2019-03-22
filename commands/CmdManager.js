class CmdManager {
    
    constructor(editor) {
        if (editor!== undefined){
            CmdManager.history =new History(editor);
        }
        this.history= CmdManager.history;
    }

// Asset
    static addSoundCmd(soundName){
        var cmd = new AddSoundCmd(soundName);
        this.history.execute(cmd);
    }

    static removeSoundCmd(soundID){
        var cmd = new RemoveSoundCmd(soundID);
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
    static addActorCmd(sceneID,actorPos) {
        var cmd =new AddActorCmd(sceneID,actorPos);
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

// Utils
    static undo(){
        this.history.undo();
    }

    static redo(){
        this.history.redo();
    }

}
    