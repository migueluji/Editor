class SceneLi {
    constructor() {
		 this.li = document.createElement("li");
		 this.li.innerHTML ="<input type='checkbox'/><label></label>";
    }
	
	removeListener(handler) {
		 this.li.querySelector("input").addEventListener("click",this.removeID.bind(this,handler));
   }
	
   get() {
		return this.li;
    }
    
    set(model) {
		this.li.id="ID"+model.getID();
		this.li.querySelector("label").innerHTML=model.getName(); 
    }
	
	 removeID(handler){
		var sceneID=this.li.id.substring(2);
		 //console.log("SceneLi:",sceneID);
		 handler(sceneID); 
	 }
    
	 remove() { 
		 this.li.remove();
    }
	 
}