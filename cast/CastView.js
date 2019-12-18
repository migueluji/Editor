class CastView {

    constructor(cast) {   
		 this.html = document.createElement("div");
		 this.html.className +="cast side-sheet-content";
		 this.html.style.display="none";
		 this.html.innerHTML =
		 '<header class="mdc-top-app-bar--dense properties-bar">'+
		 '<div class="mdc-top-app-bar__row">'+
			'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
				 '<span class="mdc-toolbar__title">Cast</span>'+
			 '</section>'+
			'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
		 		'<button id="addactor" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">add_circle_outline</button>'+
				'<button id="closebutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">close</button>'+
			 '</section>'+
		 '</div>'+
		'</header>'+
		'<div class="list">'+
			'<ul class="list-bottom mdc-list  mdc-list--avatar-list"></ul>'+ 
		'</div>';
		this.html.querySelector("#closebutton").addEventListener("click",SideSheetView.closeSheetHandler);
		this.html.querySelector("#addactor").addEventListener("click",this.addActorHandler.bind(this));
		this.update(cast);
	}

	addActor(actorView,actorPos){
		var element =this.html.querySelector(".mdc-list ");
		element.insertBefore(actorView.html,element.childNodes[actorPos]);
	}

	renameActor(actorID,actorName){
		var element =this.html.querySelector("#"+actorID);
		element.querySelector(".mdc-list-item__text").innerText=actorName;
	}

	updateSelectedActor(actorID){
		var actorSelected=this.html.querySelector(".actorselected");
		if (actorSelected)  actorSelected.classList.remove("actorselected");
		if (actorID!=null && this.html.querySelector("#"+actorID)!=null)  this.html.querySelector("#"+actorID).className = "actorselected";
	}

// Handlers
	addActorHandler(){
		var sceneID=document.querySelector(".sceneselected").id;
		CmdManager.addActorCmd(sceneID,this.html.querySelectorAll(".mdc-list-item__text").length);
	}

// Utils
	update(cast){
		var element =this.html.querySelector(".mdc-list "); 
		while (element.firstChild){ // elimina todos los elementos de la lista
			element.removeChild(element.firstChild);
		};
		cast.forEach(actor=>{ // añade los nuevos elementos a la lista
			var actorView = new ActorView();
			actorView.addView(actor);
			this.addActor(actorView,0);
		})
	}
}