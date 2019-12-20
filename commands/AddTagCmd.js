class AddTagCmd extends Command {
    
    constructor (tag){
        super();
        this.tag=tag;
        this.type="AddTagCmd";
        this.name="Add Tag: "+this.tag;
    }

    execute (){
        this.editor.addTag(this.tag);
    }
    
    undo(){
        this.editor.removeTag(this.tag);
    }

}
