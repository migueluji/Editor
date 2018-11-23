class SceneListDiv {

    constructor() {   
		 this.div = document.createElement("div");
		 this.div.innerHTML =
				"<ul id='scenelist'></ul>"+
				 "<input id='addscene' type='submit' value='Add'/>";
    }
	
    addSceneListener(handler) {
		 this.div.querySelector("#addscene").addEventListener("click",this.set.bind(this,handler));
	 }

	getHtml() {  
        return this.div;
    }
    
	set(handler) {
		var items = this.div.querySelector("#scenelist").getElementsByTagName("li");
		var pos = items.length;
	//	var newSceneName = this.div.querySelector("#sceneinput").value;
	//	this.div.querySelector("#sceneinput").value="";
		handler(pos);
    }

    addScene(sceneView) {
		 this.div.querySelector("#scenelist").appendChild(sceneView.getHtml());
	}
	
	removeScene(sceneID){
		this.div.querySelector("#ID"+sceneID).remove();
	}
}
