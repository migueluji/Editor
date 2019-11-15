class Game {
	
    constructor(game) {
        this.name=game.name || "Untitled Game"
        this.backgroundColor=game.backgroundColor || "#ffffff";
        this.width=game.width ||  800;
        this.height=game.height || 480;
        Object.assign(this,game);
        if (this.soundList) this.soundList.forEach((sound,i) => this.soundList[i]=new Asset(sound));
        if (this.fontList) this.fontList.forEach((font,i) => this.fontList[i]=new Asset(font));
        this.sceneList.forEach((scene,i) => this.sceneList[i]=new Scene(scene));
    }

    get properties(){
        var obj={
            // Settings
            width:this.width, height:this.height, 
            cameraX:this.cameraX, cameraY:this.cameraY, cameraAngle:this.cameraAngle, cameraZoom:this.cameraZoom,
            backgroundColor:this.backgroundColor,
            // Sound
            play:this.play, sound:this.sound, volume:this.volume, start:this.start, pan:this.pan, loop:this.loop, 
            // Physics
            active:this.active, gravityX: this.gravityX, gravityY:this.gravityY
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

    addScene(scene,pos) {
        this.sceneList.splice(pos,0,scene);
    }
    
    removeScene(sceneID) {
        this.sceneList.splice(this.sceneList.findIndex(i => i.id == sceneID),1);
    } 
    
    addSound(sound) {
        this.soundList.push(sound);
    } 

    removeSound(soundID) {
        this.soundList.splice(this.soundList.findIndex(i => i.id == soundID),1);
    } 

    addImage(image) {
        this.imageList.push(image);
    } 

    removeImage(imageID) {
        this.imageList.splice(this.imageList.findIndex(i => i.id == imageID),1);
    } 

    addFont(font) {
        this.fontList.push(font);
    } 

    removeFont(fontID) {
        this.fontList.splice(this.fontList.findIndex(i => i.id == fontID),1);
    } 
}
