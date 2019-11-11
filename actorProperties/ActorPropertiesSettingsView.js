class ActorPropertiesSettingsView {

    constructor() {   
		 this.html = document.createElement("li");
		 this.html.className +="actor-properties-settings properties-section";
		 this.html.innerHTML =
			'<li class="mdc-list-item mdc-ripple-upgraded properties-section-title">'+
				'<button id="expandbutton" class="material-icons mdc-top-app-bar__action-item" >expand_more</button>'+
				'Settings'+
			'</li>'+
			'<div class="properties-panel open">'+
				'<div class="two-properties">'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="x"  type="number" value="0"  class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">X</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
						'<input id="y" type="number" value="0"  class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Y</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
				'</div>'+
				'<div class="two-properties">'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="width" min="1" type="number" value="50"  class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Width</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
						'<input id="height" min="1" type="number" value="50"  class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Height</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
				'</div>'+		
				'<div class="two-properties">'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="scaleX"  step="0.01" min="0" type="number" value="1"  class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Scale X</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
						'<input id="scaleY" step="0.01" min="0" type="number" value="1"  class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Scale Y</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
				'</div>'+	
				'<div class="two-properties">'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="angle" type="number" value="0"  class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Angle</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-form-field">'+
						'<label class="text-check-label">Screen</label>'+
						'<div class="mdc-checkbox mdc-list-item__meta mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
							'<input id="screen" value="true" type="checkbox" class="mdc-checkbox__native-control">'+
							'<div class="mdc-checkbox__background">'+
								'<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">'+
									'<path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>'+
								'</svg>'+
							'</div>'+
						'</div>'+
					'</div>'+	
				'</div>'+	
				'<div class="two-properties">'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="collider"  type="text" value="box"  class="mdc-text-field__input" readonly>'+
						'<label class="mdc-floating-label" for="text-field-filled">Collider</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-menu-surface--anchor menu-field">'+
						'<div id="menuCollider" class="mdc-menu mdc-menu-surface mdc-menu-surface--close" tabindex="-1">'+
							'<ul class="mdc-list" role="menu" aria-hidden="true">'+
								'<li id="box" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Box</li>'+
								'<li id="circle" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Circle</li>'+
							'</ul>'+
						'</div>'+
					'</div>'+
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
						'<input id="tags" type="text" value=""  class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Tags</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
			'</div>'+				
			'</div>';
		this.html.querySelector("#expandbutton").addEventListener("click",this.propertyGroupHandler.bind(this));

		this.html.querySelector("#box").addEventListener("click",this.changeInputHandler.bind(this,"collider","box"));
		this.html.querySelector('#circle').addEventListener("click",this.changeInputHandler.bind(this,"collider","circle"));
		this.menuCollider = mdc.menu.MDCMenu.attachTo(this.html.querySelector("#menuCollider"));
		this.html.querySelector("#collider").addEventListener("click",this.menuHandler.bind(this,this.menuCollider));
	}

// Handlers
	menuHandler(menu){
		menu.open=true;
	}

	changeInputHandler(field,style){
		var input=this.html.querySelector("#"+field);
		input.value=style;
		if ("createEvent" in document) {
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("change", false, true);
			input.dispatchEvent(evt);
		}
	}

	propertyGroupHandler(){
		var element=this.html.querySelector(".properties-panel");
		var expandButton=this.html.querySelector("#expandbutton");
		element.classList.toggle("open");
		element.classList.contains("open") ? expandButton.innerHTML='expand_less' : expandButton.innerHTML='expand_more';
	}
	
}