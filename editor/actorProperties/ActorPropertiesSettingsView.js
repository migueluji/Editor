class ActorPropertiesSettingsView {

    constructor() {   
		 this.html = document.createElement("li");
		 this.html.className +="actor-properties-settings properties-section";
		 this.html.innerHTML =
			'<li class="mdc-list-item mdc-ripple-upgraded properties-section-title">'+
				'<button id="expandbutton" style="margin-right:8px" class="mdc-icon-button material-icons mdc-top-app-bar__action-item">expand_more</button>'+
				'Settings'+
				'<div class="mdc-form-field">'+
					'<label class="text-check-label" style="padding-left: 75px">Sleeping</label>'+
					'<div class="mdc-checkbox mdc-list-item__meta mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
						'<input id="sleeping" value="true" type="checkbox" class="mdc-checkbox__native-control">'+
						'<div class="mdc-checkbox__background">'+
							'<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">'+
								'<path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>'+
							'</svg>'+
						'</div>'+
					'</div>'+
				'</div>'+	
			'</li>'+
			'<div class="properties-panel open">'+
				'<div class="two-properties">'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="x" value="0" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >X</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="y" value="0" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Y</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
				'</div>'+
				'<div class="two-properties">'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="width" min="0" value="0" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Width</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="height" min="0" value="0" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Height</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
				'</div>'+
				'<div class="two-properties">'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="scaleX" step="0.01" value="0" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Scale X</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="scaleY" step="0.01" value="0" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Scale Y</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
				'</div>'+
				'<div class="two-properties">'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="angle" value="0" step="1" min="-360" max="360" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Angle</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<div style="min-width: calc(50% - 16px);"class="half-text mdc-form-field">'+
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
					'<div id="collider" style="min-width: calc(50% - 16px);" class="half-text mdc-select mdc-select--filled">'+
						'<div style="background:white" class="mdc-select__anchor">'+
							'<span class="mdc-select__ripple"></span>'+
							'<span class="mdc-select__selected-text"></span>'+
							'<span class="mdc-select__dropdown-icon">'+
								'<svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">'+
									'<polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon>'+
									'<polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15"></polygon>'+
								'</svg>'+
							'</span>'+
							'<span class="mdc-floating-label">Collider</span>'+
							'<span class="mdc-line-ripple"></span>'+
						'</div>'+
						'<div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">'+
							'<ul class="mdc-list">'+
								'<li class="mdc-list-item mdc-list-item--selected"  data-value="Box">'+
									'<span class="mdc-list-item__ripple"></span>'+
									'<span class="mdc-list-item__text">Box</span>'+
								'</li>'+
								'<li class="mdc-list-item" data-value="Circle">'+
									'<span class="mdc-list-item__ripple"></span>'+
									'<span class="mdc-list-item__text">Circle</span>'+
								'</li>'+
							'</ul>'+
						'</div>'+
					'</div>'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="tags" value="text" class="mdc-text-field__input" type="text" readonly="readonly">'+
						'<span class="mdc-floating-label" >Tags</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+		
				'</div>'+				
			'</div>';
		this.html.querySelector("#expandbutton").addEventListener("click",this.propertyGroupHandler.bind(this));
		this.html.querySelector("#tags").addEventListener("click",this.openTagsSelectionHandler.bind(this));
	}

// Handlers
	propertyGroupHandler(){
		var element=this.html.querySelector(".properties-panel");
		var expandButton=this.html.querySelector("#expandbutton");
		element.classList.toggle("open");
		element.classList.contains("open") ? expandButton.innerHTML='expand_less' : expandButton.innerHTML='expand_more';
	}

	openTagsSelectionHandler(){
		var inputTags = this.html.querySelector("#tags");
		Command.openTagsCmd(inputTags);
	}
	
}