class ActorPropertiesPhysicsView {

    constructor() {   
		 this.html = document.createElement("li");
		 this.html.className +="actor-properties-physics properties-section";
		 this.html.innerHTML =
			'<li class="mdc-list-item mdc-ripple-upgraded properties-section-title">'+
				'<button id="expandbutton" style="margin-right:8px" class="mdc-icon-button material-icons mdc-top-app-bar__action-item">expand_more</button>'+
				'Physics'+
				'<div class="mdc-checkbox mdc-list-item__meta mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
					'<input id="physicsOn" value="true" type="checkbox" class="mdc-checkbox__native-control">'+
					'<div class="mdc-checkbox__background">'+
						'<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">'+
							'<path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>'+
						'</svg>'+
					'</div>'+
				'</div>'+
			'</li>'+
			'<div class="properties-panel">'+
				'<div class="two-properties">'+	
					'<div id="type" style="min-width: calc(50% - 16px);" class="half-text mdc-select mdc-select--filled">'+
						'<div style="background:white" class="mdc-select__anchor">'+
							'<span class="mdc-select__ripple"></span>'+
							'<span class="mdc-select__selected-text"></span>'+
							'<span style="margin-left:0px" class="mdc-select__dropdown-icon">'+
								'<svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">'+
									'<polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon>'+
									'<polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15"></polygon>'+
								'</svg>'+
							'</span>'+
							'<span class="mdc-floating-label">Type</span>'+
							'<span class="mdc-line-ripple"></span>'+
						'</div>'+
						'<div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">'+
							'<ul class="mdc-list">'+
								'<li class="mdc-list-item mdc-list-item--selected"  data-value="Dynamic">'+
									'<span class="mdc-list-item__ripple"></span>'+
									'<span class="mdc-list-item__text">Dynamic</span>'+
								'</li>'+
								'<li class="mdc-list-item" data-value="Kinematic">'+
									'<span class="mdc-list-item__ripple"></span>'+
									'<span class="mdc-list-item__text">Kinematic</span>'+
								'</li>'+
								'<li class="mdc-list-item" data-value="Static">'+
									'<span class="mdc-list-item__ripple"></span>'+
									'<span class="mdc-list-item__text">Static</span>'+
								'</li>'+
							'</ul>'+
						'</div>'+
					'</div>'+
					'<div style="min-width: calc(50% - 16px);" class="half-text mdc-form-field">'+
						'<label class="text-check-label">Fixed Angle</label>'+
						'<div class="mdc-checkbox mdc-list-item__meta mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
							'<input id="fixedAngle" value="true" type="checkbox" class="mdc-checkbox__native-control">'+
							'<div class="mdc-checkbox__background">'+
								'<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">'+
									'<path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>'+
								'</svg>'+
							'</div>'+
						'</div>'+
					'</div>'+	
				'</div>'+
				'<div class="two-properties">'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="velocityX" value="0" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Velocity X</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="velocityY" value="0" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Velocity Y</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+				
				'</div>'+
				'<div class="two-properties">'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="angularVelocity" value="0" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Angular Velocity</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="density" value="1" min="0" step="0.1" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Density</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
				'</div>'+
				'<div class="two-properties">'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="friction"  value="1" min="0" step="0.1" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Friction</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="restitution"  value="1" min="0" step="0.1"  class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Restitution</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
				'</div>'+
				'<div class="two-properties">'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="dampingLinear" value="1" min="0" step="0.1"  class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Damping Linear</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="dampingAngular"  value="1" min="0" step="0.1"  class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Damping Angular</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
				'</div>'+
			'</div>';	

		var physicsOn=this.html.querySelector("#physicsOn");
		physicsOn.addEventListener("click",this.onClickHandler.bind(this));

		this.html.querySelector("#expandbutton").addEventListener("click",this.propertyGroupHandler.bind(this));
	}

// Handlers
	onClickHandler(){
		(this.html.querySelector("#physicsOn").checked) ?	this.html.classList.remove("properties-section--disable"):
														this.html.classList.add("properties-section--disable");
	}

	propertyGroupHandler(){
		var element=this.html.querySelector(".properties-panel");
		var expandButton=this.html.querySelector("#expandbutton");
		element.classList.toggle("open");
		element.classList.contains("open") ? expandButton.innerHTML='expand_less' : expandButton.innerHTML='expand_more';
		if (element.classList.contains("open")) {
			var sceneID=document.querySelector(".sceneselected").id;
			var actorID=document.querySelector(".actorselected").id;
			CmdManager.changeActorPropertyCmd(sceneID,actorID,"physicsOn",true);
		}
	}
	
}