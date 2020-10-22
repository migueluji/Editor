class Game {
	
    constructor(game) {
        this.name="Untitled Game";
        Object.assign(this,this.properties);// init properties
        this.tagList=[];
        this.imageList=[];
        this.fontList=[];
        this.soundList=[];
        this.sceneList=[];
        Object.assign(this,game);
        if (this.imageList) this.imageList.forEach((image,i) => this.imageList[i]=new Object({"id":Utils.id(),"name":image.name}));
        if (this.soundList) this.soundList.forEach((sound,i) => this.soundList[i]=new Object({"id":Utils.id(),"name":sound.name}));
        // fuentes fijas
        this.fontList=["Arial","Arial Black","Courier New","Georgia","Helvetica","Impact","Tahoma","Times New Roman","Verdana"];
        if (this.fontList) this.fontList.forEach((font,i) => this.fontList[i]={"id":Utils.id(),"name":font});
        // fin fuentes fijas
        if (this.fontList) this.fontList.forEach((font,i) => this.fontList[i]=new Object(font));
        if (this.sceneList.length!=0) this.sceneList.forEach((scene,i) => this.sceneList[i]=new Scene(scene));
        else {
            var scene= new Scene({"id":Utils.id(),"name":"Scene_1","actorList":[]});
            this.sceneList.push(scene);
        }
    }

    get properties(){
        var obj={
            // Settings
            displayWidth:this.displayWidth || 800, displayHeight:this.displayHeight || 480, 
            cameraX:this.cameraX || 0, cameraY:this.cameraY || 0, cameraAngle:this.cameraAngle || 0, cameraZoom:this.cameraZoom,
            backgroundColor:this.backgroundColor || "#ffffff",
            // Sound
            soundOn:this.soundOn || false, soundtrack:this.soundtrack || "", volume:this.volume || 1, start:this.start || 0, pan:this.pan || 0, loop:this.loop || false, 
            // Physics
            physicsOn:this.physicsOn || true, gravityX: this.gravityX || 0, gravityY:this.gravityY || -9.8
        }
        if(obj.cameraZoom==undefined) obj.cameraZoom=1;
        return(obj);
    }

    get newProperties(){
        var obj=Object.assign({},this);
        var properties=this.properties;
        Object.keys(properties).forEach(element => {
			delete obj[element];
        });
        delete obj.name;
        delete obj.imageList; delete obj.soundList;  delete obj.fontList;
        delete obj.sceneList;
        delete obj.tagList;
        return (obj);
    }

    get inputProperties(){
        var obj={
            FPS:0,
            time:0,
            exit:false,
            currentScene:"",
            currentSceneNumber:0,
            deltaTime:0,
            mouseX:0,
            mouseY:0,
            accelerationX:0,
            accelerationY:0,
            accelerationZ:0,
            latitude:0,
            longitude:0
        }
        return(obj);
    }

    get allProperties(){
        var obj=Object.assign({},this.properties);
        obj=Object.assign(obj,this.newProperties);
        obj=Object.assign(obj,this.inputProperties);
        return(obj);
    }

    addScene(scene,pos) {
        this.sceneList.splice(pos,0,scene);
    }
    
    removeScene(sceneID) {
        this.sceneList.splice(this.sceneList.findIndex(i => i.id == sceneID),1);
    } 
    
    addAsset(asset,type) {
        switch (type){
            case "Sound" : this.soundList.push(asset); break;
            case "Font"  : this.fontList.push(asset); break;
            default : this.imageList.push(asset); break;
        }
    } 

    removeAsset(assetID,type) {
        switch (type){
            case "Sound" : this.soundList.splice(this.soundList.findIndex(i => i.id == assetID),1); break;
            case "Font"  : this.fontList.splice(this.fontList.findIndex(i => i.id == assetID),1); break;
            default : this.imageList.splice(this.imageList.findIndex(i => i.id == assetID),1); break;
        }
    } 


}
