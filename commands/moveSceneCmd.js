class MoveSceneCmd extends Command {
    
    constructor (sceneID,newPos){
        super();
        this._oldPos=this._editor.model.list.findIndex(i => i.id == sceneID);
        this._scene=this._editor.model.list[this._oldPos];
        this._newPos=newPos;
        this._type="MoveSceneCmd";
        this._name="Move Scene: "+sceneID;
    }
    
    execute (){
        this._editor.removeScene(this._scene.id);
        this._editor.addScene(this._scene,this._newPos-1);
    }
    
    undo(){
        this._editor.removeScene(this._scene.id);
        this._editor.addScene(this._scene,this._oldPos);
    }

}
