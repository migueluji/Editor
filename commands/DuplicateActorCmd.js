class DuplicateActorCmd extends Command {

    constructor (sceneID,actorID){
        super();
        this.sceneID =  sceneID;
        var index = this.editor.model.sceneList.findIndex(i=> i.id == sceneID);
        this.pos= this.editor.model.sceneList[index].actorList.findIndex(i => i.id == actorID);
        var actor = this.editor.model.sceneList[index].actorList[this.pos];
        this.actor = new Actor(actor);
        this.actor.id = Utils.id();
        this.actor.name = "Copy of "+actor.name
        this.type="DuplicateActorCmd";
        this.name="Duplicate Actor: "+ this.actor.id;
    }

    execute (){  
        this.editor.addActor(this.sceneID,this.pos+1,this.actor);
    }
    
    undo(){
        this.editor.removeActor(this.sceneID,this.actor.id);
    }

}
