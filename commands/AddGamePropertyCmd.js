class AddGamePropertyCmd extends Command {

    constructor (property,type,value){
        super();
        this.property=property;
        this.type=type;
        this.value=value;
    }

    execute (){  
        this.editor.addGameProperty(this.property,this.type,this.value);
    }
    
    undo(){
        this.editor.removeGameProperty(this.property);
    }

}
