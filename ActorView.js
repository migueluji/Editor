class ActorView {

    constructor() {
		this.html = document.createElement("li");
		this.html.setAttribute("draggable","true");
		this.html.innerHTML =
			'<div class="mdc-list-item mdc-ripple-upgraded" role="option" aria-selected="false">'+
				'<span style="font-size:36px" class="mdc-list-item__graphic material-icons" aria-hidden="true">account_circle</span>'+
				'<span class="mdc-list-item__text">'+
					'<span></span>'+
				'</span>'+
				'<button id="more" class="mdc-button mdc-list-item__meta material-icons">more_vert</button>'+
			'</div>'+
			'<div class="mdc-menu-surface--anchor menu-actor">'+
				'<div class="mdc-menu mdc-menu-surface mdc-menu-surface--close" tabindex="-1">'+
					'<ul class="mdc-list" role="menu" aria-hidden="true">'+
						'<li id="properties" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Properties</li>'+
						'<li id="rules" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Rules</li>'+
						'<li class="mdc-list-divider" role="separator" tabindex="-1"></li>'+
						'<li id="rename" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Rename</li>'+
						'<li id="duplicate" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Duplicate</li>'+
						'<li id="delete" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Delete</li>'+
					'</ul>'+
				'</div>'+
			'</div>';
		this.html.querySelector("#more").addEventListener("click",this.menuActorHandler.bind(this));
		this.html.querySelector("#properties").addEventListener("click",this.propertiesActorHandler.bind(this));
		this.html.querySelector("#rename").addEventListener("click",this.renameActorHandler.bind(this));
		this.html.querySelector('#duplicate').addEventListener("click",this.duplicateActorHandler.bind(this));
		this.html.querySelector('#delete').addEventListener("click",this.removeActorHandler.bind(this));
  	this.html.addEventListener("dragstart",this.dragstartActorHandler.bind(this));
		this.html.addEventListener("dragover",this.dragoverActorHandler.bind(this));
		this.html.addEventListener("dragleave",this.dragleaveActorHandler.bind(this));
		this.html.addEventListener("drop",this.dropActorHandler.bind(this));
	  this.html.addEventListener("click",this.selectActorHandler.bind(this));

		this.menu = mdc.menu.MDCMenu.attachTo(this.html.querySelector('.mdc-menu'));
	}
   
  addView(actor) {
		this.html.id=actor.id;
		this.html.querySelector(".mdc-list-item__text").innerHTML='<span>'+actor.name+'</span>';
	}

// Handlers
	selectActorHandler(e){
			if (e.srcElement.nodeName!="LI"){ //solo selecciona el actor si se hace click fuera de la lista del menu
				Command.selectActorCmd(this.html.id);
			}
	}

	menuActorHandler(){
		this.menu.open = true;
	}

	propertiesActorHandler(){
		SideSheetView.openSheetHandler("actor-properties");
	}

	renameActorHandler(){
		var dialog = new RenameActorDialogView(this.html.id);
		var editorFrame=document.querySelector(".editor-frame-root");
		editorFrame.appendChild(dialog.html);
		dialog.html.querySelector("#actorname").focus();
	}

	duplicateActorHandler(){
		var sceneSelected=document.querySelector(".mdc-list-item--sceneselected").parentElement.id;
		CmdManager.duplicateActorCmd(sceneSelected,this.html.id);
	}

	removeActorHandler(){
		var sceneSelected=document.querySelector(".mdc-list-item--sceneselected").parentElement.id;
		var text =document.querySelector("#"+this.html.id).firstChild.firstChild.nextSibling.innerText;
		if (confirm('Are you sure you want to delete "'+text+'" actor?')){
				CmdManager.removeActorCmd(sceneSelected,this.html.id); 
		}
	}

	dragstartActorHandler(e){
		e.dataTransfer.setData('text/html', this.html.outerHTML);
	}

	dragoverActorHandler(e){
		e.preventDefault();
		this.html.classList.add('over');
	};

	dragleaveActorHandler(e){
		this.html.classList.remove("over");
	};

	dropActorHandler(e){
		if(e.stopPropagation){
			e.stopPropagation();
		}
		var element= document.createElement("div");
		element.innerHTML=e.dataTransfer.getData('text/html');
		element=element.firstElementChild;
		var sceneSelected=document.querySelector(".mdc-list-item--sceneselected").parentElement.id;
		CmdManager.moveActorCmd(sceneSelected,element.id,this.position(this.html,this.html.parentNode));
		this.html.classList.remove("over");
		if (element.querySelector(".mdc-list-item--actorselected")){
		//	Command.selectActorCmd(element.id); 
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


