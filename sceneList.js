class SceneList{
	
    constructor() {
        this.list= [];
    }
    
    add(scene) {
        this.list.push(scene);
    }
    
	remove(sceneID) {
		this.list.splice(this.list.findIndex(i => i.ID == sceneID),1);
	}
}