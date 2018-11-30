class SceneListDiv {

    constructor() {   
		 this._html = document.createElement("div");
		 this._html.innerHTML =
		 	"<input id='addscene' type='submit' value='Add'/>"+
			"<ul id='scenelist'></ul>" ;
    }
	
	get html() {  
        return this._html;
	}
	
    addSceneListener(handler) {
		 this._html.querySelector("#addscene").addEventListener("click",this.handler.bind(this,handler));
	 }
    
	handler(addSceneCmd) {
		addSceneCmd(this._html.querySelector("#scenelist").getElementsByTagName("li").length);
    }

    addScene(sceneView,scenePos) {
		this._html.querySelector("#scenelist").insertBefore(sceneView.html,this._html.querySelector("#scenelist").childNodes[scenePos]);
	
	}

	removeScene(sceneID){
		this._html.querySelector("#"+sceneID).remove();
	}
	
}
