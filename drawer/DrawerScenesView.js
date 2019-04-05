class DrawerScenesView {

  constructor(sceneList) {   
		this.html = document.createElement("div");
		this.html.className +="mdc-drawer__content";
		this.html.innerHTML =
			'<button id="addscene" class="mdc-fab mdc-ripple-upgraded add-scene-button">'+
					 '<i class="mdc-fab__icon material-icons">add</i>'+
			'</button>'+
			'<ul style="padding-top:32px" class="mdc-list  mdc-list--avatar-list"></ul>';
		this.html.querySelector("#addscene").addEventListener("click",this.addSceneHandler.bind(this));
		this.init(sceneList);
  }

  	addScene(sceneView,scenePos) {
		var element = this.html.querySelector(".mdc-list");
		element.insertBefore(sceneView.html,element.childNodes[scenePos]);
	}

	removeScene(sceneID){
		this.html.querySelector("#"+sceneID).remove();
	}

	renameScene(sceneID,sceneName)	{
		this.html.querySelector("#"+sceneID).querySelector(".mdc-list-item__text").innerText=sceneName;
	}

	updateSelectedScene(sceneID){
		var sceneSelected=this.html.querySelector(".sceneselected");
		if (sceneSelected) sceneSelected.classList.remove("sceneselected");
		this.html.querySelector('#'+sceneID).className = "sceneselected";
	}

//Handlers
	addSceneHandler() {
		CmdManager.addSceneCmd(this.html.querySelectorAll(".mdc-list-item__text").length);
	}

//Utilities
	init(sceneList){
		var scenePos=0;
		sceneList.forEach(scene => {
			scenePos++;
			var sceneView = new SceneView();
			sceneView.addView(scene);
			this.addScene(sceneView,scenePos);
		});	
		this.updateSelectedScene(sceneList[0].id);
	}
}
