class RemoveScriptCmd extends Command {

    constructor (sceneID,actorID,scriptID){
        super();
        this.sceneID=sceneID;
        this.actorID=actorID;
        var scenePos=this.editor.model.sceneList.findIndex(i => i.id == sceneID);
        var actorPos=this.editor.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID);
        this.pos = this.editor.model.sceneList[scenePos].actorList[actorPos].scriptList.findIndex(i => i.id == scriptID);
        this.script=this.editor.model.sceneList[scenePos].actorList[actorPos].scriptList[this.pos];
        this.type="RemoveScriptCmd";
        this.name="Remove Script: " + scriptID;
    }

    execute (){  
        this.editor.removeScript(this.sceneID,this.actorID,this.script.id);
    }
    
    undo(){
        this.editor.addScript(this.sceneID,this.actorID,this.pos,this.script);
     }

}
