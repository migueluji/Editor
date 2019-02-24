class AddActorCmd extends Command {

    constructor (pos){
        super();
        this.actor= new Actor({"name":this.newName(pos),"id":"id"+(new Date()).valueOf()});
        this.pos=pos;
        this.type="AddActorCmd";
        this.name="Add Actor: "+ this.actor.id;
    }

    newName (pos){
        pos = pos+1;
        var name="Actor "+pos;
        var actorList = this.editor.model.sceneList[this.editor.selectedSceneIndex].actorList;
        while( actorList && actorList.findIndex(i=>i.name==name)!== -1){
            pos++;
            name="Actor "+pos;
        }
        return name;
    }

    execute (){  
        this.editor.addActor(this.actor,this.pos);
    }
    
    undo(){
        this.editor.removeActor(this.actor.id);
    }

}
