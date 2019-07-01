class CanvasView {

    constructor() {   
		 this.html = document.createElement("div");
         this.html.className +="canvas";
         this.html.style.display="block";
         this.html.style.transform="";
         this.html.innerHTML =
            '<button id="addactor" class="do-button mdc-fab mdc-ripple-upgraded add-property-button">'+
                '<i class="material-icons">add</i>'+
            '</button>'+
            '<div class="canvas"></div>';
        this.html.querySelector("#addactor").addEventListener("click",this.addActorHandler.bind(this));
        window.addEventListener("resize",this.update.bind(this));

       var app = new PIXI.Application();
        app.renderer.backgroundColor = 0x061639;
        app.renderer.view.style.position = "absolute";
        app.renderer.view.style.display = "block";
        app.renderer.autoResize = true;
      
      //  app.renderer.resize(window.innerWidth, window.innerHeight);

        this.app=app;
        this.update();
       
		//Add the canvas that Pixi automatically created for you to the HTML document
		this.html.querySelector(".canvas").appendChild(app.view);
    }

    update(){
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }

    addActorHandler(){
        console.log("Add Actor");
    }
}
