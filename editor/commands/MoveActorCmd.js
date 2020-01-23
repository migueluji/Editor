class MoveActorCmd extends Command {
    
    constructor (sceneID,actorID,newPos){
        super();
        this.sceneID=sceneID;
        this.actorID=actorID;
        var index =this.editor.model.sceneList.findIndex(i=>i.id == sceneID);
        this.oldPos=this.editor.model.sceneList[index].actorList.findIndex(i=>i.id == actorID);
        this.actor=this.editor.model.sceneList[index].actorList[this.oldPos];
        this.newPos=newPos;
        this.type="MoveActorCmd";
        this.name="Move Actor: "+actorID;
    }
    
    execute (){
        this.editor.removeActor(this.sceneID,this.actorID);
        this.editor.addActor(this.sceneID,this.newPos-1,this.actor);
    }
    
    undo(){
        this.editor.removeActor(this.sceneID,this.actorID);
        this.editor.addActor(this.sceneID,this.oldPos,this.actor);
    }

}
