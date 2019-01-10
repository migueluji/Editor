class SceneView {

    constructor() {
			this._html = document.createElement("li");
			this._html.setAttribute("draggable","true");
			this._html.innerHTML =
				'<div class="mdc-list-item mdc-ripple-upgraded" role="option" aria-selected="false">'+
					'<span class="mdc-list-item__graphic material-icons" aria-hidden="true">panorama_wide_angle</span>'+
					'<span class="mdc-list-item__text">'+
						'<span></span>'+
					'</span>'+
					'<button id="more" class="mdc-button mdc-list-item__meta material-icons">more_vert</button>'+
				'</div>'+
				'<div class="mdc-menu-surface--anchor menu-scene">'+
					'<div class="mdc-menu mdc-menu-surface mdc-menu-surface--close" tabindex="-1">'+
						'<ul class="mdc-list" role="menu" aria-hidden="true">'+
							'<li id="properties" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Properties</li>'+
							'<li class="mdc-list-divider" role="separator"></li>'+
							'<li id="duplicate" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Duplicate</li>'+
							'<li id="delete" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Delete</li>'+
						'</ul>'+
					'</div>'+
				'</div>';
			this._html.querySelector("#more").addEventListener("click",this.menuSceneHandler.bind(this));
			this._html.querySelector("#properties").addEventListener("click",this.propertiesSceneHandler.bind(this));
			this._html.querySelector('#duplicate').addEventListener("click",this.duplicateSceneHandler.bind(this));
			this._html.querySelector('#delete').addEventListener("click",this.removeSceneHandler.bind(this,));
			this._html.addEventListener("dragstart",this.dragstartSceneHandler.bind(this));
			this._html.addEventListener("dragover",this.dragoverSceneHandler.bind(this));
			this._html.addEventListener("dragleave",this.dragleaveSceneHandler.bind(this));
			this._html.addEventListener("drop",this.dropSceneHandler.bind(this));
			this._html.addEventListener("click",this.selectSceneHandler.bind(this));
			this._menu = mdc.menu.MDCMenu.attachTo(this._html.querySelector('.mdc-menu'));
	}
	
	get html() {
		return this._html;
  	}
    
  	addView(scene) {
		this._html.id=scene.id;
		this._html.querySelector(".mdc-list-item__text").innerHTML='<span>'+scene.name+'</span>';
	}
	  
	remove() { 
		this._html.remove();
	}

// Handlers
	selectSceneHandler(e){
		if (e.srcElement.nodeName=="DIV"){ //solo selecciona la escena si se hace click fuera del botón "more"
			Command.selectSceneCmd(this._html.id);
		}
	}

	menuSceneHandler(){
		this._menu.open = true;
	}

	propertiesSceneHandler(){
		SideSheetView.openSheetHandler(".scene-properties");
		Command.selectSceneCmd(this._html.id);
	}

	duplicateSceneHandler(){
		CmdManager.duplicateSceneCmd(this._html.id);
	}

	removeSceneHandler (){
		var text =document.querySelector("#"+this._html.id).firstChild.firstChild.nextSibling.innerText;
		if (confirm('Are you sure you want to delete "'+text+'" scene?')){
			var parent =document.querySelector("#"+this._html.id).parentNode;
			CmdManager.removeSceneCmd(this._html.id); 
			if (parent.firstChild==null){ // si no hay scenas creamos una
				CmdManager.addSceneCmd(0);
			}
		}
	}

	dragstartSceneHandler(e){
		e.dataTransfer.setData('text/html', this._html.outerHTML);
	}

	dragoverSceneHandler(e){
		e.preventDefault();
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
		CmdManager.moveSceneCmd(element.id,this._position(this._html,this._html.parentNode));
		this._html.classList.remove("over");
		if (element.querySelector(".mdc-list-item--sceneselected")){
			Command.selectSceneCmd(element.id); 
		}
	};

// Utilities
	_position(element,parent){
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


