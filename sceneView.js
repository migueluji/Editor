class SceneView {

    constructor() {
			this._html = document.createElement("div");
			this._html.setAttribute("draggable","true");
			this._html.innerHTML =
				'<li class="mdc-list-item mdc-ripple-upgraded">'+
					'<span class="mdc-list-item__graphic material-icons" aria-hidden="true">panorama_wide_angle</span>'+
					'<span class="mdc-list-item__text">'+
						'<span></span>'+
					'</span>'+
					'<button id="more" class="mdc-button mdc-list-item__meta material-icons" aria-hidden="true">more_vert</button>'+
				'</li>'+
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
			this.dragSrcEl=null;
			this.moveSceneCmd=null;
	}
	
	get html() {
		return this._html;
  	}
    
  	set html(scene) {
		this._html.id=scene.id;
		this._html.querySelector(".mdc-list-item__text").innerHTML='<span>'+scene.name+'</span>';
  	}
	
	dragstartSceneHandler(e){
		this.dragSrcEl = this._html;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/html', this._html.outerHTML);
		console.log("dragstart",e,e.srcElement.id);
		this._html.classList.add('dragElem');
	}

	dragenterSceneHandler(e){
		console.log("dragenter",e.srcElement.id);
	};

	dragoverSceneHandler(e){
		if (e.preventDefault) {
			e.preventDefault(); // Necessary. Allows us to drop.
		  }
		  this._html.classList.add('over');
		  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
		  console.log("dragover",e.srcElement.id); 
		  return false;

	};

	dragleaveSceneHandler(e){
		this._html.classList.remove("over");
		console.log("dragleave",e.srcElement.id);
	};

	dropSceneHandler(e){
		console.log("drip",e);
		if(e.stopPropagation){
			e.stopPropagation();
		}
		var element= document.createElement("div");
		element.innerHTML=e.dataTransfer.getData('text/html');
		element=element.firstElementChild;
		console.log("drop",element,this.position(this._html));
		this.moveSceneCmd(element.id,this.position(this._html));
	};

	position(element){
		console.log(element,parent);
		var parent=element.parentNode;
		var length=parent.childNodes.length;
		var child=parent.firstElementChild;
		var count=1;
		while ((child.id!=element.id) && (count <=length)){
			child=child.nextSibling;
			count++;
		}
		return count++;
	}

	dragendSceneHandler(e){
		this._html.classList.remove("over");
		console.log("dragend",e.srcElement.id);
	};
	
	dragstartSceneListener(){
		this._html.addEventListener("dragstart",this.dragstartSceneHandler.bind(this));
	}

	dragenterSceneListener(dragenterSceneHandler){
		this._html.addEventListener ("dragenter",dragenterSceneHandler);
	}

	dragoverSceneListener(dragoverSceneHandler){
		this._html.addEventListener("dragover",dragoverSceneHandler);
	}

	dragleaveSceneListener(dragleaveSceneHandler){
		this._html.addEventListener("dragleave",dragleaveSceneHandler);
	}
///////////////////////////////
	dropSceneListener(moveSceneCmd){
	//	console.log("dropSceneHandler",this.dropSceneHandler.bind(this,moveSceneCmd));
		this.moveSceneCmd=moveSceneCmd;
		this._html.addEventListener("drop",this.dropSceneHandler.bind(this));
	}
	
	dragendSceneListener(){
		this._html.addEventListener("dragend",this.dragendSceneHandler.bind(this));
	}

	menuSceneListener(menuSceneHandler){
		this._html.querySelector("#more").addEventListener("click",menuSceneHandler);
	}

	menuSceneHandler(){
		const menu = mdc.menu.MDCMenu.attachTo(this._html.querySelector('.mdc-menu'));
		menu.open = true;
	}

	duplicateSceneListener(duplicateSceneCmd){
		this._html.querySelector('#duplicate').addEventListener("click",this.duplicateSceneHandler.bind(this,duplicateSceneCmd));
	}

	duplicateSceneHandler(duplicateSceneCmd){
		duplicateSceneCmd(this._html.id);
	}

	removeSceneListener(removeSceneCmd) {
		this._html.querySelector('#delete').addEventListener("click",this.removeSceneHandler.bind(this,removeSceneCmd));
	}

	removeSceneHandler (removeSceneCmd){
		removeSceneCmd(this._html.id); 
	}

	remove() { 
	 this._html.remove();
  	}
	
	moveSceneHandler(moveSceneCmd){

		var newPos=this._html.querySelector('#position').value;
		this._html.querySelector('#position').value="";
		if (newPos !== ""){
			moveSceneCmd(this._html.id,newPos);
		}
	}
}

/*	moveSceneListener(moveSceneCmd){
		this._html.querySelector('#move').addEventListener("click",this.moveSceneHandler.bind(this,moveSceneCmd));
	}
*/	


