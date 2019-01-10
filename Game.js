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
        this.tagList=[];
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
        this.a=34;
        this.pasa=true;
    }

    get properties(){
        var obj={
            name:this.name, width:this.width, height:this.height, //settings
            play:this.play, sound:this.sound, volume:this.volume, start:this.start, pan:this.pan, loop:this.loop, //music
        }
        return(obj);
    }

    get newProperties(){
        var obj=Object.assign({},this);
        var properties=this.properties;
        Object.keys(properties).forEach(element => {
			delete obj[element];
        });
        delete obj.imageList;
        delete obj.soundList;
        delete obj.fontList;
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
    
}
