class Command {
    
    constructor(editorRef){
        if(editorRef!== undefined){//si tengo un editor
          Command.editor=editorRef;
        }
        this.editor= Command.editor;
    }

// GAME
    static saveGameCmd(){
        this.editor.saveGame();
    }

    static openGamePropertiesCmd(){
        this.editor.openGameProperties();
    }

// SCENES
    static selectSceneCmd(sceneID){
        this.editor.selectScene(sceneID);
    }

    static openCastCmd(){
        this.editor.openCast();
    }

// ACTORS
    static selectActorCmd(actorID){
        this.editor.selectActor(actorID);
    }

    static openActorPropertiesCmd(){
        this.editor.openActorProperties();
    }

// SOUNDS
    static selectSoundCmd(soundID){
        this.editor.selectSound(soundID);
    }

}