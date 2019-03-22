class RemoveActorPropertyCmd extends Command {

    constructor (sceneID,actorID,property,value,pos){
        super();
        this.scenePos=this.editor.model.sceneList.findIndex(i => i.id == sceneID);
        this.actorPos=this.editor.model.sceneList[this.scenePos].actorList.findIndex(i=>i.id==actorID);
        this.property=property;
        this.value=value;
        this.pos=pos;
    }

    execute (){  
        this.editor.removeActorProperty(this.scenePos,this.actorPos,this.property);
    }
    
    undo(){
        this.editor.addActorProperty(this.scenePos,this.actorPos,this.property,this.value,this.pos);
    }

}