class RemoveSceneCmd extends Command {
    
    constructor(sceneID){
        super();
        this.pos=this.editor.model.sceneList.findIndex(i => i.id == sceneID);
        this.scene=this.editor.model.sceneList[this.pos];
        this.type="RemoveSceneCmd";
        this.name="Remove Scene: " + sceneID;
    }
    
    execute (){
        this.editor.removeScene(this.scene.id);
    }
    
    undo(){
        this.editor.addScene(this.scene,this.pos);
    }
}
