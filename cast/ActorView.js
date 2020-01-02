class ActorView {

    constructor() {
		this.html = document.createElement("li");
		this.html.setAttribute("draggable","true");
		this.html.innerHTML =
			'<div class="mdc-list-item mdc-ripple-upgraded" role="option" aria-selected="false">'+
				'<span style="font-size:36px" class="mdc-list-item__graphic material-icons" aria-hidden="true">account_circle</span>'+
				'<span class="mdc-list-item__text"></span>'+
				'<button id="more" class="mdc-button mdc-list-item__meta material-icons">more_vert</button>'+
			'</div>'+
			'<div class="mdc-menu-surface--anchor menu-actor">'+
				'<div class="mdc-menu mdc-menu-surface mdc-menu-surface--close" tabindex="-1">'+
					'<ul class="mdc-list" role="menu" aria-hidden="true">'+
						'<li id="properties" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Properties</li>'+
						'<li id="scripts" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Scripts</li>'+
						'<li class="mdc-list-divider" role="separator" tabindex="-1"></li>'+
						'<li id="rename" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Rename</li>'+
						'<li id="duplicate" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Duplicate</li>'+
						'<li id="delete" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Delete</li>'+
					'</ul>'+
				'</div>'+
			'</div>';
		this.html.querySelector("#more").addEventListener("click",this.menuActorHandler.bind(this));
		this.html.querySelector("#properties").addEventListener("click",this.propertiesActorHandler.bind(this));
		this.html.querySelector("#scripts").addEventListener("click",this.scriptsActorHandler.bind(this));
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
		this.html.querySelector(".mdc-list-item__text").innerHTML=actor.name.split("_").join(" ");
		if (actor.image){// miodifica el icono por defecto por la imagen del actor
			var span=this.html.querySelector(".mdc-list-item__graphic");
			span.innerHTML="";
			var image=document.createElement("IMG");
			image.classList="mdc-list-item__graphic material-icons";
			image.style="position:absolute;width:36px;height:auto;border-radius:unset";
			image.src="./images/"+actor.image;
			span.appendChild(image);
		}
	}

// Handlers
	selectActorHandler(e){
		if (e.srcElement.nodeName!="LI") {//solo selecciona el actor si se hace click fuera de la lista del menu
			if(this.html.classList.contains("actorselected")){
				(e.srcElement.nodeName!="BUTTON") ? Command.selectActorCmd(null): false;
			} 
			else{
				Command.selectActorCmd(this.html.id);
			}
		}
	}

	menuActorHandler(e){
		e.preventDefault();
		this.menu.open = true;
	}

	propertiesActorHandler(){
		Command.openActorPropertiesCmd();
	}

	scriptsActorHandler(){
		Command.openActorScriptsCmd();
	}

	renameActorHandler(){
		var dialog = new RenameDialogView("actor",this.html.id);
		var editorFrame=document.querySelector(".editor-frame-root");
		editorFrame.appendChild(dialog.html);
		dialog.html.querySelector("input").focus();
	}

	duplicateActorHandler(){
		var sceneID=document.querySelector(".sceneselected").id;
		CmdManager.duplicateActorCmd(sceneID,this.html.id);
	}

	removeActorHandler(){
		var sceneID=document.querySelector(".sceneselected").id;
		var text =document.querySelector("#"+this.html.id).firstChild.firstChild.nextSibling.innerText;
		if (confirm('Are you sure you want to delete "'+text+'" actor?')){
				CmdManager.removeActorCmd(sceneID,this.html.id); 
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
		var sceneSelected=document.querySelector(".sceneselected").id;
		console.log(sceneSelected,element.id,this.position(this.html,this.html.parentNode));
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


