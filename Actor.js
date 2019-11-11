class Actor {
	
    constructor(actor) {
        this.id=actor.id;
        this.name=actor.name;
        this.scriptList=[];
        Object.assign(this,this.properties); //inicialización de propiedades
        console.log(this.properties);
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
            color:this.color || "#ffffff", opacity: this.opacity,
            flipX:this.flipX || false , flipY:this.flipY || false ,
            scrollX:this.scrollX || 0, scrollY:this.scrollY || 0,
            tileX:this.tileX || 1, tileY:this.tileY || 1,
            // Text
            write:this.write || false, text:this.text || "",
            font:this.font || "Arial", size:this.size || 30,
            fill:this.fill || "#000000" , style:this.style || "normal" ,
            align:this.align || "left", offsetX:this.offsetX || 0,
            offsetY:this.offsetY || 0,
            // Sound
            play:this.play || false, sound:this.sound || undefined,
            start:this.start || 0, volume: this.volume,
            pan:this.pan || 0 , loop:this.loop || false,
            // Physics
            active:this.active || false, type:this.type || "Kinematic",
            fixedAngle:this.fixedAngle || false,
            velocityX:this.velocityX || 0, velocityY:this.velocityY || 0,
            angularVelocity:this.angularVelocity || 0, 
            density: this.density, friction: this.friction, restitution: this.restitution,
            dampingLinear:this.dampingLinear || 0, dampingAngular:this.dampingAngular ||  0
        }
        if (obj.opacity==undefined) obj.opacity=1;
        if (obj.volume==undefined) obj.volume=1;
        if (obj.density==undefined) obj.density=1;
        if (obj.friction==undefined) obj.friction=1;
        if (obj.restitution==undefined) obj.restitution=1;
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
