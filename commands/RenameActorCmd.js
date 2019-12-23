class RenameActorCmd extends Command {
    
    constructor (sceneID,actorID,actorName){
        super();
        this.sceneID=sceneID;
        this.actorID=actorID;
        this.actorName=actorName.split(" ").join("_");
        var scene = this.editor.model.sceneList[this.editor.selectedSceneIndex];
        this.actorOldName=scene.actorList[scene.actorList.findIndex(i=>i.id===actorID)].name;
        this.type="RenameActorCmd";
        this.name="Rename actor: "+actorName;
    }
    
    execute (){
        this.editor.renameActor(this.sceneID,this.actorID,this.actorName);
    }
    
    undo(){
        this.editor.renameActor(this.sceneID,this.actorID,this.actorOldName);
    }

}