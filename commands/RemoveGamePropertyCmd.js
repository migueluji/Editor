class RemoveGamePropertyCmd extends Command {

    constructor (property,value,pos){
        super();
        this.property=property;
        this.value=value;
        this.pos=pos;
        this.type="RemoveGamePropertyCmd";
        this.name="Remove Game Property: " + property;
    }

    execute (){  
        this.editor.removeGameProperty(this.property);
    }
    
    undo(){
        this.editor.addGameProperty(this.property,this.value,this.pos);
    }

}