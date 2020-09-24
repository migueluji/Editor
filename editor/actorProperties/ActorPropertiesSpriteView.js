class ActorPropertiesSpriteView {

    constructor() {   
		 this.html = document.createElement("li");
		 this.html.className +="actor-properties-sprite properties-section";
		 this.html.innerHTML =
			'<li class="mdc-list-item mdc-ripple-upgraded properties-section-title">'+
				'<button id="expandbutton" style="margin-right:8px" class="mdc-icon-button material-icons mdc-top-app-bar__action-item">expand_more</button>'+
				'Sprite'+
				'<div class="mdc-checkbox mdc-list-item__meta mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
					'<input id="spriteOn" value="true" type="checkbox" class="mdc-checkbox__native-control">'+
					'<div class="mdc-checkbox__background">'+
						'<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">'+
							'<path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>'+
						'</svg>'+
					'</div>'+
				'</div>'+
			'</li>'+
			'<div class="properties-panel">'+
				'<label style="width: -webkit-fill-available;" class="half-text mdc-text-field mdc-text-field--filled">'+
					'<span class="mdc-text-field__ripple"></span>'+
					'<input id="image" style="width:212px" value="Image" class="mdc-text-field__input" type="text">'+
					'<span class="mdc-floating-label" >Image</span>'+
					'<button id="imagebutton" class="mdc-button mdc-button-upgraded upload-button" style="top:10px">'+
						'<i class="material-icons mdc-button_icon">folder</i>'+
					'</button>'+
					'<span class="mdc-line-ripple"></span>'+
				'</label>'+
				'<div class="two-properties">'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input style="transform: translateY(8px);" id="color" value="#ffffff" class="mdc-text-field__input" type="color">'+
						'<span class="mdc-floating-label" >Color</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="opacity" value="1" min="0" max="1" step="0.1" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Opacity</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
				'</div>'+
				'<div class="two-properties">'+	
					'<div style="height: 64px;min-width: calc(50% - 16px);" class="half-text mdc-form-field">'+
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
					'<div style="min-width: calc(50% - 16px);" class="half-text mdc-form-field">'+
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
					'<label class="half-text  mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="scrollX" value="0" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Scroll X</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="scrollY" value="0" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Scroll Y</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
				'</div>'+
				'<div class="two-properties">'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="tileX" value="1" min="1" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Tile X</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="tileY" value="1" min="1" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Tile Y</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
				'</div>'+
			'</div>';	

		var spriteOn=this.html.querySelector("#spriteOn");
		spriteOn.addEventListener("click",this.onClickHandler.bind(this));

		var imageButton=this.html.querySelector("#imagebutton");
		imageButton.addEventListener("click",this.onClickImageButton.bind(this));

		this.html.querySelector("#expandbutton").addEventListener("click",this.propertyGroupHandler.bind(this));
	}

// Handlers
	onClickHandler(){
		(this.html.querySelector("#spriteOn").checked) ?	this.html.classList.remove("properties-section--disable"):
														this.html.classList.add("properties-section--disable");
	}

	onClickImageButton(){
		var input = this.html.querySelector("#image");
		Command.openAssetsCmd(input,input.value,"Image");
	}

	propertyGroupHandler(){
		var element=this.html.querySelector(".properties-panel");
		var expandButton=this.html.querySelector("#expandbutton");
		element.classList.toggle("open");
		element.classList.contains("open") ? expandButton.innerHTML='expand_less' : expandButton.innerHTML='expand_more';
		if (element.classList.contains("open")) {
			var sceneID=document.querySelector(".sceneselected").id;
			var actorID=document.querySelector(".actorselected").id;
			CmdManager.changeActorPropertyCmd(sceneID,actorID,"spriteOn",true);
		}
	}
}