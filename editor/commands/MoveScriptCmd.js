class MoveScriptCmd extends Command {
    
    constructor (sceneID,actorID,scriptID,newPos){
        super();
        this.sceneID = sceneID;
        this.actorID = actorID;
        this.scriptID = scriptID;
        var scenePos = this.editor.model.sceneList.findIndex(i=>i.id == sceneID);
        var actorPos = this.editor.model.sceneList[scenePos].actorList.findIndex(i=>i.id == actorID);
        this.oldPos = this.editor.model.sceneList[scenePos].actorList[actorPos].scriptList.findIndex(i=>i.id == scriptID);
        this.script = this.editor.model.sceneList[scenePos].actorList[actorPos].scriptList[this.oldPos];
        this.newPos = newPos;
        this.type="MoveScriptCmd";
        this.name="Move Script: "+scriptID;
    }
    
    execute (){
        this.editor.removeScript(this.sceneID,this.actorID,this.scriptID);
        this.editor.addScript(this.sceneID,this.actorID,this.newPos-1,this.script);
    }
    
    undo(){
        this.editor.removeScript(this.sceneID,this.actorID,this.scriptID);
        this.editor.addScript(this.sceneID,this.actorID,this.oldPos,this.script);
    }

}
