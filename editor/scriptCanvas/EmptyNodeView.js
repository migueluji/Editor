class EmptyNodeView {

	constructor(canvas){
		this.canvas=canvas;
		this.html = document.createElement("div");
		this.html.classList.add("node","element","empty");
		this.html.innerHTML=
			'<div class="mdc-chip"></div>';
		this.html.id=Utils.id();
		this.chip =this.html.firstChild;
		this.chip.classList.add("emptychip");

		this.chip.style.display="none";
		this.html.ondragover=true;
		this.html.addEventListener("dragenter",this.dragenterNodeHandler.bind(this));
		this.html.addEventListener("dragleave",this.dragleaveNodeHandler.bind(this));
		this.html.addEventListener("dragover",this.dragoverNodeHandler.bind(this));
		this.html.addEventListener("drop",this.dropNodeHandler.bind(this));
		}

// Handlers
	dragenterNodeHandler(e){		
		this.html.style.padding="24px 0px";
		this.html.style.height="48px";
		this.chip.style.display="block";
		this.chip.style.height="48px";
		this.canvas.redrawFrames();
	}

	dragleaveNodeHandler(e){
		this.html.style.padding="0px";
		this.chip.style.display="none";
		this.canvas.redrawFrames();
	}

	dragoverNodeHandler(e){
		e.preventDefault();
	}

	dropNodeHandler(e){
		this.dragleaveNodeHandler(e);
		var sceneSelected=document.querySelector(".sceneselected").id;
		var actorSelected=document.querySelector(".actorselected").id;
		var scriptSelected=document.querySelector(".scriptselected").id;

		var insert={"parentID":null,"side":null,"position":null};
		var emptyNode=this.html;
		var i=0;
		while (emptyNode.previousSibling) {
			emptyNode=emptyNode.previousSibling;
			i++;
		}

		var parent=emptyNode.parentNode;
		insert.parentID=parent.parentNode.parentNode.id || null;
		if (parent.classList.contains("yes")) insert.side="right";
			else if (parent.classList.contains("no")) insert.side="left";
		insert.position=i/2;

		var node=document.createElement("div");
		node.innerHTML=e.dataTransfer.getData('text/html');
		var nodeID=node.querySelector(".node").id;

		CmdManager.moveNodeCmd(sceneSelected,actorSelected,scriptSelected,insert,nodeID);
	}
 }