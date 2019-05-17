class NodeView {

// Handlers
	selectNodeHandler(event){
		if(event.target.classList[0]=="mdc-chip" && event.target.classList[0]!="circle"){
			Command.selectNodeCmd(this.id);
		}
	}

	removeNodeHandler(){
		var sceneID=document.querySelector(".sceneselected").id;
		var actorID=document.querySelector(".actorselected").id;
		var scriptID=document.querySelector(".scriptselected").id;
		CmdManager.removeNodeCmd(sceneID,actorID,scriptID,this.id);
	}

	closeNodeInfoHandler(){
		var cards=document.querySelectorAll(".action-card");
		cards.forEach(i=>i.classList.remove("open"));
	}

	openNodeInfoHandler(){
		this.closeNodeInfoHandler();
		Command.selectNodeCmd(this.id); 
		var node = document.getElementById(this.id);
		node.querySelector(".action-card").classList.add("open");
	}
}