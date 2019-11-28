class AddNodeCmd extends Command {

    constructor (sceneID,actorID,scriptID,insert,node){
        super();
        this.type=type;
        this.sceneID = sceneID;
        this.actorID = actorID;
        this.scriptID = scriptID;
        this.insert = insert;
        this.node=node;
        this.type = "AddNodeCmd";
        this.name = "Add Node: " + this.type;
    }
 
    execute (){  
        this.editor.addNode(this.sceneID,this.actorID,this.scriptID,this.insert,this.node);
    }
    
    undo(){
        this.editor.removeNode(this.sceneID,this.actorID,this.scriptID,this.node.id);
    }

}
