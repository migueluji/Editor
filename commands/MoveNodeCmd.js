class MoveNodeCmd extends Command {
    
    constructor (sceneID,actorID,scriptID,nodeID,insertPoint,nodeToInsertID){
        super();
        this.sceneID = sceneID;
        this.actorID = actorID;
        this.scriptID = scriptID;
        this.nodeID = nodeID;
        this.insertPoint=insertPoint;
     
        var sceneIndex = this.editor.model.sceneList.findIndex(i=>i.id == sceneID);
        var actorIndex = this.editor.model.sceneList[sceneIndex].actorList.findIndex(i=>i.id == actorID);
        var scriptIndex= this.editor.model.sceneList[sceneIndex].actorList[actorIndex].scriptList.findIndex(i=>i.id==scriptID);
        var script = this.editor.model.sceneList[sceneIndex].actorList[actorIndex].scriptList[scriptIndex];
        var founded=script.findNode(null,null,script.nodeList,nodeToInsertID);
        console.log("encontrado",founded.list[founded.pos]);
        this.nodeToInsert=founded.list[founded.pos];
        
        this.type="MoveScriptCmd";
        this.name="Move Script: "+scriptID;
    }
    
    execute (){
        console.log("addNode",this.sceneID,this.actorID,this.scriptID,this.nodeID,this.insertPoint,this.nodeToInsert);
        this.editor.removeNode(this.sceneID,this.actorID,this.scriptID,this.nodeToInsert.id);
        this.editor.addNode(this.sceneID,this.actorID,this.scriptID,this.nodeID,this.insertPoint,this.nodeToInsert);
    }
    
    undo(){
      //  this.editor.removeScript(this.sceneID,this.actorID,this.scriptID);
      //  this.editor.addScript(this.sceneID,this.actorID,this.oldPos,this.script);
    }

}
