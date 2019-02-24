class CastView {

    constructor(cast) {   
		 this.html = document.createElement("div");
		 this.html.className +="cast side-sheet-content";
		 this.html.innerHTML =
		 '<header class="mdc-top-app-bar--dense properties-bar">'+
		 '<div class="mdc-top-app-bar__row">'+
			 '<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
				 '<span class="mdc-toolbar__title">Cast</span>'+
			 '</section>'+
			 '<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
				 '<button id="closebutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="close" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">close</button>'+
			 '</section>'+
		 '</div>'+
		'</header>'+
		'<ul style="margin-bottom:56px" class="mdc-list  mdc-list--avatar-list"></ul>'+ 
		'<button id="addactor" class="mdc-fab mdc-ripple-upgraded add-property-button" aria-label="Add Scene"'+
			'style="--mdc-ripple-fg-size:33px; --mdc-ripple-fg-scale:2.70291; --mdc-ripple-fg-translate-start:5.5px, 19.6875px; --mdc-ripple-fg-translate-end:11.5px, 11.5px;">'+
				'<i class="mdc-fab__icon material-icons">add</i>'+
		'</button>';
		this.html.querySelector("#closebutton").addEventListener("click",SideSheetView.closeSheetHandler);
		this.html.querySelector("#addactor").addEventListener("click",this.addActorHandler.bind(this));
		this.selectedActor=null;
		if (cast) this.init(cast);
	}

	addActor(actorView,actorPos){
		var element =this.html.querySelector(".mdc-list ");
		element.insertBefore(actorView.html,element.childNodes[actorPos]);
	}

	removeActor(actorID){
		this.html.querySelector("#"+actorID).remove();
	}

	renameActor(actorID,actorName){
		var element =this.html.querySelector("#"+actorID);
		element.querySelector(".mdc-list-item__text").firstChild.innerText=actorName;
	}

	updateSelectedActor(actorID){
		(this.selectedActor === actorID) ? this.selectedActor=null : this.selectedActor=actorID;
		var selectedActors=this.html.querySelectorAll(".mdc-list-item--actorselected");
		selectedActors.forEach(element => {
			element.classList.remove("mdc-list-item--actorselected");
		});
		if (this.selectedActor!== null){
			var listItem=this.html.querySelector('#'+actorID).firstChild;
			listItem.className +=" mdc-list-item--actorselected";
		}
	}

// Handlers
	addActorHandler(){
		CmdManager.addActorCmd(this.html.querySelectorAll(".mdc-list-item__text").length);
	}

// Utils
	init(cast){
		var actorPos=1;
		cast.forEach(actor=>{
			var actorView = new ActorView();
			actorView.addView(actor);
			this.addActor(actorView,actorPos);
			actorPos++;
		})
		//this.updateSelectedActor(cast[0].id);
	}

}