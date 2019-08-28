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
        this.update(game);
    }

    init(game){
        this.app = new PIXI.Application();
        this.app.renderer.backgroundColor = 0x061639;
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block"; 
        this.html.appendChild(this.app.view);

        const loader = new PIXI.Loader("./images",game.imageList.length);
        loader.add(game.imageList);
        loader.load();
        loader.onLoad.add((loader,resource) => console.log(resource.name, " loaded"));

    }



    update(game){
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        game.sceneList[0].actorList.forEach(actor => {
            console.log(actor,PIXI.Texture);
            var sprite= new PIXI.Sprite(game.imageList[0].texture);
            this.app.stage.addChild(sprite);
        });
    }

    addActorHandler(){
        console.log("Add Actor");
    }
}
