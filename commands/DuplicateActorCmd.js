class DuplicateActorCmd extends Command {

    constructor (actorID){
        super();
        var scene=this.editor.model.sceneList[this.editor.selectedSceneIndex];
        this.pos=scene.actorList.findIndex(i => i.id == actorID);
        var actor = scene.actorList[this.pos];
        this.actor= new Actor({"name":"Copy of "+actor.name,"id":"id"+(new Date()).valueOf()});
        this.type="DuplicateActorCmd";
        this.name="Duplicate Actor: "+ this.actor.id;
    }

    execute (){  
        this.editor.addActor(this.actor,this.pos+1);
    }
    
    undo(){
        this.editor.removeActor(this.actor.id);
    }

}
