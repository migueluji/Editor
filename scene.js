class Scene {
	
    constructor(pos) {
        this._id ="id"+(new Date()).getTime();
        this._name = "";
    }
   
    get id() {
        return this._id;
    }

    set id(value){
        this._id=value;
    }
  
    get name() {
        return this._name;
    }

    set name(name){
        this._name=name;
    }
    
}