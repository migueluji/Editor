class DuplicateSceneCmd extends Command {

    constructor (sceneID){
        super();
        this.pos=this.editor.model.sceneList.findIndex(i => i.id == sceneID);
        var scene= this.editor.model.sceneList[this.pos];
        this.scene=new Scene(scene);
        this.scene.id=Utils.id()
        this.scene.name="Copy of "+scene.name;
        var actorList=[];
        scene.actorList.forEach((actor,i)=> {
            actorList[i] = new Actor(actor);
            actorList[i].id = Utils.id()+"hola";
         });
        this.scene.actorList=actorList;
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
