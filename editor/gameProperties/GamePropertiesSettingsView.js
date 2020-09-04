class GamePropertiesSettingsView {

    constructor() {   
		 this.html = document.createElement("li");
		 this.html.className +="game-properties-settings properties-section";
		 this.html.innerHTML =
			'<li class="mdc-list-item mdc-ripple-upgraded properties-section-title">'+
				'<button style="margin-right:8px" id="expandbutton" class="mdc-icon-button material-icons">expand_more</button>'+
				'Settings'+
			'</li>'+
			'<div class="properties-panel open">'+
				'<div class="two-properties">'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="displayWidth" value="0" step="1" min="100" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Display Width</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="displayHeight" value="0" step="1" min="100" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Display Height</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
				'</div>'+
				'<div class="two-properties">'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="cameraX" value="0" step="1" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Camera X</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="cameraY" value="0" step="1"  class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Camera Y</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
				'</div>'+	
				'<div class="two-properties">'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="cameraAngle" value="0" step="1" min="-360" max="360" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Camera Angle</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="cameraZoom" step="0.1" value="1" min="0"  class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Camera Zoom</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
				'</div>'+	
				'<div class="two-properties">'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input style="transform: translateY(8px);" id="backgroundColor" value="#ffffff" class="mdc-text-field__input" type="color">'+
						'<span class="mdc-floating-label" >Background Color</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<div class="half-text">'+
					'</div>'+			
				'</div>'+							
			'</div>';
		this.html.querySelector("#expandbutton").addEventListener("click",this.propertyGroupHandler.bind(this));
	}

// Handlers
	propertyGroupHandler(){
		var element=this.html.querySelector(".properties-panel");
		var expandButton=this.html.querySelector("#expandbutton");
		element.classList.toggle("open");
		element.classList.contains("open") ? expandButton.innerHTML='expand_less' : expandButton.innerHTML='expand_more';
	}
}

