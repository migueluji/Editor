class RemoveTagCmd extends Command {
    
    constructor (tag){
        super();
        this.tag=tag;
        this.type="RemoveTagCmd";
        this.name="Remove Tag: "+this.tag;
    }

    execute (){
        this.editor.removeTag(this.tag);
    }
    
    undo(){
        this.editor.addTag(this.tag);
    }

}
