class ChangeGamePropertyCmd extends Command {

    constructor (property,value){
        super();
        this.property=property;
        this.value=value;
        this.oldValue=this.editor.model[property];
    }

    execute (){  
        this.editor.changeGameProperty(this.property,this.value);
    }
    
    undo(){
        this.editor.changeGameProperty(this.property,this.oldValue);
    }

}
