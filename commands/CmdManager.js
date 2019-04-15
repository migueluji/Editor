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

    static addImageCmd(imageName){
        var cmd = new AddImageCmd(imageName);
        this.history.execute(cmd);
    }

    static removeImageCmd(imageID){
        var cmd = new RemoveImageCmd(imageID);
        this.history.execute(cmd);
    }

    static addFontCmd(fontName){
        var cmd = new AddFontCmd(fontName);
        this.history.execute(cmd);
    }

    static removeFontCmd(fontID){
        var cmd = new RemoveFontCmd(fontID);
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

    static addConditionCmd(sceneID,actorID,scriptID,nodeListID,position,type,expresion){
        var cmd = new AddConditionCmd(sceneID,actorID,scriptID,nodeListID,position,type,expresion);
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
    