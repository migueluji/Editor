class Command {
    
    constructor(editorRef){
        if(editorRef!== undefined){//si tengo un editor
          Command.editor=editorRef;
        }
        this.editor= Command.editor;
    }

    static selectSceneCmd(sceneID){
        this.editor.selectScene(sceneID);
    }

    static selectActorCmd(actorID){
        this.editor.selectActor(actorID);
    }

    static selectSoundCmd(soundID){
        this.editor.selectSound(soundID);
    }

    static saveGame(){
        this.editor.saveGame();
    }
}