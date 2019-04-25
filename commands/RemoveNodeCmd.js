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

        var founded = script.findNode(null,null,script.nodeList,nodeID);
        this.if = founded.list[founded.pos];
        if (founded.list.length==1 || founded.pos==0) { //si borro el ultimo elemento
            this.nodeID=founded.parentID;
            if (founded.side=="right") this.insertPoint="right";
            else if (founded.side=="left") this.insertPoint="left";
        }
        else {
            this.nodeID=founded.list[founded.pos-1].id; // anterior en la lista e insercción down
            this.insertPoint="down";
        }
        this.type = "RemoveNodeCmd";
        this.name = "Remove Node: " + this.nodeID;
    }

    execute (){  
        this.editor.removeNode(this.sceneID,this.actorID,this.scriptID,this.if.id);
    }
     
    undo(){
         this.editor.addNode(this.sceneID,this.actorID,this.scriptID,this.nodeID,this.insertPoint,this.if);
    }
}
