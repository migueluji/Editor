class NodeView {

	constructor(){
		this.html = document.createElement("div");
		this.html.classList.add("node");
	}

	addView(node){
		this.html.id=node.id; // asigna el identificador al elemento html
		this.icon=this.computeChipIcon(node.type);
		(node.nodeListTrue==null)?this.color="do":this.color="if";
		var chip=new ChipView(node,this.icon,this.color); // crea chip
		var children = this.html.querySelector(".mdc-chip");
		children.parentNode.replaceChild(chip.html,children);
		//añade los eventos del chip
		chip.html.draggable=true;
		chip.html.addEventListener("click",this.selectNodeHandler.bind(this));	
		chip.html.addEventListener("dragstart",this.dragstartNodeHandler.bind(this));
		chip.html.addEventListener("dragend",this.dragendNodeHandler.bind(this));
		chip.html.querySelector("#remove").addEventListener("click",this.removeNodeHandler.bind(this));
		
		if (node.type!="Delete" && node.type!="Remove") 
			chip.html.querySelector("#open").addEventListener("click",this.openNodeInfoHandler.bind(this,node));
	}
	
// Handlers
	 dragstartNodeHandler(e){
		document.querySelectorAll(".empty").forEach(element=>{
			element.style.pointerEvents="auto";
		})
		e.dataTransfer.setData('text/html', this.html.outerHTML);
	 }

	 dragendNodeHandler(){ 
		document.querySelectorAll(".empty").forEach(element=>{
			element.style.pointerEvents="none";
		})
	}

	selectNodeHandler(event){
		if(event.target.classList[0]=="mdc-chip" && event.target.classList[0]!="circle"){
			Command.selectNodeCmd(this.html.id);
		}
	}

	removeNodeHandler(){
		var sceneID=document.querySelector(".sceneselected").id;
		var actorID=document.querySelector(".actorselected").id;
		var scriptID=document.querySelector(".scriptselected").id;
		CmdManager.removeNodeCmd(sceneID,actorID,scriptID,this.html.id);
	}

	openNodeInfoHandler(node,e){
		var card=new CardView(node,this.icon,this.color); // crea card
		var children = this.html.querySelector(".mdc-card");
		children.parentNode.replaceChild(card.html,children);
		card.html.querySelector(".card-background").addEventListener("click",this.closeNodeInfoHandler.bind(this,card.fields.parameters));
		card.html.querySelector("#close").addEventListener("click",this.closeNodeInfoHandler.bind(this,card.fields.parameters));

		e.preventDefault();
		var nodeselected = document.querySelector(".nodeselected");
		if (nodeselected==null || nodeselected.id!=this.html.id) Command.selectNodeCmd(this.html.id); 
		var node = document.getElementById(this.html.id);
		node.querySelector(".action-card").classList.add("open");
		node.querySelector(".action-card").classList.add("mdc-elevation--z6");
	}

	closeNodeInfoHandler(newParameters,e){
		e.preventDefault();
		var sceneID=document.querySelector(".sceneselected").id;
		var actorID=document.querySelector(".actorselected").id;
		var scriptID=document.querySelector(".scriptselected").id;
		var nodeID=document.querySelector(".nodeselected").id;
		CmdManager.changeNodeCmd(sceneID,actorID,scriptID,nodeID,newParameters);
		var cards=document.querySelectorAll(".action-card");
		cards.forEach(i=>i.classList.remove("open"));
	}

// Utils
	computeChipIcon(type){
		var icon;
		switch(type){
			case "Edit" : icon="edit"; break;
			case "Spawn" : icon="person_add";break;
			case "Delete" : icon="delete";break;
			case "Animate" : icon="movie_creation";break;
			case "Play" : icon="volume_up";break;
			case "Move" : icon="navigation";break;
			case "Move_To" : icon="place";break;
			case "Rotate" : icon="rotate_left";break;
			case "Rotate_To" : icon="rotate_90_degrees_ccw";break;
			case "Push" : icon="call_made";break;
			case "Push_To" : icon="keyboard_tab";break;
			case "Torque" : icon="sync";break;
			case "Go_To" : icon="input";break;
			case "Add" : icon="present_to_all";break;
			case "Remove" : icon="cancel_presentation";break;
			case "Compare" : icon="code"; break;
			case "Check" : icon="check";break;
			case "Collision" : icon="hdr_weak";break;
			case "Timer" : icon="timer";break;
			case "Touch" : icon="touch_app";break;
			case "Keyboard" : icon="keyboard";break;
		}
		return(icon);
	}
}