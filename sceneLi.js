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
    
    set(model) {
		this.li.id="ID"+model.getID();
		var s =model.getPos()+" "+model.getName();
		this.li.querySelector("label").innerHTML=s; 
    }
	
	 removeID(handler){
		var sceneID=this.li.id.substring(2);
		handler(sceneID); 
	 }
    
	 remove() { 
		 this.li.remove();
    }
	 
}