class SceneView {

    constructor() {
		this.html = document.createElement("li");
		this.html.setAttribute("draggable","true");
		this.html.className ="mdc-list-item"
		this.html.innerHTML =
				'<span class="mdc-list-item__ripple"></span>'+
				'<span class="mdc-list-item__graphic">'+
					'<img style="border: 1px solid lightgray;" src="" widht="56" height="56"></img>'+
				'</span>'+
				'<span class="mdc-list-item__text"></span>'+
				'<div aria-hidden="true" class="mdc-list-item__meta">'+
					'<button id="morebutton" data-mdc-ripple-is-unbounded="" class="mdc-icon-button material-icons mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">more_vert</button>'+
				'</div>';
		this.html.addEventListener("click",this.selectSceneHandler.bind(this));
		this.html.querySelector("#morebutton").addEventListener("click",this.menuSceneHandler.bind(this));
		this.html.addEventListener("dragstart",this.dragstartSceneHandler.bind(this));
		this.html.addEventListener("dragover",this.dragoverSceneHandler.bind(this));
		this.html.addEventListener("dragleave",this.dragleaveSceneHandler.bind(this));
		this.html.addEventListener("drop",this.dropSceneHandler.bind(this));
		
		mdc.ripple.MDCRipple.attachTo(this.html.querySelector('#morebutton')); 
		mdc.ripple.MDCRipple.attachTo(this.html); 
	}
    
  addView(scene) {
		this.html.id=scene.id;
		this.html.querySelector(".mdc-list-item__text").innerHTML=scene.name.split("_").join(" ");
	}
	  
// Handlers
	selectSceneHandler(e){
		var scene=document.querySelector(".sceneselected");
		if (scene && scene.id!=this.html.id && e.target.id!="delete") Command.selectSceneCmd(this.html.id); // delete, to avoid select when the delete option is pressed
	}

	menuSceneHandler(){
		var button=this.html.querySelector("#morebutton");
		var position=button.getBoundingClientRect();
		Command.openSceneMenuCmd(this.html.id,position.x,position.y);
	}

	dragstartSceneHandler(e){
		e.dataTransfer.setData('text/html', this.html.outerHTML);
		var image = new Image();
		e.dataTransfer.setDragImage(image,0,0);
	}

	dragoverSceneHandler(e){
		e.preventDefault();
		this.html.classList.add('over');
	};

	dragleaveSceneHandler(e){
		this.html.classList.remove("over");
	};

	dropSceneHandler(e){
		e.preventDefault();
		var element= document.createElement("li");
		element.innerHTML=e.dataTransfer.getData('text/html');
	//	element=element.firstElementChild;
		element=element.querySelector(".mdc-list-item");
		CmdManager.moveSceneCmd(element.id,this.position(this.html,this.html.parentNode));
		this.html.classList.remove("over");
		if (element.querySelector(".sceneselected")){
			Command.selectSceneCmd(element.id); 
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
		return count++;
	}
}