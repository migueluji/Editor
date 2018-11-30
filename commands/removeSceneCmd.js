class RemoveSceneCmd extends Command {
    
    constructor (sceneID){
        super();
        this._pos=this._editor.model.list.findIndex(i => i.id == sceneID);
        this._scene=this._editor.model.list[this._pos];
        this._type="RemoveSceneCmd";
        this._name="Remove Scene: "+sceneID;
    }
    
    execute (){
        this._editor.removeScene(this._scene.id);
    }
    
    undo(){
        this._editor.addScene(this._scene,this._pos);
    }

}
