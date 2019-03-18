class AddActorCmd extends Command {

    constructor (sceneID,actorPos){
        super();
        this.actorPos=actorPos;
        this.sceneID=sceneID;
        this.actor= new Actor({"id":Utils.id(),"name":this.newName(actorPos)});
        this.type="AddActorCmd";
        this.name="Add Actor: "+ this.actor.id;
    }

    newName (actorPos){
        actorPos = actorPos+1;
        var name="Actor "+actorPos;
        var actorList = this.editor.model.sceneList[this.editor.model.sceneList.findIndex(i=> i.id == this.sceneID)].actorList;
         while( actorList && actorList.findIndex(i=>i.name==name)!== -1){
            actorPos++;
            name="Actor "+actorPos;
        }
        return name;
    }

    execute (){  
       this.editor.addActor(this.sceneID,this.actorPos,this.actor);
    }
    
    undo(){
        this.editor.removeActor(this.sceneID,this.actor.id);
    }

}
