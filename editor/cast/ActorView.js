class ActorView {

    constructor() {
		this.html = document.createElement("li");
		this.html.setAttribute("draggable","true");
		this.html.style.height="56px";
		this.html.className ="mdc-list-item";
		this.html.innerHTML =
			'<span class="mdc-list-item__ripple"></span>'+
			'<span style="font-size: 40px;" class="mdc-list-item__graphic material-icons">account_circle</span>'+
			'<span class="mdc-list-item__text"></span>'+
			'<div aria-hidden="true" class="mdc-list-item__meta">'+
				'<button id="morebutton" data-mdc-ripple-is-unbounded="" class="mdc-icon-button material-icons mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">more_vert</button>'+
			'</div>';

		mdc.ripple.MDCRipple.attachTo(this.html.querySelector('#morebutton')); 
		mdc.ripple.MDCRipple.attachTo(this.html); 

		this.html.querySelector("#morebutton").addEventListener("click",this.menuActorHandler.bind(this));
		this.html.addEventListener("dragstart",this.dragstartActorHandler.bind(this));
		this.html.addEventListener("dragover",this.dragoverActorHandler.bind(this));
		this.html.addEventListener("dragleave",this.dragleaveActorHandler.bind(this));
		this.html.addEventListener("drop",this.dropActorHandler.bind(this));
		this.html.addEventListener("click",this.selectActorHandler.bind(this));
	}
   
  	addView(actor) {
		this.html.id=actor.id;
		this.html.querySelector(".mdc-list-item__text").innerHTML=actor.name.split("_").join(" ");
		if (actor.image){// change the default image to the actor image 
			var span=this.html.querySelector(".mdc-list-item__graphic");
			span.innerHTML="";
			var image = new Image();
			image.style="width:40px;height:40px;object-fit:contain";
			image.src=app.serverGamesFolder+"/"+app.gameFolder+"/images/"+actor.image;
			span.appendChild(image);
		}
	}

// Handlers
	selectActorHandler(e){
		Command.selectActorCmd(this.html.id);
	}

	menuActorHandler(){
		var button=this.html.querySelector("#morebutton");
		var position=button.getBoundingClientRect();
		Command.openActorMenuCmd(this.html.id,position.x,position.y);
	}

	dragstartActorHandler(e){
		e.dataTransfer.setData('text/html', this.html.outerHTML);
		var image = new Image();
		e.dataTransfer.setDragImage(image,0,0);
	}

	dragoverActorHandler(e){
		e.preventDefault();
		this.html.classList.add('over');
	};

	dragleaveActorHandler(e){
		this.html.classList.remove("over");
	};

	dropActorHandler(e){
		e.preventDefault();
		var element= document.createElement("div");
		element.innerHTML=e.dataTransfer.getData('text/html');
		//element=element.firstElementChild;
		element=element.querySelector(".mdc-list-item");
		var sceneSelected=document.querySelector(".sceneselected").id;
		CmdManager.moveActorCmd(sceneSelected,element.id,this.position(this.html,this.html.parentNode));
		this.html.classList.remove("over");
		if (element.querySelector(".actorselected")){
				Command.selectActorCmd(element.id); 
		}
	};

// Utilities
	position(element,parent){
		var count=-1;
		var child=parent.firstChild;
		if (child) {
			var length=parent.childNodes.length;
			count=1;
			while ((child.id!=element.id) && (count <=length)){
				child=child.nextSibling;
				count++;
			}
		}
		return length-count+1;
	}
}


