class SceneLi {

    constructor() {
		 this.li = document.createElement("li");
		 this.li.innerHTML ="<label></label><input type='checkbox'/>";
    }
	
	removeSceneListener(handler) {
		 this.li.querySelector("input").addEventListener("click",this.removeID.bind(this,handler));
   }
	
   getHtml() {
		return this.li;
    }
    
    set(scene) {
		this.li.id="ID"+scene.id;
		this.li.querySelector("label").innerHTML=scene.name;
    }
	
	 removeID(handler){
		var sceneID=this.li.id.substring(2);
		console.log("removeID",sceneID);
		handler(sceneID); 
	 }
    
	 remove() { 
		 this.li.remove();
    }
	 
}