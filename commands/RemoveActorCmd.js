class RemoveActorCmd extends Command {

    constructor (actorID){
        super();
        var scene = this.editor.model.sceneList[this.editor.selectedSceneIndex];
        this.pos=scene.actorList.findIndex(i => i.id == actorID);
        this.actor=scene.actorList[this.pos];
        this.type="RemoveActorCmd";
        this.name="Remove Actor: " + actorID;
    }

    execute (){  
        this.editor.removeActor(this.actor.id);
    }
    
    undo(){
        this.editor.addActor(this.actor,this.pos);
    }

}
