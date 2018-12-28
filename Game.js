class Game {
	
    constructor(gameData) {
        this.name = "Mario Car";
        this.width= 800;
        this.height= 640;
        this.play= false;
        this.sound= "sound.mp4";
        this.volume= 1;
        this.start=  0;
        this.pan= 0;
        this.loop= false;
        this.newProperties=[];
        this.imageList=[];
        this.soundList=[];
        this.fontList=[];
        this.sceneList=[    
                            {
                                "id": "id1234567890000",
                                "name": "Start",
                            },
                            {
                                "id": "id1234567890001",
                                "name":"End",
                            }
                        ];
    }

    get properties(){
        var obj={
            name:this.name, width:this.width, height:this.height, //settings
            play:this.play, sound:this.sound, volume:this.volume, start:this.start, pan:this.pan, loop:this.loop, //music
        }
        return(obj);
    }

    addScene(scene,pos) {
        this.sceneList.splice(pos,0,scene);
    }
    
    removeScene(sceneID) {
        this.sceneList.splice(this.sceneList.findIndex(i => i.id == sceneID),1);
    } 
    
}
