class ChangeNodeCmd extends Command {

    constructor (sceneID,actorID,scriptID,nodeID,parameters){
        super();
        this.sceneID=sceneID;
        this.actorID=actorID;
        this.scriptID=scriptID;
        this.nodeID=nodeID;
        this.parameters=parameters;

        var scenePos=this.editor.model.sceneList.findIndex(i => i.id == sceneID);
        var actorPos=this.editor.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID);
        var scriptPos=this.editor.model.sceneList[scenePos].actorList[actorPos].scriptList.findIndex(i=>i.id==scriptID);
        var script=this.editor.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos];

        var founded = script.findNode(script.nodeList,nodeID,null,null);   
        var node = founded.list[founded.position];
        this.oldParameters=node.parameters;

        this.type="ChangeNodeCmd";
        this.name="Change Node: "+JSON.stringify(this.parameters);
    }

    execute (){  
        this.editor.changeNode(this.sceneID,this.actorID,this.scriptID,this.nodeID,this.parameters);
    }
    
    undo(){
        this.editor.changeNode(this.sceneID,this.actorID,this.scriptID,this.nodeID,this.oldParameters);
    }

}
