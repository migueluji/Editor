class MoveNodeCmd extends Command {
    
    constructor (sceneID,actorID,scriptID,insert,nodeID){
        super();
        this.sceneID = sceneID;
        this.actorID = actorID;
        this.scriptID = scriptID;
        this.insert = insert;
        this.nodeID = nodeID;
     
        var sceneIndex = this.editor.model.sceneList.findIndex(i=>i.id == sceneID);
        var actorIndex = this.editor.model.sceneList[sceneIndex].actorList.findIndex(i=>i.id == actorID);
        var scriptIndex= this.editor.model.sceneList[sceneIndex].actorList[actorIndex].scriptList.findIndex(i=>i.id==scriptID);
        var script = this.editor.model.sceneList[sceneIndex].actorList[actorIndex].scriptList[scriptIndex];
         
        var founded=script.findNode(script.nodeList,nodeID,null,null); 
        this.node= founded.list[founded.position]; // the complete node obtained by ID
        this.remove={"parentID":founded.parentID,"side":founded.side,"position":founded.position};
        
        this.script=script;
        this.type="MoveScriptCmd";
        this.name="Move Script: "+scriptID;
    }
    
    execute (){
        this.editor.removeNode(this.sceneID,this.actorID,this.scriptID,this.nodeID);
        var founded=this.script.findNode(this.script.nodeList,this.insert.parentID,null,null);
        // to avoid add a node that does not exists!
        if (founded!=undefined || this.insert.parentID==null) this.editor.addNode(this.sceneID,this.actorID,this.scriptID,this.insert,this.node);
    }
    
    undo(){
        this.editor.removeNode(this.sceneID,this.actorID,this.scriptID,this.node.id);
        this.editor.addNode(this.sceneID,this.actorID,this.scriptID,this.remove,this.node);
    }

}
