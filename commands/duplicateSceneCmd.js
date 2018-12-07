class DuplicateSceneCmd extends Command {

    constructor (sceneID){
        super();
        this._pos=this._editor.model.list.findIndex(i => i.id == sceneID);
        this._scene=new Scene(); //asi obtiene un nuevo identificador
        this._scene.name="copy of "+this._editor.model.list[this._pos].name;//solo tiene en cuenta el nombre
        this._type="DuplicateSceneCmd";
        this._name="Duplicate Scene: "+this._scene.id;
    }
    
    execute (){
        this._editor.addScene(this._scene,this._pos+1);
    }
    
    undo(){
        this._editor.removeScene(this._scene.id);
    }

}
