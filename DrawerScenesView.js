class DrawerScenesView {

    constructor(sceneList) {   
		this._html = document.createElement("div");
		this._html.className +="mdc-drawer__content";
		this._html.innerHTML =
			'<button id="addscene" class="mdc-fab mdc-ripple-upgraded add-scene-button" aria-label="Add Scene"'+
				 'style="--mdc-ripple-fg-size:33px; --mdc-ripple-fg-scale:2.70291; --mdc-ripple-fg-translate-start:5.5px, 19.6875px; --mdc-ripple-fg-translate-end:11.5px, 11.5px;">'+
					 '<i class="mdc-fab__icon material-icons">add</i>'+
			'</button>'+
			'<ul style="padding-top:32px" class="mdc-list  mdc-list--avatar-list"></ul>';
		this._html.querySelector("#addscene").addEventListener("click",this.addSceneHandler.bind(this));
		this.init(sceneList);
    }
	
	get html() {  
        return this._html;
	}

  	addScene(sceneView,scenePos) {
		this._html.querySelector(".mdc-list").insertBefore(sceneView.html,this._html.querySelector(".mdc-list").childNodes[scenePos]);
	}

	removeScene(sceneID){
		this._html.querySelector("#"+sceneID).remove();
	}

	renameScene(sceneID,sceneName)	{
		var element =this._html.querySelector("#"+sceneID);
		element.querySelector(".mdc-list-item__text").firstChild.innerText=sceneName;
	}

	updateSelectedScene(sceneID){
		var selectedScenes=this._html.querySelectorAll(".mdc-list-item--sceneselected");
		selectedScenes.forEach(element => {
			element.classList.remove("mdc-list-item--sceneselected");
		});
		var listItem=this._html.querySelector('#'+sceneID).firstChild;
		listItem.className +=" mdc-list-item--sceneselected";
	}

//Handlers
	addSceneHandler() {
		CmdManager.addSceneCmd(this._html.querySelectorAll(".mdc-list-item__text").length)  
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
