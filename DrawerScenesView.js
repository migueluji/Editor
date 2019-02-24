class DrawerScenesView {

  constructor(sceneList) {   
		this.html = document.createElement("div");
		this.html.className +="mdc-drawer__content";
		this.html.innerHTML =
			'<button id="addscene" class="mdc-fab mdc-ripple-upgraded add-scene-button" aria-label="Add Scene"'+
				 'style="--mdc-ripple-fg-size:33px; --mdc-ripple-fg-scale:2.70291; --mdc-ripple-fg-translate-start:5.5px, 19.6875px; --mdc-ripple-fg-translate-end:11.5px, 11.5px;">'+
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
		var element =this.html.querySelector("#"+sceneID);
		element.querySelector(".mdc-list-item__text").firstChild.innerText=sceneName;
	}

	updateSelectedScene(sceneID){
		var selectedScenes=this.html.querySelectorAll(".mdc-list-item--sceneselected");
		selectedScenes.forEach(element => {
			element.classList.remove("mdc-list-item--sceneselected");
		});
		var listItem=this.html.querySelector('#'+sceneID).firstChild;
		listItem.className +=" mdc-list-item--sceneselected";
	}

//Handlers
	addSceneHandler() {
		CmdManager.addSceneCmd(this.html.querySelectorAll(".mdc-list-item__text").length)  
	}

//Utilities
	init(sceneList){
		var scenePos=1;
		sceneList.forEach(scene => {
			var sceneView = new SceneView();
			sceneView.addView(scene);
			this.addScene(sceneView,scenePos);
			scenePos++;
		});	
		this.updateSelectedScene(sceneList[0].id);
	}
}
