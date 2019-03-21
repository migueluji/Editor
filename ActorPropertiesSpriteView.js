class ActorPropertiesSpriteView {

    constructor() {   
		 this.html = document.createElement("li");
		 this.html.className +="actor-properties-render properties-section";
		 this.html.innerHTML =
			'<li class="mdc-list-item mdc-ripple-upgraded properties-section-title">'+
				'<button id="expandbutton" class="material-icons mdc-top-app-bar__action-item" >expand_more</button>'+
				'Sprite'+
				'<div class="mdc-checkbox mdc-list-item__meta mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
					'<input id="visible" value="true" type="checkbox" class="mdc-checkbox__native-control">'+
					'<div class="mdc-checkbox__background">'+
						'<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">'+
							'<path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>'+
						'</svg>'+
					'</div>'+
				'</div>'+
			'</li>'+
			'<div class="properties-panel">'+
				'<div class="mdc-text-field mdc-text-field--with-trailing-icon mdc-ripple-upgraded text-field--full">'+
					'<input id="image" type="text" value="value" class="mdc-text-field__input">'+ //image file
						'<label class="mdc-floating-label" for="text-field-filled">Image</label>'+
						'<button id="imagebutton" class="mdc-button mdc-button-upgraded upload-button" style="top:10px">'+
							'<i class="material-icons mdc-button_icon">folder</i>'+
						'</button>'+
					'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
				'</div>'+
				'<div class="two-properties">'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="color" type="text" value="#ffffff" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Color</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
						'<input id="opacity" min="0" max="1" step="0.1" type="number" value="1" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Opacity</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
						'</div>'+	
				'</div>'+
				'<div class="two-properties">'+	
					'<div class="mdc-form-field">'+
						'<label class="text-check-label">Flip X</label>'+
						'<div class="mdc-checkbox mdc-list-item__meta mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
							'<input id="flipX" value="true" type="checkbox" class="mdc-checkbox__native-control">'+
							'<div class="mdc-checkbox__background">'+
								'<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">'+
									'<path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>'+
								'</svg>'+
							'</div>'+
						'</div>'+
					'</div>'+	
					'<div class="mdc-form-field">'+
						'<label class="text-check-label">Flip Y</label>'+
						'<div class="mdc-checkbox mdc-list-item__meta mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
							'<input id="flipY" value="true" type="checkbox" class="mdc-checkbox__native-control">'+
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
						'<input id="scrollX" type="number" value="0" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Scroll X</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
						'<input id="scrollY" type="number" value="0" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Scroll Y</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
				'</div>'+
				'<div class="two-properties">'+	
				'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
					'<input id="tileX" min="1" step="0.1" type="number" value="1" class="mdc-text-field__input">'+
					'<label class="mdc-floating-label" for="text-field-filled">Tile X</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
				'</div>'+	
				'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
					'<input id="tileY" min="1" step="0.1" type="number" value="1" class="mdc-text-field__input">'+
					'<label class="mdc-floating-label" for="text-field-filled">Tile Y</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
				'</div>'+	
			'</div>'+
			'</div>';	

		var visible=this.html.querySelector("#visible");
		visible.addEventListener("click",this.onClickHandler.bind(this));

		var imageButton=this.html.querySelector("#imagebutton");
		imageButton.addEventListener("click",this.onClickImageButton.bind(this));

		this.html.querySelector("#expandbutton").addEventListener("click",this.propertyGroupHandler.bind(this));
	}

// Handlers
	onClickHandler(){
		(this.html.querySelector("#visible").checked) ?	this.html.classList.remove("properties-section--disable"):
														this.html.classList.add("properties-section--disable");
	}

	onClickImageButton(){
		SideSheetView.openSheetHandler("sound-selection");
	}

	propertyGroupHandler(){
		var element=this.html.querySelector(".properties-panel");
		var expandButton=this.html.querySelector("#expandbutton");
		element.classList.toggle("open");
		element.classList.contains("open") ? expandButton.innerHTML='expand_less' : expandButton.innerHTML='expand_more';
	}

}