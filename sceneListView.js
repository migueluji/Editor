class SceneListView {

    constructor() {   
		this._html = document.createElement("div");
		this._html.className +="mdc-drawer__content";
		this._html.innerHTML =
			'<button id="addscene" class="mdc-button mdc-button-upgraded" style="left:15%;margin:16px;">'+
				'<i class="material-icons mdc-button_icon">add</i>New Scene'+
			'</button>'+
			'<nav  id="scenelist" class="mdc-list  mdc-list--avatar-list">'+ //mdc-list--two-line
			'</nav>';
    }
	
	get html() {  
        return this._html;
	}
	
    addSceneListener(handler) {
		 this._html.querySelector("#addscene").addEventListener("click",this.addSceneHandler.bind(this,handler));
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
