class SceneListDiv {

    constructor() {   
		 this.div = document.createElement("div");
		 this.div.innerHTML =
				"<h1>Scene Div</h1>"+
					 "<fieldset><legend>Scene List</legend>"+
						  "<ul id='scenelist'></ul>"+
					 "</fieldset>"+
				"<h2>Add a new scene:</h2>"+
				"Nombre de la escena <input id='sceneinput' placeholder='Introduce nueva escena …'/>" +
				 "<input id='addscene' type='submit' value='Add'/>"+
				 "<input id='undo' type='submit' value='Undo'/>"+
				 "<input id='redo' type='submit' value='Redo'/>";
    }
	
    addSceneListener(handler) {
		 this.div.querySelector("#addscene").addEventListener("click",this.set.bind(this,handler));
	 }

	 undoListener(handler) {
		this.div.querySelector("#undo").addEventListener("click",this.set.bind(this,handler));
	}

	redoListener(handler) {
		this.div.querySelector("#redo").addEventListener("click",this.set.bind(this,handler));
	}
   
	get() {  
        return this.div;
    }
    
	set(handler) {
		 var newSceneName = this.div.querySelector("#sceneinput").value;
		 this.div.querySelector("#sceneinput").value="";
		 handler(newSceneName);
    }

    addScene(sceneView) {
		 this.div.querySelector("#scenelist").appendChild(sceneView.get());
	}
	
	remove(sceneID){
		this.div.querySelector("#ID"+sceneID).remove();
	}
}
