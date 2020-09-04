class ScriptView {

    constructor() {
		this.html = document.createElement("li");
		this.html.setAttribute("draggable","true");
		this.html.style.height="56px";
		this.html.className ="mdc-list-item";
		this.html.innerHTML =
			'<span class="mdc-list-item__ripple"></span>'+
			'<span style="font-size: 40px;" class="mdc-list-item__graphic material-icons">code</span>'+
			'<span class="mdc-list-item__text"></span>'+
			'<div aria-hidden="true" class="mdc-list-item__meta">'+
				'<button id="morebutton" data-mdc-ripple-is-unbounded="" class="mdc-icon-button material-icons mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">more_vert</button>'+
			'</div>';

			// '<div class="mdc-list-item mdc-ripple-upgraded" role="option" aria-selected="false">'+
			// 	'<span style="font-size:36px" class="mdc-list-item__graphic material-icons" aria-hidden="true">code</span>'+
			// 	'<span class="mdc-list-item__text"></span>'+
			// 	'<button id="more" class="mdc-button mdc-list-item__meta material-icons">more_vert</button>'+
			// '</div>';

		this.html.querySelector("#morebutton").addEventListener("click",this.menuScriptHandler.bind(this));
		mdc.ripple.MDCRipple.attachTo(this.html.querySelector('#morebutton')); 
		mdc.ripple.MDCRipple.attachTo(this.html); 

		// this.html.querySelector("#rename").addEventListener("click",this.renameScriptHandler.bind(this));
		// this.html.querySelector('#duplicate').addEventListener("click",this.duplicateScriptHandler.bind(this));
		// this.html.querySelector('#delete').addEventListener("click",this.removeScriptHandler.bind(this));
		
		this.html.addEventListener("dragstart",this.dragstartScriptHandler.bind(this));
		this.html.addEventListener("dragover",this.dragoverScriptHandler.bind(this));
		this.html.addEventListener("dragleave",this.dragleaveScriptHandler.bind(this));
		this.html.addEventListener("drop",this.dropScriptHandler.bind(this));
	    this.html.addEventListener("click",this.selectScriptHandler.bind(this));

	//	this.menu = mdc.menu.MDCMenu.attachTo(this.html.querySelector('.mdc-menu'));
	}
   
  addView(script) {
		this.html.id=script.id;
		this.html.querySelector(".mdc-list-item__text").innerHTML=script.name.split("_").join(" ");
	}

// Handlers
	selectScriptHandler(e){
		//	if (e.srcElement.nodeName!="LI" && this.html.classList.contains("scriptselected")==false){
					Command.selectScriptCmd(this.html.id);
		//	}
	}

	menuScriptHandler(){
	//	this.menu.open = true;
		var button=this.html.querySelector("#morebutton");
		var position=button.getBoundingClientRect();
		Command.openActorScriptMenuCmd(this.html.id,position.x,position.y);
	}

	// renameScriptHandler(){
	// 	var dialog = new RenameDialogView("script",this.html.id);
	// 	var editorFrame=document.querySelector(".editor-frame-root");
	// 	editorFrame.appendChild(dialog.html);
	// 	dialog.html.querySelector("input").focus();
	// }

	// duplicateScriptHandler(){
	// 	var sceneSelected=document.querySelector(".sceneselected").id;
	// 	var actorSelected=document.querySelector(".actorselected").id;
	// 	CmdManager.duplicateScriptCmd(sceneSelected,actorSelected,this.html.id);
	// }

	// removeScriptHandler(){
	// 	var sceneSelected=document.querySelector(".sceneselected").id;
	// 	var actorSelected=document.querySelector(".actorselected").id;
	// 	var text =document.querySelector("#"+this.html.id).firstChild.firstChild.nextSibling.innerText;
	// 	if (confirm('Are you sure you want to delete "'+text+'" script?')){
	// 			CmdManager.removeScriptCmd(sceneSelected,actorSelected,this.html.id); 
	// 	}
	// }

	dragstartScriptHandler(e){
		e.dataTransfer.setData('text/html', this.html.outerHTML);
	}

	dragoverScriptHandler(e){
		e.preventDefault();
		this.html.classList.add('over');
	};

	dragleaveScriptHandler(e){
		this.html.classList.remove("over");
	};

	dropScriptHandler(e){
		if(e.stopPropagation){
			e.stopPropagation();
		}
		var element= document.createElement("div");
		element.innerHTML=e.dataTransfer.getData('text/html');
		element=element.firstElementChild;
		var sceneSelected=document.querySelector(".sceneselected").id;
		var actorSelected=document.querySelector(".actorselected").id;
		CmdManager.moveScriptCmd(sceneSelected,actorSelected,element.id,this.position(this.html,this.html.parentNode));
		this.html.classList.remove("over");
		if (element.querySelector(".scriptselected")){
				Command.selectScriptCmd(element.id); 
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


