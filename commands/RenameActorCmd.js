class RenameActorCmd extends Command {
    
    constructor (actorID,actorName){
        super();
        this.actorID=actorID;
        this.actorName=actorName;
        var scene = this.editor.model.sceneList[this.editor.selectedSceneIndex];
        this.actorOldName=scene.actorList[scene.actorList.findIndex(i=>i.id===actorID)].name;
        this.type="RenameActorCmd";
        this.name="Rename actor: "+actorName;
    }
    
    execute (){
        this.editor.renameActor(this.actorID,this.actorName);
    }
    
    undo(){
        this.editor.renameActor(this.actorID,this.actorOldName);
    }

}