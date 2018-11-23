class RemoveSceneCmd extends Command {
    constructor (sceneID){
        super();
        this.type="RemoveSceneCmd";
        this.name="Remove Scene: "+ sceneID;
        this.scene=this.editor.model.list[this.editor.model.list.findIndex(i=>i.ID == sceneID)];
    }
    execute (){
        this.editor.removeScene(this.scene);
    }
    undo(){
        this.editor.addScene(this.scene);
    }
}
