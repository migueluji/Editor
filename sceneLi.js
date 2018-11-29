class SceneLi {

    constructor() {
			this._html = document.createElement("li");
		 	this._html.innerHTML ="<label></label>"+
		 												"<input id='boton1' type='text' name ='bring_to' />"+
														"<input id='boton2' type='submit' mame = 'duplicate' value='duplicate'/>"+
														"<input id='boton3' type='submit' mame = 'delete' value='delete'/>";
	}
	
	get html() {
		return this._html;
  }
    
  set html(scene) {
		this._html.id=scene.id;
		this._html.querySelector("label").innerHTML=scene.name+"  ";
  }
	
	removeSceneListener(removeSceneCmd) {
		this._html.querySelector('#boton3').addEventListener("click",this.handler.bind(this,removeSceneCmd));
	}
	  
	handler (removeSceneCmd){
		removeSceneCmd(this._html.id); 
	}
    
	remove() { 
	 this._html.remove();
  }
	 
}