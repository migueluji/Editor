class RemoveActorCmd extends Command {

    constructor (sceneID,actorID){
        super();
        this.sceneID=sceneID;
        this.actorID=actorID;
        var scene = this.editor.model.sceneList[this.editor.model.sceneList.findIndex(i => i.id == sceneID)];
        this.pos= scene.actorList.findIndex(i => i.id == actorID);
        this.actor=scene.actorList[this.pos];
        this.type="RemoveActorCmd";
        this.name="Remove Actor: " + actorID;
    }

    execute (){  
        this.editor.removeActor(this.sceneID,this.actor.id);
    }
    
    undo(){
        this.editor.addActor(this.sceneID,this.pos,this.actor);
     }

}
