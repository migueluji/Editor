class RemoveNodeCmd extends Command {

    constructor (sceneID,actorID,scriptID,nodeID){
        super(); 
        this.sceneID = sceneID;
        this.actorID = actorID;
        this.scriptID = scriptID;

        var scenePos=this.editor.model.sceneList.findIndex(i => i.id == sceneID);
        var actorPos=this.editor.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID);
        var scriptPos=this.editor.model.sceneList[scenePos].actorList[actorPos].scriptList.findIndex(i=>i.id==scriptID);
        var script=this.editor.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos];

        var founded = script.findNode(script.nodeList,nodeID,null,null);
        this.node = founded.list[founded.position];
        this.insert={"parentID":founded.parentID,"side":founded.side,"position":founded.position}

        this.type = "RemoveNodeCmd";
        this.name = "Remove Node: " + this.nodeID;
    }

    execute (){  
        this.editor.removeNode(this.sceneID,this.actorID,this.scriptID,this.node.id);
    }
     
    undo(){
         this.editor.addNode(this.sceneID,this.actorID,this.scriptID,this.insert,this.node);
    }
}
