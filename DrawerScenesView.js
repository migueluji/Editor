class DrawerScenesView {

    constructor() {   
		this._html = document.createElement("div");
		this._html.className +="mdc-drawer__content";
		this._html.innerHTML =
			'<button id="addscene" class="mdc-fab mdc-ripple-upgraded add-scene-button" aria-label="Add Scene"'+
				 'style="--mdc-ripple-fg-size:33px; --mdc-ripple-fg-scale:2.70291; --mdc-ripple-fg-translate-start:5.5px, 19.6875px; --mdc-ripple-fg-translate-end:11.5px, 11.5px;">'+
					 '<i class="mdc-fab__icon material-icons">add</i>'+
			'</button>'+
			'<nav  style="padding-top:32px" id="scenelist" class="mdc-list  mdc-list--avatar-list">'+ //mdc-list--two-line
			'</nav>';
		this._html.querySelector("#addscene").addEventListener("click",this.addSceneHandler.bind(this,CmdManager.addSceneCmd.bind(CmdManager)));
    }
	
	get html() {  
        return this._html;
	}
   
	addSceneHandler(addSceneCmd) {
		addSceneCmd(this._html.querySelectorAll(".mdc-list-item__text").length)
  	}

  	addScene(sceneView,scenePos) {
		this._html.querySelector("#scenelist").insertBefore(sceneView.html,this._html.querySelector("#scenelist").childNodes[scenePos]);
	}

	removeScene(sceneID){
		this._html.querySelector("#"+sceneID).remove();
	}
	
}
