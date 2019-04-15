class IfView {

    constructor() {   
		 this.html = document.createElement("div");
		 this.html.className +="node";
		 this.html.innerHTML =
			 '<div class="condition">'+
				'<div class="cuadro" ></div>'+
				'<div class="element">'+
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
	}

	addView(node){
		this.html.id=node.id;
		this.html.querySelector(".mdc-list-item__primary-text").innerHTML=node.type;
		this.html.querySelector(".mdc-list-item__secondary-text").innerHTML=node.expression.text;
	}
}