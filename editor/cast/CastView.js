class CastView {

    constructor(cast,imageList) {   
		 this.html = document.createElement("div");
		 this.html.className +="cast side-sheet-content";
		 this.html.style.display="none";
		 this.html.innerHTML =
			'<div id="mymenu" class="mdc-menu mdc-menu-surface">'+
				'<ul id="mylist" class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">'+
						'<li id="properties" class="mdc-list-item" role="menuitem">'+
							'<span class="mdc-list-item__ripple"></span>'+
							'<span class="mdc-list-item__text">Properties</span>'+
						'</li>'+
						'<li id="scripts" class="mdc-list-item" role="menuitem">'+
							'<span class="mdc-list-item__ripple"></span>'+
							'<span class="mdc-list-item__text">Scripts</span>'+
						'</li>'+
						'<li role="separator" class="mdc-list-divider"></li>'+
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
						'<span class="mdc-toolbar__title">Cast</span>'+
					'</section>'+
					'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
						'<button id="addactor" class="mdc-icon-button material-icons mdc-top-app-bar__action-item">add_circle_outline</button>'+
						'<button id="closebutton" class="mdc-icon-button material-icons mdc-top-app-bar__action-item">close</button>'+
					'</section>'+
				'</div>'+
			'</header>'+
			'<ul id="actorlist" style="overflow:auto" class="mdc-list  mdc-list--image-list" role="listbox"></ul>'; 

		this.menu = mdc.menu.MDCMenu.attachTo(this.html.querySelector('#mymenu'));
	
		this.html.querySelector("#properties").addEventListener("click",this.propertiesActorHandler.bind(this));
		this.html.querySelector("#addactor").addEventListener("click",this.addActorHandler.bind(this));
		this.html.querySelector("#closebutton").addEventListener("click",SideSheetView.closeSheetHandler);

		this.html.querySelector("#properties").addEventListener("click",this.propertiesActorHandler.bind(this));
		this.html.querySelector("#scripts").addEventListener("click",this.scriptsActorHandler.bind(this));
		this.html.querySelector("#rename").addEventListener("click",this.renameActorHandler.bind(this));
		this.html.querySelector('#duplicate').addEventListener("click",this.duplicateActorHandler.bind(this));
		this.html.querySelector('#delete').addEventListener("click",this.removeActorHandler.bind(this));
		this.update(cast,imageList);
	}

	openActorMenu(actorID,x,y){
		this.id=actorID;
		this.menu.open=true;
		this.menu.setAbsolutePosition(x+36,y);
	}

	addActor(actorView,actorPos){
		var element =this.html.querySelector("#actorlist");
		element.insertBefore(actorView.html,element.childNodes[actorPos]);
	}

	renameActor(actorID,actorName){
		var element =this.html.querySelector("#"+actorID);
		element.querySelector(".mdc-list-item__text").innerText=actorName;
	}

	updateSelectedActor(actorID){
 		var actorSelected=this.html.querySelector(".actorselected");
		if (actorSelected) {
			actorSelected.classList.remove("actorselected");
			actorSelected.classList.remove("mdc-list-item--selected");
		} 
		if (actorID!=null && this.html.querySelector("#"+actorID)!=null) {
			this.html.querySelector("#"+actorID).classList.add("actorselected");
			this.html.querySelector("#"+actorID).classList.add("mdc-list-item--selected");
		}	
	}

// Handlers
	addActorHandler(){
		var sceneID=document.querySelector(".sceneselected").id;
		var list =this.html.querySelector("#actorlist");
		var position={"x":0,"y":0};
		CmdManager.addActorCmd(sceneID,list.childNodes.length,position);
	}

	propertiesActorHandler(){
		Command.openActorPropertiesCmd();
	}

	scriptsActorHandler(){
		Command.openActorScriptsCmd();
	}

	renameActorHandler(){
		var dialog = new RenameDialogView("actor",this.id);
		var editorFrame=document.querySelector(".editor-frame-root");
		editorFrame.appendChild(dialog.html);
		dialog.html.querySelector("input").focus();
	}

	duplicateActorHandler(){
		var sceneID=document.querySelector(".sceneselected").id;
		CmdManager.duplicateActorCmd(sceneID,this.id);
	}

	removeActorHandler(){
		var sceneID=document.querySelector(".sceneselected").id;
		var text =this.html.querySelector("#"+this.id).querySelector(".mdc-list-item__text").innerText;
		if (confirm('Are you sure you want to delete "'+text+'" actor?')){
				CmdManager.removeActorCmd(sceneID,this.id); 
		}
	}

// Utils
	update(cast,imageList){
		var element =this.html.querySelector("#actorlist"); 
		while (element.firstChild){ // remove all items from the list
			element.removeChild(element.firstChild);
		};
		if (cast) 
			cast.forEach(actor=>{ // add the new items to the list
				var actorView  = new ActorView();
				var actorData={id:actor.id,name:actor.name};
				if (!imageList.find(i=>i.name==actor.image)) actorData.image=null;
				else actorData.image=actor.image;
				actorView.addView(actorData);
				this.addActor(actorView,0);
			})
	}
}