class Command {
    
    constructor(editorRef){
        if(editorRef!== undefined){
          Command.editor=editorRef;
        }
        this.editor= Command.editor;
        this.type="";
        this.name="";
    }

}