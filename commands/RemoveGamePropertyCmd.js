class RemoveGamePropertyCmd extends Command {

    constructor (property,value){
        super();
        this.property=property;
        this.value=value;
        this.position=0;
        this.list=this.editor.view.html.querySelector(".game-properties-new");
        console.log("cmd",this.list);
    }

    execute (){  
        this.editor.removeGameProperty(this.property);
    }
    
    undo(){
        this.editor.addGameProperty(this.property,this.value,this.position);
    }

}