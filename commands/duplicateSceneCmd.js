class DuplicateSceneCmd extends Command {

    constructor (sceneID){
        super();
        this.pos=this.editor.model.sceneList.findIndex(i => i.id == sceneID);
        this.scene=new Scene(); //asi obtiene un nuevo identificador
        this.scene.name="Copy of "+this.editor.model.sceneList[this.pos].name;//solo tiene en cuenta el nombre
        this.type="DuplicateSceneCmd";
        this.name="Duplicate Scene: "+this.scene.id;
    }
    
    execute (){
         this.editor.addScene(this.scene,this.pos+1);
    }
    
    undo(){
        this.editor.removeScene(this.scene.id);
    }

}
