class DuplicateSceneCmd extends Command {

    constructor (sceneID){
        super();
        this.pos=this.editor.model.sceneList.findIndex(i => i.id == sceneID);
        var scene= this.editor.model.sceneList[this.pos];
        var sceneJSON = JSON.parse(JSON.stringify(scene));
        this.scene=new Scene(sceneJSON);
        this.scene.id=Utils.id()
        this.scene.name="Copy_of_"+scene.name;
        this.type="DuplicateSceneCmd";
        this.name="Duplicate Scene: " + this.scene.id;
    }
    
    assignNodesID(nodeList){
        if (nodeList) nodeList.forEach(node=>{
            node.id=Utils.id();
            node.type ="dup"+node.type;
            if (node.hasOwnProperty("nodeListTrue")) { // si es un IF
                if(node.nodeListTrue) this.assignNodesID(node.nodeListTrue);
                if(node.nodeListFalse)this.assignNodesID(node.nodeListFalse);
            }
        });
    }
    
    execute (){
         this.editor.addScene(this.scene,this.pos+1);
    }
    
    undo(){
        this.editor.removeScene(this.scene.id);
    }

}
