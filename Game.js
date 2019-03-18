class Game {
	
    constructor(game) {
        Object.assign(this,game);
        if (this.soundList) this.soundList.forEach((sound,i) => this.soundList[i]=new Asset(sound));
        if (this.imageList) this.imageList.forEach((image,i) => this.imageList[i]=new Asset(image));
        if (this.fontList) this.fontList.forEach((font,i) => this.fontList[i]=new Asset(font));
        this.sceneList.forEach((scene,i) => this.sceneList[i]=new Scene(scene));
    }

    get properties(){
        var obj={
            // Settings
            name:this.name, width:this.width, height:this.height, 
            cameraX:this.cameraX, cameraY:this.cameraY, cameraRotation:this.cameraRotation, cameraZoom:this.cameraZoom,
            // Sound
            play:this.play, sound:this.sound, volume:this.volume, start:this.start, pan:this.pan, loop:this.loop, 
            // Physics
            physics:this.physics, gravityX: this.gravityX, gravityY:this.gravityY
        }
        return(obj);
    }

    get newProperties(){
        var obj=Object.assign({},this);
        var properties=this.properties;
        Object.keys(properties).forEach(element => {
			delete obj[element];
        });
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
}

 /*     this.name           = game.name             || "New Game";  
        this.width          = game.width            || 800;         
        this.height         = game.height           || 480;         
        this.cameraX        = game.cameraX          || 0;           
        this.cameraY        = game.cameraY          || 0;           
        this.cameraRotation = game.cameraRotation   || 0;           
        this.cameraZoom     = game.cameraZoom       || 1;          
        this.play           = game.play             || false;       
        this.sound          = game.sound            || "Undefined"; 
        this.volume         = game.volume           || 1;           
        this.start          = game.start            || 0;          
        this.pan            = game.pan              || 0;          
        this.loop           = game.loop             || false;       
        this.physics        = game.physics          || false;       
        this.gravityX       = game.gravityX         || 0.0;         
        this.gravityY       = game.gravityY         || -9.8;        
        this.tagList = [];
        this.imageList = [];
        this.soundList = [];
        this.fontList = [];
        this.sceneList =[]; */   
