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

		this.html.querySelector("#morebutton").addEventListener("click",this.menuScriptHandler.bind(this));
		mdc.ripple.MDCRipple.attachTo(this.html.querySelector('#morebutton')); 
		mdc.ripple.MDCRipple.attachTo(this.html); 
		
		this.html.addEventListener("dragstart",this.dragstartScriptHandler.bind(this));
		this.html.addEventListener("dragover",this.dragoverScriptHandler.bind(this));
		this.html.addEventListener("dragleave",this.dragleaveScriptHandler.bind(this));
		this.html.addEventListener("drop",this.dropScriptHandler.bind(this));
	    this.html.addEventListener("click",this.selectScriptHandler.bind(this));
	}
   
  addView(script) {
		this.html.id=script.id;
		this.html.querySelector(".mdc-list-item__text").innerHTML=script.name.split("_").join(" ");
	}

// Handlers
	selectScriptHandler(){
		Command.selectScriptCmd(this.html.id);
	}

	menuScriptHandler(){
		var button=this.html.querySelector("#morebutton");
		var position=button.getBoundingClientRect();
		Command.openActorScriptMenuCmd(this.html.id,position.x,position.y);
	}

	dragstartScriptHandler(e){
		e.dataTransfer.setData('text/html', this.html.outerHTML);
		var image = new Image();
		e.dataTransfer.setDragImage(image,0,0);
	}

	dragoverScriptHandler(e){
		e.preventDefault();
		this.html.classList.add('over');
	};

	dragleaveScriptHandler(e){
		this.html.classList.remove("over");
	};

	dropScriptHandler(e){
		e.preventDefault();
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


