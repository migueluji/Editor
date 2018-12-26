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
}