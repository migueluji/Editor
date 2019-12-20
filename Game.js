class Game {
	
    constructor(game) {
        this.name=game.name || "Untitled Game"
        this.backgroundColor=game.backgroundColor || "#ffffff";
        this.displayWidth=game.displayWidth ||  800;
        this.displayHeight=game.displayHeight || 480;
        Object.assign(this,game);
        if (this.soundList) this.soundList.forEach((sound,i) => this.soundList[i]=new Object(sound));
        // fuentes fijas
        this.fontList=["Arial","Arial Black","Courier New","Georgia","Helvetica","Impact","Tahoma","Times New Roman","Verdana"];
        if (this.fontList) this.fontList.forEach((font,i) => this.fontList[i]={"name":this.fontList[i]});
        // fin fuentes fijas
        if (this.fontList) this.fontList.forEach((font,i) => this.fontList[i]=new Object(font));
        this.sceneList.forEach((scene,i) => this.sceneList[i]=new Scene(scene));
    }

    get properties(){
        var obj={
            // Settings
            displayWidth:this.displayWidth, displayHeight:this.displayHeight, 
            cameraX:this.cameraX, cameraY:this.cameraY, cameraAngle:this.cameraAngle, cameraZoom:this.cameraZoom,
            backgroundColor:this.backgroundColor,
            // Sound
            soundOn:this.soundOn, soundtrack:this.soundtrack, volume:this.volume, start:this.start, pan:this.pan, loop:this.loop, 
            // Physics
            physicsOn:this.physicsOn, gravityX: this.gravityX, gravityY:this.gravityY
        }
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
            fps:null,
            time:null,
            exit:false,
            currentScene:null,
            currentSceneNumber:0,
            deltaTime:null,
            mouseX:null,
            mouseY:null,
            accelerationX:null,
            accelerationY:null,
            accelerationZ:null,
            latitude:null,
            longitude:null
        }
        return(obj);
    }

    addScene(scene,pos) {
        this.sceneList.splice(pos,0,scene);
    }
    
    removeScene(sceneID) {
        this.sceneList.splice(this.sceneList.findIndex(i => i.id == sceneID),1);
    } 
    
    addAsset(asset,option) {
        var assetList=[];
        switch (option){
            case "Image" : assetList=this.imageList; break;
            case "Sound" : assetList=this.soundList; break;
            case "Font"  : assetList=this.fontList; break;
        }
        assetList.push(asset);
    } 

    removeAsset(assetID,option) {
        var assetList=[];
        switch (option){
            case "Image" : assetList=this.imageList; break;
            case "Sound" : assetList=this.soundList; break;
            case "Font"  : assetList=this.fontList; break;
        }
        assetList.splice(assetList.findIndex(i => i.id == assetID),1);
    } 


}
