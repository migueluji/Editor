class ChangeGamePropertyCmd extends Command {

    constructor (property,value){
        super();
        this.property=property;
        this.value=value;
        this.oldValue=this.editor.model[property];
        this.type="ChangeGamePropertyCmd";
        this.name="Change Game Property: "+this.property;
    }

    execute (){  
        this.editor.changeGameProperty(this.property,this.value);
    }
    
    undo(){
        this.editor.changeGameProperty(this.property,this.oldValue);
    }

}
