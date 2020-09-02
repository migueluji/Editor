class SceneView {

    constructor() {
		this.html = document.createElement("li");
		this.html.setAttribute("draggable","true");
		this.html.className ="mdc-list-item mdc-ripple-upgraded"
		this.html.innerHTML =
				'<span class="mdc-list-item__ripple"></span>'+
				'<span class="mdc-list-item__graphic">'+
					'<img src="" widht="56" height="56"></img>'+
				'</span>'+
				'<span class="mdc-list-item__text"></span>'+
				'<div aria-hidden="true" class="mdc-list-item__meta">'+
					'<button id="morebutton" data-mdc-ripple-is-unbounded="" class="mdc-icon-button material-icons mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">more_vert</button>'+
					'<div style="z-index:10;position:fixed" class="mdc-menu-surface--anchor">'+
						'<div class="mdc-menu mdc-menu-surface">'+					
							'<ul class="mdc-list" role="menu" aria-hidden="true">'+
								'<li id="rename" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Rename</li>'+
								'<li id="duplicate" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Duplicate</li>'+
								'<li id="delete" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Delete</li>'+
							'</ul>'+
						'</div>'+
					'</div>'+
				'</div>';
		this.html.querySelector("#morebutton").addEventListener("click",this.menuSceneHandler.bind(this));
 		this.html.querySelector("#rename").addEventListener("click",this.renameSceneHandler.bind(this));
		this.html.querySelector('#duplicate').addEventListener("click",this.duplicateSceneHandler.bind(this));
		this.html.querySelector('#delete').addEventListener("click",this.removeSceneHandler.bind(this));
		this.html.addEventListener("dragstart",this.dragstartSceneHandler.bind(this));
		this.html.addEventListener("dragover",this.dragoverSceneHandler.bind(this));
		this.html.addEventListener("dragleave",this.dragleaveSceneHandler.bind(this));
		this.html.addEventListener("drop",this.dropSceneHandler.bind(this));
		this.html.addEventListener("click",this.selectSceneHandler.bind(this));
		this.menu = mdc.menu.MDCMenu.attachTo(this.html.querySelector('.mdc-menu'));
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
		if (scene && scene.id!=this.html.id)	Command.selectSceneCmd(this.html.id);
	}

	menuSceneHandler(){
		this.menu.open = true;
	}

	renameSceneHandler(){
		var dialog = new RenameDialogView("scene",this.html.id);
		var editorFrame=document.querySelector(".editor-frame-root");
		editorFrame.appendChild(dialog.html);
		dialog.html.querySelector("#input").focus();
	}

	duplicateSceneHandler(){
		CmdManager.duplicateSceneCmd(this.html.id);
	}

	removeSceneHandler (){
		var ul =document.querySelector("#"+this.html.id).parentNode;
		if (ul.children.length==1) alert ("This scene cannot be deleted!");
		else {
			var element =document.querySelector("#"+this.html.id);
			var text=element.querySelector(".mdc-list-item__text").innerText;
			if (confirm('Are you sure you want to delete "'+text+'" scene?'))CmdManager.removeSceneCmd(this.html.id);
		}
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
		// if(e.stopPropagation){
		// 	e.stopPropagation();
		// }
		e.preventDefault();
		var element= document.createElement("li");
		element.innerHTML=e.dataTransfer.getData('text/html');
		element=element.firstElementChild;
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


