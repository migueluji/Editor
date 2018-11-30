class Command {
    
    constructor(editorRef){
        if(editorRef!== undefined){
          Command.editor=editorRef;
        }
        this._editor= Command.editor;
        this._type="";
        this._name="";
    }

}