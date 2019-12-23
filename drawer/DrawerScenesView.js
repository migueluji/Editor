class DrawerScenesView {

	constructor(sceneList) {   
		this.html = document.createElement("div");
		this.html.className +="mdc-drawer__content";
		this.html.innerHTML =
			'<button id="addscene" class="mdc-button mdc-button--unelevated mdc-ripple-upgraded  add-scene-button">'+
					'<i class="material-icons mdc-button__icon">add</i>'+
					'<span class="mdc-button__label">add scene</span>'+
			'</button>'+ 
			'<ul class="mdc-list  mdc-list--avatar-list"></ul>';
		this.html.querySelector("#addscene").addEventListener("click",this.addSceneHandler.bind(this));
		this.init(sceneList);
	}

	init(sceneList){
		var scenePos=0;
		sceneList.forEach(scene => {
			scenePos++;
			var sceneView = new SceneView();
			sceneView.addView(scene);
			this.addScene(sceneView,scenePos);
		});	
		console.log(sceneList);
		if (sceneList[0]) this.updateSelectedScene(sceneList[0].id);
	}

  	addScene(sceneView,scenePos) {
		var element = this.html.querySelector(".mdc-list");
		element.insertBefore(sceneView.html,element.childNodes[scenePos]);
	}

	removeScene(sceneID){
		this.html.querySelector("#"+sceneID).remove();
	}

	renameScene(sceneID,sceneName)	{
		this.html.querySelector("#"+sceneID).querySelector(".mdc-list-item__text").innerText=sceneName.split("_").join(" ");
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
}
