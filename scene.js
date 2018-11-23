class Scene {
	
    constructor(name) {
        this.ID = (new Date()).getTime();
        this.name = name;
    }
   
    getID() {
        return this.ID;
    }
    
    getName() {
        return this.name;
    }
    
}