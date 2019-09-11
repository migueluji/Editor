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
        var drawerApp=document.querySelector(".mdc-drawer-app-content");
       
        console.log("UPDATE CANVAS",drawerApp.getBoundingClientRect().x);
        var offsetX=-drawerApp.getBoundingClientRect().x;
    
        this.app.stage.removeChildren(); // se eliminan todos los objetos
        var width=window.innerWidth;
        var height=window.innerHeight;
        this.app.renderer.resize(width,height);
        console.log(this.html.clientWidth, this.html.clientHeight, " -- ", window.innerWidth, window.innerHeight);

        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xDDDDDD, 1);
        var centerX = width/2.0;
        var centerY = height/2.0;
        graphics.drawRect(offsetX+centerX-this.game.width/2.0,centerY-this.game.height/2.0,this.game.width,this.game.height);
//        console.log("CENTRO",baseWidth,baseHeight);
        this.app.stage.addChild(graphics);

        var scenePos=this.game.sceneList.findIndex(i => i.id == sceneID);
        this.game.sceneList[scenePos].actorList.forEach(actor => {
            if (actor.image!=undefined){
                var texture = this.loader.resources[actor.image].texture;
                var sprite= new PIXI.Sprite(texture);
                sprite.x=offsetX+centerX+actor.x-actor.width/2.0;
                sprite.y=centerY-actor.y-actor.height/2.0;
                console.log(sprite.x,sprite.y,sprite.texture);
                this.app.stage.addChild(sprite); 
            } 
        });
    }

    addActorHandler(){
        console.log("Add Actor");
    }
}
