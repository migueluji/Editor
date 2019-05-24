class AddNodeCmd extends Command {

    constructor (sceneID,actorID,scriptID,nodeID,insertPoint,type){
        super();
        this.type=type;
        var parameters = {};
        this.sceneID = sceneID;
        this.actorID = actorID;
        this.scriptID = scriptID;
        this.nodeID = nodeID;
        this.insertPoint= insertPoint;
        var actions = ["Edit","Spawn","Delete","Animate","Play","Move","Move To","Rotate","Rotate To","Push","Push To","Torque","Go To","Add","Remove"];
        var conditions = ["Compare","Check","Collision","Timer","Touch","Keyboard"];
        if (actions.includes(type)) this.node =new Do({"id":Utils.id(),"type":type,"parameters":parameters});
        else if (conditions.includes(type)) this.node = new If({"id":Utils.id(),"type":type,"parameters":parameters,"nodeListTrue":[],"nodeListFalse":[]});
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
