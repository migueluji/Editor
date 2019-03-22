class AddActorPropertyCmd extends Command {

    constructor (sceneID,actorID,property,value){
        super();
        this.property=property;
        this.value=value;
        this.scenePos=this.editor.model.sceneList.findIndex(i => i.id == sceneID);
        this.actorPos=this.editor.model.sceneList[this.scenePos].actorList.findIndex(i=>i.id==actorID);
        this.position=Object.keys(this.editor.model.sceneList[this.scenePos].actorList[this.actorPos].newProperties).length;
    }

    execute (){  
        this.editor.addActorProperty(this.scenePos,this.actorPos,this.property,this.value,this.position);
    }
    
    undo(){
        this.editor.removeActorProperty(this.scenePos,this.actorPos,this.property);
    }

}
