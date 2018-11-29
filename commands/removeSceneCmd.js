class RemoveSceneCmd extends Command {
    
    constructor (sceneID){
        super();
        this.type="RemoveSceneCmd";
        this.name="Remove Scene: "+sceneID;
        this.pos=this.editor.model.list.findIndex(i => i.id == sceneID);
        this.scene=this.editor.model.list[this.pos];
    }
    
    execute (){
        this.editor.removeScene(this.scene.id);
    }
    
    undo(){
        this.editor.addScene(this.scene,this.pos);
    }

}
