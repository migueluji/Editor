class SceneList{
	
    constructor() {
        this.list= [];
    }
    
    addScene(scene) {
        this.list.splice(scene.pos,0,scene); // añade scene en la posición scene.pos eliminando 0 elementos
    }
    
	removeScene(sceneID) {
		this.list.splice(this.list.findIndex(i => i.id == sceneID),1);
    }

}