class IfView {

    constructor() {   
		 this.html = document.createElement("div");
		 this.html.className +="node";
		 this.html.innerHTML =
			 '<div class="condition">'+
				'<div class="cuadro" ></div>'+
				'<div class="element">'+
					'<span class="notext">no</span>'+
					'<span class="yestext">yes</span>'+
					'<div class="mdc-chip">'+
						'<div class="circle if">'+
							'<i class="nodeIcon material-icons mdc-chip_icon">code</i>'+
						'</div>'+
						'<span class="nodelabel mdc-list-item__text">'+
							'<span class="mdc-list-item__primary-text">Line item</span>'+
							'<span class="mdc-list-item__secondary-text">player.lives</span>'+
						'</span>'+
						'<i class="cancelIcon ge-chip-button material-icons">cancel</i>'+
					'</div>'+
				'</div>'+
				'<div class="nodelist no"></div>'+
				'<div class="nodelist yes"></div>'+
			'</div>';

		this.html.querySelector(".mdc-chip").addEventListener("click",this.selectNodeHandler.bind(this));
		this.html.querySelector(".cancelIcon").addEventListener("click",this.closeNodeHandler.bind(this));
		this.selected=null;
	}

	addView(node){
		this.html.id=node.id;
		this.html.querySelector(".mdc-list-item__primary-text").innerHTML=node.type;
		this.html.querySelector(".mdc-list-item__secondary-text").innerHTML=node.expression.text;
		switch(node.type){
			case "Compare" : this.html.querySelector(".nodeIcon").innerHTML="code";break;
			case "Check" : this.html.querySelector(".nodeIcon").innerHTML="check";break;
			case "Collision" : this.html.querySelector(".nodeIcon").innerHTML="hdr_weak";break;
			case "Timer" : this.html.querySelector(".nodeIcon").innerHTML="timer";break;
			case "Touch" : this.html.querySelector(".nodeIcon").innerHTML="touch_app";break;
			case "Keyboard" : this.html.querySelector(".nodeIcon").innerHTML="keyboard";break;
		 }
	}

// Handlers
	selectNodeHandler(e){
		if(e.target.tagName=="SPAN"){
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