class SceneLi {

    constructor() {
			this._html = document.createElement("li");
		 	this._html.innerHTML ="<label></label>"+
				"<input id='position' type='text'/>"+
				"<input id='boton1' type='submit' value ='bring to' />"+
				"<input id='boton2' type='submit' value='duplicate'/>"+
				"<input id='boton3' type='submit' value='delete'/>";
	}
	
	get html() {
		return this._html;
  	}
    
  	set html(scene) {
		this._html.id=scene.id;
		this._html.querySelector("label").innerHTML=scene.name+"  ";
  	}
	
	moveSceneListener(moveSceneCmd){
		this._html.querySelector('#boton1').addEventListener("click",this.moveSceneHandler.bind(this,moveSceneCmd));
	}
	
	duplicateSceneListener(duplicateSceneCmd){
		this._html.querySelector('#boton2').addEventListener("click",this.duplicateSceneHandler.bind(this,duplicateSceneCmd));
	}

	removeSceneListener(removeSceneCmd) {
		this._html.querySelector('#boton3').addEventListener("click",this.removeSceneHandler.bind(this,removeSceneCmd));
	}
	
	moveSceneHandler(moveSceneCmd){
		var newPos=this._html.querySelector('#position').value;
		this._html.querySelector('#position').value="";
		if (newPos !== ""){
			moveSceneCmd(this._html.id,newPos);
		}
	}

	duplicateSceneHandler(duplicateSceneCmd){
		duplicateSceneCmd(this._html.id);
	}

	removeSceneHandler (removeSceneCmd){
		removeSceneCmd(this._html.id); 
	}

	remove() { 
	 this._html.remove();
  }
	 
}