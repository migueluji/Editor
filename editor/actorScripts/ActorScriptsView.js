class ActorScriptsView {

    constructor() {   
		 this.html = document.createElement("div");
		 this.html.className +="actor-scripts side-sheet-content";
		 this.html.style.display="none";
		 this.html.innerHTML =
			'<div id="mymenu" class="mdc-menu mdc-menu-surface">'+
				'<ul id="mylist" class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">'+
						'<li id="rename" class="mdc-list-item" role="menuitem">'+
							'<span class="mdc-list-item__ripple"></span>'+
							'<span class="mdc-list-item__text">Rename</span>'+
						'</li>'+
						'<li id="duplicate" class="mdc-list-item" role="menuitem">'+
							'<span class="mdc-list-item__ripple"></span>'+
							'<span class="mdc-list-item__text">Duplicate</span>'+
						'</li>'+
						'<li id="delete" class="mdc-list-item" role="menuitem">'+
							'<span class="mdc-list-item__ripple"></span>'+
							'<span class="mdc-list-item__text">Delete</span>'+
						'</li>'+
					'</li>'+
				'</ul>'+
			'</div>'+

			'<header class="mdc-top-app-bar--dense properties-bar">'+
				'<div style="z-index:1" class="mdc-elevation--z1 mdc-top-app-bar__row">'+
					'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
						'<span class="mdc-toolbar__title clip-text">Actor Scripts</span>'+
					'</section>'+
					'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
						'<button id="propertiesbutton"  class="mdc-icon-button material-icons mdc-top-app-bar__action-item">settings</button>'+
						'<button id="addscript" class="mdc-icon-button material-icons mdc-top-app-bar__action-item">add_circle_outline</button>'+
						'<button id="closebutton" class="mdc-icon-button material-icons mdc-top-app-bar__action-item">close</button>'+
					'</section>'+
				'</div>'+
			'</header>'+
			'<ul id="scriptlist" style="overflow:auto" class="list-bottom mdc-list  mdc-list--avatar-list"></ul>';
		
		this.menu = mdc.menu.MDCMenu.attachTo(this.html.querySelector('#mymenu'));

		this.html.querySelector("#propertiesbutton").addEventListener("click",Command.openActorPropertiesCmd.bind(Command));
		this.html.querySelector("#addscript").addEventListener("click",this.addScriptHandler.bind(this));
		this.html.querySelector("#closebutton").addEventListener("click",Command.closeActorScriptsCmd.bind(Command));

		this.html.querySelector("#rename").addEventListener("click",this.renameScriptHandler.bind(this));
		this.html.querySelector('#duplicate').addEventListener("click",this.duplicateScriptHandler.bind(this));
		this.html.querySelector('#delete').addEventListener("click",this.removeScriptHandler.bind(this));
	}

	openActorScriptMenu(scriptID,x,y){
		this.id=scriptID;
		this.menu.open=true;
		this.menu.setAbsolutePosition(x+36,y);
	}

	updateActorName(name){
		var title = this.html.querySelector(".mdc-toolbar__title");
		title.innerText=name.split("_").join(" ");
	}

	addScript(scriptView,scriptPos){
		var element =this.html.querySelector("#scriptlist");
		element.insertBefore(scriptView.html,element.childNodes[scriptPos]);
	}

	renameScript(scriptID,scriptName){
		var element =this.html.querySelector("#"+scriptID);
		element.querySelector(".mdc-list-item__text").innerText=scriptName;
	}

	updateSelectedScript(scriptID){
		var scriptSelected=this.html.querySelector(".scriptselected");
		if (scriptSelected) {
			scriptSelected.classList.remove("scriptselected");
			scriptSelected.classList.remove("mdc-list-item--selected");
		}
		this.html.querySelector("#"+scriptID).classList.add("scriptselected");
		this.html.querySelector("#"+scriptID).classList.add("mdc-list-item--selected");
	}

// Handlers
	addScriptHandler(){
		var sceneID=document.querySelector(".sceneselected").id;
		var actorID=document.querySelector(".actorselected").id;
		var list=this.html.querySelector("#scriptlist");
		CmdManager.addScriptCmd(sceneID,actorID,list.childNodes.length);
	}

	renameScriptHandler(){
		var dialog = new RenameDialogView("script",this.id);
		var editorFrame=document.querySelector(".editor-frame-root");
		editorFrame.appendChild(dialog.html);
		dialog.html.querySelector("input").focus();
	}

	duplicateScriptHandler(){
		var sceneSelected=document.querySelector(".sceneselected").id;
		var actorSelected=document.querySelector(".actorselected").id;
		CmdManager.duplicateScriptCmd(sceneSelected,actorSelected,this.id);
	}

	removeScriptHandler(){
		var sceneSelected=document.querySelector(".sceneselected").id;
		var actorSelected=document.querySelector(".actorselected").id;
		var text =document.querySelector("#"+this.id).querySelector(".mdc-list-item__text").innerText;
		if (confirm('Are you sure you want to delete "'+text+'" script?')){
				CmdManager.removeScriptCmd(sceneSelected,actorSelected,this.id); 
		}
	}

// Utils
	update(actorName,scriptList){
		this.updateActorName(actorName);
		var element =this.html.querySelector("#scriptlist"); 
		while (element.firstChild){ // remove all items from the list
			element.removeChild(element.firstChild);
		};
		var scriptPos=0;
		scriptList.forEach(script=>{ // add the new items to the list
			scriptPos++;
			var scriptView = new ScriptView();
			scriptView.addView(script);
			this.addScript(scriptView,scriptPos);
		})
	}

}