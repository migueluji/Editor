class SceneList{
	
    constructor() {
        this.list= [];
    }
    
    addScene(scene) {
        this.list.push(scene);
    }
    
	removeScene(sceneID) {
		this.list.splice(this.list.findIndex(i => i.ID == sceneID),1);
    }

    lenght (){
        return this.lenght;
    }
    
}