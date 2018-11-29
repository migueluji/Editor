class Scene {
	
    constructor(pos) {
        this._id ="id"+(new Date()).getTime();
        this._name = "";
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

    set pos(pos){
        this._pos=pos;
    }
    
}