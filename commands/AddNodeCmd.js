class AddNodeCmd extends Command {

    constructor (sceneID,actorID,scriptID,nodeID,insertPoint,node){
        super();
        this.type=type;
        var parameters = {};
        this.sceneID = sceneID;
        this.actorID = actorID;
        this.scriptID = scriptID;
        this.nodeID = nodeID;
        this.insertPoint= insertPoint;
        this.node=node;
        this.type = "AddNodeCmd";
        this.name = "Add Node: " + this.type;
    }
 
    execute (){  
        this.editor.addNode(this.sceneID,this.actorID,this.scriptID,this.nodeID,this.insertPoint,this.node);
    }
    
    undo(){
        this.editor.removeNode(this.sceneID,this.actorID,this.scriptID,this.node.id);
    }

}
