class GamePropertiesPhysicsView {

    constructor() {   
		 this.html = document.createElement("li");
		 this.html.className +="game-properties-physics properties-section properties-section--disable";
		 this.html.innerHTML =
			'<li class="mdc-list-item mdc-ripple-upgraded properties-section-title">'+
				'<button id="expandbutton" class="material-icons mdc-top-app-bar__action-item" >expand_more</button>'+
				'Physics'+
				'<div class="mdc-checkbox mdc-list-item__meta mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
					'<input id="active" value="true" type="checkbox" class="mdc-checkbox__native-control">'+
					'<div class="mdc-checkbox__background">'+
						'<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">'+
							'<path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>'+
						'</svg>'+
					'</div>'+
				'</div>'+
			'</li>'+
			'<div class="properties-panel">'+
				'<div class="two-properties">'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="gravityX" step="0.1" type="number" value="1" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Gravity X</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
						'<input id="gravityY" step="0.1" type="number" value="0" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Gravity Y</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
						'</div>'+	
				'</div>'+
			'</div>';	

		var active=this.html.querySelector("#active");
		active.addEventListener("click",this.onClickHandler.bind(this));

		this.html.querySelector("#expandbutton").addEventListener("click",this.propertyGroupHandler.bind(this));
	}

// Handlers
	onClickHandler(){
		(this.html.querySelector("#active").checked) ?	this.html.classList.remove("properties-section--disable"):
														this.html.classList.add("properties-section--disable");
	}

	propertyGroupHandler(){
		var element=this.html.querySelector(".properties-panel");
		var expandButton=this.html.querySelector("#expandbutton");
		element.classList.toggle("open");
		element.classList.contains("open") ? expandButton.innerHTML='expand_less' : expandButton.innerHTML='expand_more';
	}
}