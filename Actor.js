class Actor {
	
    constructor(actor) {
        this.id=actor.id;
        Object.assign(this,this.properties); //inicialización de propiedades
        Object.assign(this,actor);
    }

    get properties(){
        var obj={
            // Settings
            name:this.name, 
            x:this.x || 0, y:this.y || 0, 
            width:this.width || 50, height:this.height || 50, 
            scaleX:this.scaleX || 1, scaleY:this.scaleY || 1, 
            rotation:this.rotation || 0, screen:this.screen || false
        }
        return(obj);
    }
} 