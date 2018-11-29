class SceneList{
	
    constructor() {
        this._list= [];
    }
    
    get list(){
        return this._list;
    }

    addScene(scene,pos) {
        this._list.splice(pos,0,scene); // añade scene en la posición index eliminando 0 elementos
    }
    
	removeScene(sceneID) {
        this._list.splice(this._list.findIndex(i => i.id == sceneID),1);
    } 

}