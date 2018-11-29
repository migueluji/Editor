class AddSceneCmd extends Command {

    constructor (scene,pos){
        super();
        this.type="AddSceneCmd";
        this.name="Add Scene: "+scene.id;
        this.pos=pos;
        this.scene=scene;
    }
    
    execute (){
        this.editor.addScene(this.scene,this.pos);
    }
    
    undo(){
        this.editor.removeScene(this.scene.id);
    }
}
