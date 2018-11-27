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
		handler(pos);
    }

    addScene(sceneView,scenePos) {
		this.div.querySelector("#scenelist").insertBefore(sceneView.getHtml(),this.div.querySelector("#scenelist").childNodes[scenePos]);
	}

	removeScene(sceneID){
		this.div.querySelector("#ID"+sceneID).remove();
	}
}
