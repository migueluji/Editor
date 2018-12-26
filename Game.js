class Game {
	
    constructor(gameData) {
        this.name = "Mario Car";
        this.width= 800;
        this.height= 640;
        this.initialScene= "Scene 1";
        this.play= false;
        this.sound= "sound.mp4";
        this.volume= 1;
        this.start=  0;
        this.pan= 0;
        this.loop= true;

        this.sceneList=
            [{
                "id": "id1234567890000",
                "name": "Start",
            },
            {
                "id": "id1234567890001",
                "name":"End",
            }
        ];
       
    }

    addScene(scene,pos) {
        this.sceneList.splice(pos,0,scene);
    }
    
    removeScene(sceneID) {
        this.sceneList.splice(this.sceneList.findIndex(i => i.id == sceneID),1);
    } 
    
}
