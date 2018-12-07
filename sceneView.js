class SceneView {

    constructor() {
			this._html = document.createElement("li");
			this._html.setAttribute("draggable","true");
			this._html.innerHTML =
				'<div class="mdc-list-item mdc-ripple-upgraded">'+
					'<span class="mdc-list-item__graphic material-icons" aria-hidden="true">panorama_wide_angle</span>'+
					'<span class="mdc-list-item__text">'+
						'<span></span>'+
					'</span>'+
					'<button id="more" class="mdc-button mdc-list-item__meta material-icons" aria-hidden="true">more_vert</button>'+
				'</div>'+
				'<div class="mdc-menu-surface--anchor">'+
					'<div class="mdc-menu mdc-menu-surface mdc-menu-surface--close" tabindex="-1">'+
						'<ul class="mdc-list" role="menu" aria-hidden="true">'+
							'<li class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Properties</li>'+
							'<li class="mdc-list-divider" role="separator"></li>'+
							'<li id="duplicate" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Duplicate</li>'+
							'<li id="delete" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Delete</li>'+
						'</ul>'+
					'</div>'+
				'</div>';
			this.moveSceneCmd=null;
	}
	
	get html() {
		return this._html;
  	}
    
  	set html(scene) {
		this._html.id=scene.id;
		this._html.querySelector(".mdc-list-item__text").innerHTML='<span>'+scene.name+'</span>';
	}
	  
	remove() { 
		this._html.remove();
	}

// Listeners
	menuSceneListener(){
		this._html.querySelector("#more").addEventListener("click",this.menuSceneHandler.bind(this));
	}

	duplicateSceneListener(duplicateSceneCmd){
		this._html.querySelector('#duplicate').addEventListener("click",this.duplicateSceneHandler.bind(this,duplicateSceneCmd));
	}

	removeSceneListener(removeSceneCmd) {
		this._html.querySelector('#delete').addEventListener("click",this.removeSceneHandler.bind(this,removeSceneCmd));
	}

	dragSceneListeners(moveSceneCmd) {
		this._html.addEventListener("dragstart",this.dragstartSceneHandler.bind(this));
		this._html.addEventListener("dragover",this.dragoverSceneHandler.bind(this));
		this._html.addEventListener("dragleave",this.dragleaveSceneHandler.bind(this));
		this.moveSceneCmd=moveSceneCmd; //guardo la función para usarla en el handler
		this._html.addEventListener("drop",this.dropSceneHandler.bind(this));
	}

// Handlers
	menuSceneHandler(){
		const menu = mdc.menu.MDCMenu.attachTo(this._html.querySelector('.mdc-menu'));
		menu.open = true;
	}

	duplicateSceneHandler(duplicateSceneCmd){
		duplicateSceneCmd(this._html.id);
	}

	removeSceneHandler (removeSceneCmd){
		removeSceneCmd(this._html.id); 
	}

	dragstartSceneHandler(e){
		e.dataTransfer.setData('text/html', this._html.outerHTML);
	}

	dragoverSceneHandler(e){
		if (e.preventDefault) {
			e.preventDefault(); // Necessary. Allows us to drop.
		  }
		  this._html.classList.add('over');
	};

	dragleaveSceneHandler(e){
		this._html.classList.remove("over");
	};

	dropSceneHandler(e){
		if(e.stopPropagation){
			e.stopPropagation();
		}
		var element= document.createElement("div");
		element.innerHTML=e.dataTransfer.getData('text/html');
		element=element.firstElementChild;
		this.moveSceneCmd(element.id,this.position(this._html,this._html.parentNode)+1);
		this._html.classList.remove("over");
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
		return count;
	}
}


