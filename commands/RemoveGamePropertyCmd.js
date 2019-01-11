class RemoveGamePropertyCmd extends Command {

    constructor (property,value){
        super();
        this.property=property;
        this.value=value;
        this.position=this._newPosition();
    }

    _newPosition (){
        var propertyList=this.editor.view.html.querySelector(".game-properties-new");
        var list=propertyList.querySelectorAll(".new-property");
        var i=0;
        while ( i < list.length && !(list[i].querySelector("#"+this.property))) {
           i++;
        }
        return i;
    }

    execute (){  
        this.editor.removeGameProperty(this.property);
    }
    
    undo(){
        this.editor.addGameProperty(this.property,this.value,this.position);
    }

}