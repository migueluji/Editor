class NodeView {

	constructor(){
		this.html = document.createElement("div");
		this.html.classList.add("node");
		this.html.innerHTML=
		'<div class="mdc-chip"></div>'+
		'<div class="mdc-card"></div>';
	}

	addView(node){
		this.html.id=node.id; // asigna el identificador al elemento html
		var chip=new ChipView(); // crea chip
		var children = this.html.querySelector(".mdc-chip");
		children.parentNode.replaceChild(chip.html,children);

		//añade los eventos del chip
		chip.html.addEventListener("click",this.selectNodeHandler.bind(this));	
		chip.html.addEventListener("dragstart",this.dragstartNodeHandler.bind(this));
		chip.html.addEventListener("dragend",this.dragendNodeHandler.bind(this));
		chip.html.draggable=true;
		chip.html.querySelector("#remove").addEventListener("click",this.removeNodeHandler.bind(this));

		if (node.type=="Delete" ){ // nodo sin tarjeta
			this.html.querySelector(".circle").classList.add("do");
			this.icon="delete";
		}
		else if (node.type=="Remove"){
			this.html.querySelector(".circle").classList.add("do");
			this.icon="cancel_presentation";
		}
		else{
		var card=new CardView(); // crea card
		children = this.html.querySelector(".mdc-card");
		children.parentNode.replaceChild(card.html,children);
		this.createFields(node); // añade iconos y campos dependiendo de la acción
		//añade los eventos del card
		card.html.querySelector("#close").addEventListener("click",this.closeNodeInfoHandler.bind(this));
		chip.html.querySelector("#open").addEventListener("click",this.openNodeInfoHandler.bind(this));
		}		


		var icons=this.html.querySelectorAll(".nodeIcon"); // cambia los iconos
		icons.forEach(i=>i.innerHTML=this.icon);
		
		var labels=this.html.querySelectorAll(".mdc-list-item__primary-text"); // añade labels en chip y card
		labels.forEach(i=>i.textContent=node.type);
		this.html.querySelector(".mdc-list-item__secondary-text").innerHTML=Object.values(node.parameters);
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

	openNodeInfoHandler(e){
		e.preventDefault();
		var nodeselected = document.querySelector(".nodeselected");
		if (nodeselected==null || nodeselected.id!=this.html.id) Command.selectNodeCmd(this.html.id); 
		var node = document.getElementById(this.html.id);
		node.querySelector(".action-card").classList.add("open");
		node.querySelector(".action-card").classList.add("mdc-elevation--z6");
	}

	closeNodeInfoHandler(e){
		e.preventDefault();
		var sceneID=document.querySelector(".sceneselected").id;
		var actorID=document.querySelector(".actorselected").id;
		var scriptID=document.querySelector(".scriptselected").id;
		var nodeID=document.querySelector(".nodeselected").id;
		CmdManager.changeNodeCmd(sceneID,actorID,scriptID,nodeID,this.fields.parameters);
		var cards=document.querySelectorAll(".action-card");
		cards.forEach(i=>i.classList.remove("open"));
	}
}