class CanvasView {

    constructor(game) {  
        this.game=game; 
		this.html = document.createElement("div");
        this.html.className +="canvas";
        this.html.style.display="block";
        this.html.style.transform="";
        this.html.innerHTML =
            '<button id="addactor" class="do-button mdc-fab mdc-ripple-upgraded add-property-button">'+
                '<i class="material-icons">add</i>'+
            '</button>';
        this.html.querySelector("#addactor").addEventListener("click",this.addActorHandler.bind(this));
        window.addEventListener("resize",this.update.bind(this));
       
        this.init(game);  
    }

    init(){
        this.app = new PIXI.Application();
        this.app.renderer.backgroundColor = 0x061639;
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block"; 
        this.html.appendChild(this.app.view);

        this.loader = new PIXI.Loader("./images",this.game.imageList.length);
        this.loader.add(this.game.imageList);
        this.loader.onLoad.add((loader,resource) => {
            console.log(resource.name, " loaded");
        });
        this.loader.load((loader, resources)=>{
            console.log("Load finished!");
            this.update(); 
        });
 
    }

    update(){
        
        var sceneID=document.querySelector(".sceneselected").id;
        var drawer=document.querySelector(".mdc-drawer");
        console.log("UPDATE CANVAS",drawer.clientWidth);
        var offset=0;
        (drawer.clientWidth>0) ? offset=drawer.clientWidth : offset=0;

        this.app.stage.removeChildren(); // se eliminan todos los objetos
        var width=this.html.clientWidth;
        var height=this.html.clientHeight;
        this.app.renderer.resize(window.innerWidth,window.innerHeight);
  //      this.app.renderer.resize(width,height);
        console.log(width, height, " -- ", window.innerWidth, window.innerHeight);

        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xDDDDDD, 1);
        var baseWidth = width/2-this.game.width/2.0;
        var baseHeight =height/2-this.game.height/2;
        graphics.drawRect(offset+baseWidth,baseHeight,this.game.width,this.game.height);
        this.app.stage.addChild(graphics);

        var scenePos=this.game.sceneList.findIndex(i => i.id == sceneID);
        this.game.sceneList[scenePos].actorList.forEach(actor => {
            if (actor.image!=undefined){
                var texture = this.loader.resources[actor.image].texture;
                var sprite= new PIXI.Sprite(texture);
                sprite.x= offset+width/2-actor.width/2+actor.x;
                sprite.y=height/2-actor.height/2-actor.y;
                this.app.stage.addChild(sprite); 
            } 
        });
    }

    addActorHandler(){
        console.log("Add Actor");
    }
}
