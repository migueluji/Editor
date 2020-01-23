class RenameSceneCmd extends Command {
    
    constructor (sceneID,sceneName){
        super();
        this.sceneID=sceneID;
        this.sceneName=sceneName.split(" ").join("_");

        this.sceneOldName=this.editor.model.sceneList[this.editor.model.sceneList.findIndex(i=>i.id===sceneID)].name;
        this.type="RenameSceneCmd";
        this.name="Rename Scene: "+sceneName;
    }
    
    execute (){
        this.editor.renameScene(this.sceneID,this.sceneName);
    }
    
    undo(){
        this.editor.renameScene(this.sceneID,this.sceneOldName);
    }

}