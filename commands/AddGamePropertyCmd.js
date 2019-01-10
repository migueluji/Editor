class AddGamePropertyCmd extends Command {

    constructor (property,value){
        super();
        this.property=property;
        this.value=value;
        this.position=Object.keys(this.editor.model.newProperties).length;
    }

    execute (){  
        this.editor.addGameProperty(this.property,this.value,this.position);
    }
    
    undo(){
        this.editor.removeGameProperty(this.property);
    }

}
