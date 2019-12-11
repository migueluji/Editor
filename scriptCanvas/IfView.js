class IfView extends NodeView {

    constructor() {   
		super();
		this.html.innerHTML =
			'<div  class="condition">'+
					'<div  class="frame" ></div>'+
							'<div  class="element">'+
										'<span  class="notext">no</span>'+
										'<span  class="yestext">yes</span>'+
										'<div  class="mdc-chip"></div>'+
										'<div class="mdc-card"></div>'+
							'</div>'+
					'<div class="nodelist no"></div>'+
					'<div class="nodelist yes"></div>'+
			'</div>';
	}

	createFields(node){
		this.html.querySelector(".circle").classList.add("if");
		this.html.querySelector(".action-card").classList.add("moveup");
		this.html.querySelector(".card-title").classList.add("if");

		var icon=null;
		switch(node.type){
			case "Compare" : this.icon="code"; break;
 			case "Check" : this.icon="check";break;
 			case "Collision" : this.icon="hdr_weak";break;
 			case "Timer" : this.icon="timer";break;
 			case "Touch" : this.icon="touch_app";break;
 			case "Keyboard" : this.icon="keyboard";break;
		 }

		var icons=this.html.querySelectorAll(".nodeIcon");
		icons.forEach(i=>i.innerHTML=icon);
		this.fields = new ParametersView(node.parameters);
		var insertPoint = this.html.querySelector(".mdc-card__actions"); // inserta los campos en la card
		insertPoint.parentNode.replaceChild(this.fields.html,insertPoint);
	}
}