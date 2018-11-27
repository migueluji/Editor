class Scene {
	
    constructor(pos) {
        this._id = (new Date()).getTime();
        this._name = "scene ";
        this._pos= pos;
    }
   
    get id() {
        return this._id;
    }
  
    get name() {
        return this._name;
    }

    set name(name){
        this._name=name;
    }

    get pos(){
        return this._pos;
    }
    
}