class MoveNodeCmd extends Command {
    
    constructor (sceneID,actorID,scriptID,nodeID,insertPoint,nodeToInsertID){
        super();
        this.sceneID = sceneID;
        this.actorID = actorID;
        this.scriptID = scriptID;
        this.nodeID = nodeID;
        this.insertPoint=insertPoint;
        this.nodeToInsertID=nodeToInsertID;
     
        var sceneIndex = this.editor.model.sceneList.findIndex(i=>i.id == sceneID);
        var actorIndex = this.editor.model.sceneList[sceneIndex].actorList.findIndex(i=>i.id == actorID);
        var scriptIndex= this.editor.model.sceneList[sceneIndex].actorList[actorIndex].scriptList.findIndex(i=>i.id==scriptID);
        var script = this.editor.model.sceneList[sceneIndex].actorList[actorIndex].scriptList[scriptIndex];
         
        this.founded=script.findNode(null,null,script.nodeList,nodeToInsertID); 
        this.nodeToInsert= this.founded.list[this.founded.pos]; // the complete node obtained by ID

        console.log(this.founded);
        
     //   this.oldScript = new Script(JSON.parse(JSON.stringify(script)));

        this.type="MoveScriptCmd";
        this.name="Move Script: "+scriptID;
    }
    
    execute (){
        console.log("add",this.nodeToInsert.id);
        // var founded=true;
        // if (this.nodeID){ // if this.nodoID = null the moving is to the top of the nodelist
        //     this.oldScript.removeNode(this.nodeToInsert.id); 
        //     var founded=this.oldScript.findNode(null,null,this.oldScript.nodeList,this.nodeID);
        // } 
        // console.log("!!!!!",founded,this.oldScript);
        // // if founded is false - do not move a node inside itself
        //  if ((founded) && (this.nodeID!=this.nodeToInsert.id)){ // and do not move to the same place
            this.editor.removeNode(this.sceneID,this.actorID,this.scriptID,this.nodeToInsertID);
            this.editor.addNode(this.sceneID,this.actorID,this.scriptID,this.nodeID,this.insertPoint,this.nodeToInsert);
       // }
    }
    
    undo(){
        
         console.log("remove",this.nodeToInsertID);
         this.editor.removeNode(this.sceneID,this.actorID,this.scriptID,this.nodeToInsert.id);
         this.editor.addNode(this.sceneID,this.actorID,this.scriptID,this.founded.parentID,this.founded.side,this.nodeToInsert);
         
      //  this.editor.removeScript(this.sceneID,this.actorID,this.scriptID);
      //  this.editor.addScript(this.sceneID,this.actorID,this.oldPos,this.script);
    }

}
