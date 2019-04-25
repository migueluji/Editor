class ActorScriptsView {

    constructor() {   
		 this.html = document.createElement("div");
		 this.html.className +="actor-scripts side-sheet-content";
		 this.html.style.display="none";
		 this.html.innerHTML =
		 '<header class="mdc-top-app-bar--dense properties-bar">'+
		 '<div class="mdc-top-app-bar__row">'+
			 '<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
				 '<span class="mdc-toolbar__title">Actor Scripts</span>'+
			 '</section>'+
			 '<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
	    	 	'<button id="propertiesbutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">settings</button>'+
				'<button id="addscript" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">add_circle_outline</button>'+
				'<button id="closebutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">close</button>'+
			 '</section>'+
		 '</div>'+
		'</header>'+
		'<div class="list">'+
			'<ul class="list-bottom mdc-list  mdc-list--avatar-list"></ul>'+ 
		'</div>';
		this.html.querySelector("#propertiesbutton").addEventListener("click",Command.openActorPropertiesCmd.bind(Command));
		this.html.querySelector("#closebutton").addEventListener("click",Command.closeActorScriptsCmd.bind(Command));
		this.html.querySelector("#addscript").addEventListener("click",this.addScriptHandler.bind(this));
	}

	updateActorName(name){
		var title = this.html.querySelector(".mdc-toolbar__title");
		title.innerText=name;
	}

	addScript(scriptView,scriptPos){
		var element =this.html.querySelector(".mdc-list ");
		element.insertBefore(scriptView.html,element.childNodes[scriptPos]);
	}

	renameScript(scriptID,scriptName){
		var element =this.html.querySelector("#"+scriptID);
		element.querySelector(".mdc-list-item__text").innerText=scriptName;
	}

	updateSelectedScript(scriptID){
		var scriptSelected=this.html.querySelector(".scriptselected");
		if (scriptSelected) scriptSelected.classList.remove("scriptselected");
		this.html.querySelector("#"+scriptID).className="scriptselected";
	}

// Handlers
	addScriptHandler(){
		var sceneID=document.querySelector(".sceneselected").id;
		var actorID=document.querySelector(".actorselected").id;
		CmdManager.addScriptCmd(sceneID,actorID,this.html.querySelectorAll(".mdc-list-item__text").length);
	}

// Utils
	update(actorName,scriptList){
		this.updateActorName(actorName);
		var element =this.html.querySelector(".mdc-list "); 
		while (element.firstChild){ // elimina todos los elementos de la lista
			element.removeChild(element.firstChild);
		};
		var scriptPos=0;
		scriptList.forEach(script=>{ // añade los nuevos elementos a la lista
			scriptPos++;
			var scriptView = new ScriptView();
			scriptView.addView(script);
			this.addScript(scriptView,scriptPos);
		})
	}

}