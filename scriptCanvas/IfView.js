class IfView extends NodeView {

    constructor() {   
		super();
		this.html = document.createElement("div");
		this.html.className +="node";
		this.html.innerHTML =
			'<div  class="condition">'+
				'<div  class="cuadro" ></div>'+
				'<div  class="element">'+
					'<span  class="notext">no</span>'+
					'<span  class="yestext">yes</span>'+
					'<div  class="mdc-chip">'+
					'</div>'+
					'<div class="mdc-card">'+
					'</div>'+
				'</div>'+
				'<div class="nodelist no"></div>'+
				'<div class="nodelist yes"></div>'+
			'</div>';
	}

	addView(node){
		this.html.id=node.id;
		var chip = new ChipView(this.html.id);
		var children = this.html.querySelector(".mdc-chip");
		children.parentNode.replaceChild(chip.html,children);
		this.html.querySelector(".circle").classList.add("if");

		var card = new CardView(this.html.id);
		card.html.querySelector(".card-title").classList.add("if");
		card.html.style.transform="translateY(-52px)"; //ajuste de las tarjetas tipo if
		children = this.html.querySelector(".mdc-card");
		children.parentNode.replaceChild(card.html,children);

		var labels=this.html.querySelectorAll(".mdc-list-item__primary-text");
		labels.forEach(i=>i.innerHTML=node.type);
		this.html.querySelector(".mdc-list-item__secondary-text").innerHTML=node.expression.text;

		var icon=null;
		var view=null;
		switch(node.type){
			case "Compare" : icon="code";break;
			case "Check" : icon="check";break;
			case "Collision" : icon="hdr_weak";break;
			case "Timer" : icon="timer";break;
			case "Touch" : icon="touch_app";break;
			case "Keyboard" : icon="keyboard";break;
		 }

		var icons=this.html.querySelectorAll(".nodeIcon");
		icons.forEach(i=>i.innerHTML=icon);
	}

}