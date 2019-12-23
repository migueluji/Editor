class RenameScriptCmd extends Command {
    
    constructor (sceneID,actorID,scriptID,scriptName){
        super();
        this.sceneID=sceneID;
        this.actorID=actorID;
        this.scriptID=scriptID;
        this.scriptName=scriptName.split(" ").join("_");
        var scenePos=this.editor.model.sceneList.findIndex(i => i.id == sceneID);
        var actorPos=this.editor.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID);
        var scriptPos=this.editor.model.sceneList[scenePos].actorList[actorPos].scriptList.findIndex(i=>i.id==scriptID);
        this.scriptOldName=this.editor.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos].name;
        this.type="RenameScriptCmd";
        this.name="Rename Script: "+scriptName;
    }
    
    execute (){
        this.editor.renameScript(this.sceneID,this.actorID,this.scriptID,this.scriptName);
    }
    
    undo(){
        this.editor.renameScript(this.sceneID,this.actorID,this.scriptID,this.scriptOldName);
    }

}