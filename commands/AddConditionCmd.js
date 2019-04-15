class AddConditionCmd extends Command {

    constructor (sceneID,actorID,scriptID,nodeListID,position,type,expression){
        super();
        this.type=type;
        var expression = new Expression({"text":null,"scope":null});
        this.sceneID =sceneID;
        this.actorID =actorID;
        this.scriptID =scriptID;
        this.nodeListID = nodeListID;
        this.position = position;
        this.if = new If({"id":Utils.id(),"nodeType":type,"expression":expression,"nodeListTrue":null,"nodeListFalse":null});
        this.type="AddConditionCmd";
        this.name="Add Condition: "+ this.type;
        console.log(nodeListID);
    }
 
    execute (){  
        this.editor.addCondition(this.sceneID,this.actorID,this.scriptID,this.nodeListID,this.position,this.if);
    }
    
    undo(){
        this.editor.removeCondition(this.sceneID,this.actorID,this.scriptID,this.nodeListID,this.if.id);
    }

}
