class AddSceneCmd extends Command {

    constructor (pos){
        super();
        this._scene= new Scene();
        this._scene.name=this._newName(pos);
        this._pos=pos;
        this._type="AddSceneCmd";
        this._name="Add Scene: "+this._scene.id;
    }

    _newName (pos){
        pos = pos+1;
        var name="scene "+pos;
        while(this._editor.model.list.findIndex(i=>i.name==name)!== -1){
            pos++;
            name="scene "+pos;
        }
        return name;
    }

    execute (){
        this._editor.addScene(this._scene,this._pos);
    }
    
    undo(){
        this._editor.removeScene(this._scene.id);
    }

}
