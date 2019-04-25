class DoView {

    constructor() {   
		 this.html = document.createElement("div");
		 this.html.className +="node element";
		 this.html.innerHTML =
			'<div class="mdc-chip">'+
				'<div class="circle do">'+
					'<i class="nodeIcon material-icons mdc-chip_icon">code</i>'+
				'</div>'+
				'<span class="nodelabel mdc-list-item__text">'+
					'<span class="mdc-list-item__primary-text">Line item</span>'+
					'<span class="mdc-list-item__secondary-text">player.lives</span>'+
				'</span>'+
				'<i class="cancelIcon ge-chip-button material-icons">cancel</i>'+
			'</div>';

		this.html.querySelector(".mdc-chip").addEventListener("click",this.selectNodeHandler.bind(this));
		this.html.querySelector(".cancelIcon").addEventListener("click",this.closeNodeHandler.bind(this));

	}

	addView(node){
		this.html.id=node.id;
		this.html.querySelector(".mdc-list-item__primary-text").innerHTML=node.type;
		this.html.querySelector(".mdc-list-item__secondary-text").innerHTML=node.expression.text;
		switch(node.type){
			case "Edit" : this.html.querySelector(".nodeIcon").innerHTML="edit";break;
			case "Spawn" : this.html.querySelector(".nodeIcon").innerHTML="person_add";break;
			case "Delete" : this.html.querySelector(".nodeIcon").innerHTML="delete";break;
			case "Animate" : this.html.querySelector(".nodeIcon").innerHTML="movie_creation";break;
			case "Play" : this.html.querySelector(".nodeIcon").innerHTML="volume_up";break;
			case "Move" : this.html.querySelector(".nodeIcon").innerHTML="navigation";break;
			case "Move To" : this.html.querySelector(".nodeIcon").innerHTML="place";break;
			case "Rotate" : this.html.querySelector(".nodeIcon").innerHTML="rotate_left";break;
			case "Rotate To" : this.html.querySelector(".nodeIcon").innerHTML="rotate_90_degrees_ccw";break;
			case "Push" : this.html.querySelector(".nodeIcon").innerHTML="call_made";break;
			case "Push To" : this.html.querySelector(".nodeIcon").innerHTML="keyboard_tab";break;
			case "Torque" : this.html.querySelector(".nodeIcon").innerHTML="sync";break;
			case "Go To" : this.html.querySelector(".nodeIcon").innerHTML="input";break;
			case "Add" : this.html.querySelector(".nodeIcon").innerHTML="present_to_all";break;
			case "Remove" : this.html.querySelector(".nodeIcon").innerHTML="cancel_presentation";break;
		 }
	}

// Handlers
	selectNodeHandler(e){
		if(e.target.tagName=="SPAN" ){
			Command.selectNodeCmd(this.html.id);
		}
	}

	closeNodeHandler(){
		var sceneID=document.querySelector(".sceneselected").id;
		var actorID=document.querySelector(".actorselected").id;
		var scriptID=document.querySelector(".scriptselected").id;
		CmdManager.removeNodeCmd(sceneID,actorID,scriptID,this.html.id);
	}
}