class DuplicateSceneCmd extends Command {

    constructor (sceneID){
        super();
        this.pos=this.editor.model.sceneList.findIndex(i => i.id == sceneID);
        var scene= this.editor.model.sceneList[this.pos];
        var sceneJSON = JSON.parse(JSON.stringify(scene));
        this.scene=new Scene(sceneJSON);
        this.scene.id=Utils.id()
        this.scene.name=Utils.newName(scene.name,this.editor.model.sceneList);
        this.type="DuplicateSceneCmd";
        this.name="Duplicate Scene: " + this.scene.id;
    }

    execute (){
         this.editor.addScene(this.scene,this.pos+1);
    }
    
    undo(){
        this.editor.removeScene(this.scene.id);
    }

}
