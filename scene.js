class Scene {
	
    constructor(pos) {
        this.ID = (new Date()).getTime();
        this.name = "scene ";
        this.pos= pos;
    }
   
    getID() {
        return this.ID;
    }
    
    getName() {
        return this.name;
    }

    getPos(){
        return this.pos;
    }
    
}