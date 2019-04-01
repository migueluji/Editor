class AddActorPropertyCmd extends Command {

    constructor (sceneID,actorID,property,value){
        super();
        this.property=property;
        this.value=value;
        this.sceneID=sceneID;
        this.actorID=actorID;
        this.scenePos=this.editor.model.sceneList.findIndex(i => i.id == sceneID);
        this.actorPos=this.editor.model.sceneList[this.scenePos].actorList.findIndex(i=>i.id==actorID);
        this.type="AddActorPropertyCmd";
        this.name="Add Actor Property: "+ this.property;
    }

    execute (){  
        this.editor.addActorProperty(this.sceneID,this.actorID,this.property,this.value);
    }
    
    undo(){
        this.editor.removeActorProperty(this.sceneID,this.actorID,this.property);
    }

}
