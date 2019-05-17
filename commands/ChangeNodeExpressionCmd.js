class ChangeNodeExpressionCmd extends Command {

    constructor (sceneID,actorID,scriptID,nodeID,expression){
        super();
        this.sceneID=sceneID;
        this.actorID=actorID;
        this.scriptID=scriptID;
        this.nodeID=nodeID;
        this.expression=expression;

        var scenePos=this.editor.model.sceneList.findIndex(i => i.id == sceneID);
        var actorPos=this.editor.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID);
        var scriptPos=this.editor.model.sceneList[scenePos].actorList[actorPos].scriptList.findIndex(i=>i.id==scriptID);
        var script=this.editor.model.sceneList[scenePos].actorList[actorPos].scriptList[scriptPos];
        var founded = script.findNode(null,null,script.nodeList,nodeID);
        var node = founded.list[founded.pos];

        this.oldExpression=node.expression;

        this.type="ChangeNodeExpressionCmd";
        this.name="Change Node Expression: "+this.expression;
    }

    execute (){  
        this.editor.changeNodeExpression(this.sceneID,this.actorID,this.scriptID,this.nodeID,this.expression);
    }
    
    undo(){
        this.editor.changeNodeExpression(this.sceneID,this.actorID,this.scriptID,this.nodeID,this.oldExpression);
    }

}
