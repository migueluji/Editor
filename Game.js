class Game {
	
    constructor(game) {
        this.name="Untitled Game";
        this.tagList=[];
        this.fontList=[];
        this.soundList=[];
        this.imageList=[];
        this.sceneList=[];
        Object.assign(this,this.properties);// init properties
        Object.assign(this,game);
        if (this.soundList) this.soundList.forEach((sound,i) => this.soundList[i]=new Object(sound));
        // fuentes fijas
        this.fontList=["Arial","Arial Black","Courier New","Georgia","Helvetica","Impact","Tahoma","Times New Roman","Verdana"];
        if (this.fontList) this.fontList.forEach((font,i) => this.fontList[i]={id:Utils.id(),name:this.fontList[i]});
        // fin fuentes fijas
        if (this.fontList) this.fontList.forEach((font,i) => this.fontList[i]=new Object(font));
        if (this.sceneList.length!=0) this.sceneList.forEach((scene,i) => this.sceneList[i]=new Scene(scene));
        else {
            var scene= new Scene({"id":Utils.id(),"name":"Scene 1","actorList":[]});
            this.sceneList.push(scene);
        }
    }

    get properties(){
        var obj={
            // Settings
            displayWidth:this.displayWidth || 800, displayHeight:this.displayHeight || 480, 
            cameraX:this.cameraX || 0, cameraY:this.cameraY || 0, cameraAngle:this.cameraAngle || 0, cameraZoom:this.cameraZoom || 1,
            backgroundColor:this.backgroundColor || "#ffffff",
            // Sound
            soundOn:this.soundOn || false, soundtrack:this.soundtrack || "", volume:this.volume || 1, start:this.start || 0, pan:this.pan || 0, loop:this.loop || false, 
            // Physics
            physicsOn:this.physicsOn || true, gravityX: this.gravityX || 0, gravityY:this.gravityY || -9.8
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
        switch (option){
            case "Sound" : this.soundList.push(asset); break;
            case "Font"  : this.fontList.push(asset); break;
            default : this.imageList.push(asset); break;
        }
    } 

    removeAsset(assetID,option) {
        switch (option){
            case "Sound" : this.soundList.splice(this.soundList.findIndex(i => i.id == assetID),1); break;
            case "Font"  : this.fontList.splice(this.fontList.findIndex(i => i.id == assetID),1); break;
            default : this.imageList.splice(this.imageList.findIndex(i => i.id == assetID),1); break;
        }
    } 


}
