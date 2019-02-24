class DuplicateSceneCmd extends Command {

    constructor (sceneID){
        super();
        this.pos=this.editor.model.sceneList.findIndex(i => i.id == sceneID);
        var scene= this.editor.model.sceneList[this.pos];
        this.scene=new Scene( {"name":"Copy of "+scene.name,"id":"id"+(new Date()).valueOf()}); //asi obtiene un nuevo identificador
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
