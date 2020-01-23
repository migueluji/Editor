class MoveSceneCmd extends Command {
    
    constructor (sceneID,newPos){
        super();
        this.oldPos=this.editor.model.sceneList.findIndex(i => i.id == sceneID);
        this.scene=this.editor.model.sceneList[this.oldPos];
        this.newPos=newPos;
        this.type="MoveSceneCmd";
        this.name="Move Scene: "+sceneID;
    }
    
    execute (){
        this.editor.removeScene(this.scene.id);
        this.editor.addScene(this.scene,this.newPos-1);
    }
    
    undo(){
        this.editor.removeScene(this.scene.id);
        this.editor.addScene(this.scene,this.oldPos);
    }

}
