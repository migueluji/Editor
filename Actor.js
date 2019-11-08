class Actor {
	
    constructor(actor) {
        this.id=actor.id;
        this.name=actor.name;
        this.scriptList=[];
        Object.assign(this,this.properties); //inicialización de propiedades
        Object.assign(this,actor);
        if (this.scriptList) {this.scriptList.forEach((script,i) => this.scriptList[i] = new Script(script));
        }
    }

    get properties(){
        var obj={
            // Settings
            x:this.x || 0, y:this.y || 0, 
            width:this.width || 50, height:this.height || 50, 
            scaleX:this.scaleX || 1, scaleY:this.scaleY || 1, 
            angle:this.angle || 0, screen:this.screen || false,
            collider:this.collider || "Box", tags:this.tags || "",
            // Sprite
            visible:this.visible || false, image:this.image || undefined,
            color:this.color || "#ffffff", opacity: String(this.opacity) || 1, // String para que no sea falso ?
            flipX:this.flipX || false , flipY:this.flipY || false ,
            scrollX:this.scrollX || 0, scrollY:this.scrollY || 0,
            tileX:this.tileX || 1, tileY:this.tileY || 1,
            // Text
            write:this.write || false, text:this.text || "",
            font:this.font || "Arial", size:this.size || 30,
            color:this.color || "#ffffff" , style:this.style || "Normal" ,
            align:this.align || "Left", offsetX:this.offsetX || 0,
            offsetY:this.offsetY || 0,
            // Sound
            play:this.play || false, sound:this.sound || undefined,
            start:this.start || 0, volume: String(this.volume) || 1,
            pan:this.pan || 0 , loop:this.loop || true,
            // Physics
            active:this.active || false, type:this.type || "Kinematic",
            fixedAngle:this.fixedAngle || false,
            velocityX:this.velocityX || 0, velocityY:this.velocityY || 0,
            angularVelocity:this.angularVelocity || 0, 
            density: String(this.density) || 1, friction: String(this.friction) || 1, restitution: String(this.restitution) || 1,
            dampingLinear:this.dampingLinear || 0, dampingAngular:this.dampingAngular ||  0
        }
        return(obj);
    }

    get newProperties(){
        var obj=Object.assign({},this);
        var properties=this.properties;
        Object.keys(properties).forEach(element => {
			delete obj[element];
        });
        delete obj.id;
        delete obj.name;
        delete obj.scriptList;
        delete obj.tagList;
        return (obj);
    }

    addScript(script,pos){
        this.scriptList.splice(pos,0,script);
    }

    removeScript(scriptID){
        this.scriptList.splice(this.scriptList.findIndex(i=>i.id==scriptID),1);
    } 
    
} 
