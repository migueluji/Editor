class AddSceneCmd extends Command {
    constructor (scene){
        super();
        this.type="AddSceneCmd";
        this.name="Add Scene: "+scene.ID;
        this.scene=scene;
    }
    execute (){
        this.editor.addScene(this.scene);
    }
    undo(){
        this.editor.removeScene(this.scene);
    }
}
