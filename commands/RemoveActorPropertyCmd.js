class RemoveActorPropertyCmd extends Command {

    constructor (sceneID,actorID,property,value,pos){
        super();
        this.sceneID=sceneID;
        this.actorID=actorID;
        this.property=property;
        this.value=value;
        this.pos=pos;
        this.type="RemoveActorPropertyCmd";
        this.name="Remove Actor Property: " + property;
    }

    execute (){  
        this.editor.removeActorProperty(this.sceneID,this.actorID,this.property);
    }
    
    undo(){
        this.editor.addActorProperty(this.sceneID,this.actorID,this.property,this.value,this.pos);
    }

}