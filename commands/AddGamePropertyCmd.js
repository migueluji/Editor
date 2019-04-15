class AddGamePropertyCmd extends Command {

    constructor (property,value){
        super();
        this.property=property;
        this.value=value;
        this.type="AddGamePropertyCmd";
        this.name="Add Game Property: "+this.property;
    }

    execute (){  
        this.editor.addGameProperty(this.property,this.value);
    }
    
    undo(){
        this.editor.removeGameProperty(this.property);
    }

}
