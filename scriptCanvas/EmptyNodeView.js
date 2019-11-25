class EmptyNodeView {

	constructor(canvas){
	//	console.log(canvas);
		this.canvas=canvas;
		this.html = document.createElement("div");
		this.html.classList.add("node","element","empty");
		this.html.innerHTML=
			'<div class="mdc-chip"></div>';
		this.html.id=Utils.id();
		this.chip =this.html.firstChild;
		this.chip.classList.add("emptychip");

	//	this.html.style.pointerEvents="auto";
		this.chip.style.display="none";
		this.html.ondragover=true;
		this.html.addEventListener("dragenter",this.dragenterNodeHandler.bind(this));
		this.html.addEventListener("dragleave",this.dragleaveNodeHandler.bind(this));
		this.html.addEventListener("dragover",this.dragoverNodeHandler.bind(this));
		this.html.addEventListener("drop",this.dropNodeHandler.bind(this));
		}

// Handlers
	dragenterNodeHandler(e){		
	//	console.log("dragenter",e.target);
		this.html.style.padding="16px 0px";
		this.chip.style.display="block";
		this.canvas.redrawFrames();
	}

	dragleaveNodeHandler(e){
	//	console.log("dragleave",e.target);
		this.html.style.padding="0px";
		this.chip.style.display="none";
		this.canvas.redrawFrames();
	}

	dragoverNodeHandler(e){
		e.preventDefault();
	}

	dropNodeHandler(e){
	//	console.log("drop",e.dataTransfer.getData('text/html'));
		this.dragleaveNodeHandler(e);
		var sceneSelected=document.querySelector(".sceneselected").id;
		var actorSelected=document.querySelector(".actorselected").id;
		var scriptSelected=document.querySelector(".scriptselected").id;
		var insertPoint="down";
		var nodeSelected=this.html;
		var nodeSelectedID;
		if (nodeSelected.previousSibling){	// looking for big brother
			nodeSelectedID=nodeSelected.previousSibling.id;
		}
		else { // looking for father
			nodeSelected=nodeSelected.parentNode;
			if(nodeSelected.classList.contains("no")) insertPoint="leftStart";
			if(nodeSelected.classList.contains("yes")) insertPoint="rightStart";
			while (!nodeSelected.classList.contains("node") && !nodeSelected.classList.contains("script-background")) {
				nodeSelected=nodeSelected.parentNode;
			}
			if(nodeSelected.classList.contains("script-background")) nodeSelectedID=null;
			else nodeSelectedID=nodeSelected.id;
		}
		var node=document.createElement("div");
		node.innerHTML=e.dataTransfer.getData('text/html');
		var nodeToInsertID=node.firstElementChild.id;
		console.log("moveNodeCmd",sceneSelected,actorSelected,scriptSelected,nodeSelectedID,insertPoint,nodeToInsertID);
		CmdManager.moveNodeCmd(sceneSelected,actorSelected,scriptSelected,nodeSelectedID,insertPoint,nodeToInsertID);
	}
	

	// addView(node){
	// 	this.html.id=node.id; // asigna el identificador al elemento html
	// 	var chip=new ChipView(); // crea chip
	// 	var children = this.html.querySelector(".mdc-chip");
	// 	children.parentNode.replaceChild(chip.html,children);

	// 	//añade los eventos del chip
	// 	chip.html.addEventListener("click",this.selectNodeHandler.bind(this));	
	// 	chip.html.addEventListener("dragstart",this.dragstartNodeHandler.bind(this));
	// 	chip.html.addEventListener("dragover",this.dragoverNodeHandler.bind(this));
	// 	chip.html.addEventListener("dragleave",this.dragleaveNodeHandler.bind(this));
	// 	chip.html.addEventListener("drop",this.dropNodeHandler.bind(this));
	// 	chip.html.draggable=true;
	// 	chip.html.querySelector("#remove").addEventListener("click",this.removeNodeHandler.bind(this));

	// 	if (node.type=="Delete" ){ // nodo sin tarjeta
	// 		this.html.querySelector(".circle").classList.add("do");
	// 		this.icon="delete";
	// 	}
	// 	else if (node.type=="Remove"){
	// 		this.html.querySelector(".circle").classList.add("do");
	// 		this.icon="cancel_presentation";
	// 	}
	// 	else{
	// 	var card=new CardView(); // crea card
	// 	children = this.html.querySelector(".mdc-card");
	// 	children.parentNode.replaceChild(card.html,children);
	// 	this.createFields(node); // añade iconos y campos dependiendo de la acción
	// 	//añade los eventos del card
	// 	card.html.querySelector("#close").addEventListener("click",this.closeNodeInfoHandler.bind(this));
	// 	chip.html.querySelector("#open").addEventListener("click",this.openNodeInfoHandler.bind(this));
	// 	}		


	// 	var icons=this.html.querySelectorAll(".nodeIcon"); // cambia los iconos
	// 	icons.forEach(i=>i.innerHTML=this.icon);
		
	// 	var labels=this.html.querySelectorAll(".mdc-list-item__primary-text"); // añade labels en chip y card
	// 	labels.forEach(i=>i.textContent=node.type);
	// 	this.html.querySelector(".mdc-list-item__secondary-text").innerHTML=Object.values(node.parameters);
	// }
	
// Handlers
// 	 dragstartNodeHandler(e){
// 		 console.log("Drag Start");
// 		 e.dataTransfer.setData('text/html', this.html.outerHTML);
// 	 }

// 	dragoverNodeHandler(e){
// 		console.log("Drag Over")
// 		e.preventDefault();
// 		this.html.classList.add('over');
// 	};

// 	dragleaveNodeHandler(e){
// 		this.html.classList.remove("over");
// 	};

// 	dropNodeHandler(e){
// 		if(e.stopPropagation){
// 			e.stopPropagation();
// 		}
// 		var element= document.createElement("div");
// 		element.innerHTML=e.dataTransfer.getData('text/html');
// 		element=element.firstElementChild;
// 		var sceneSelected=document.querySelector(".sceneselected").id;
// 		var actorSelected=document.querySelector(".actorselected").id;
// 		var scriptSelected=document.querySelector(".scriptselected").id;
// 		console.log(element,scriptSelected);
// 		CmdManager.addNodeCmd(sceneSelected,actorSelected,scriptSelected,element.id,"down","Edit");
// 	//	CmdManager.moveScriptCmd(sceneSelected,actorSelected,element.id,this.position(this.html,this.html.parentNode));
// 		this.html.classList.remove("over");
// 		if (element.querySelector(".scriptselected")){
// 				Command.selectScriptCmd(element.id); 
// 		}
// 	};

// 	selectNodeHandler(event){
// 		console.log("selected",event.target.classList[0]);
// 		if(event.target.classList[0]=="mdc-chip" && event.target.classList[0]!="circle"){
// 			Command.selectNodeCmd(this.html.id);
// 		}
// 	}

// 	removeNodeHandler(){
// 		var sceneID=document.querySelector(".sceneselected").id;
// 		var actorID=document.querySelector(".actorselected").id;
// 		var scriptID=document.querySelector(".scriptselected").id;
// 		CmdManager.removeNodeCmd(sceneID,actorID,scriptID,this.html.id);
// 	}

// 	openNodeInfoHandler(e){
// 		e.preventDefault();
// 		var nodeselected = document.querySelector(".nodeselected");
// 		if (nodeselected==null || nodeselected.id!=this.html.id) Command.selectNodeCmd(this.html.id); 
// 		var node = document.getElementById(this.html.id);
// 		node.querySelector(".action-card").classList.add("open");
// 	}

// 	closeNodeInfoHandler(e){
// 		e.preventDefault();
// 		var sceneID=document.querySelector(".sceneselected").id;
// 		var actorID=document.querySelector(".actorselected").id;
// 		var scriptID=document.querySelector(".scriptselected").id;
// 		var nodeID=document.querySelector(".nodeselected").id;
// 		CmdManager.changeNode(sceneID,actorID,scriptID,nodeID,this.fields.parameters);
// 		var cards=document.querySelectorAll(".action-card");
// 		cards.forEach(i=>i.classList.remove("open"));
// 	}
 }