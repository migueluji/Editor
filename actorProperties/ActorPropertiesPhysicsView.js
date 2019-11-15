class ActorPropertiesPhysicsView {

    constructor() {   
		 this.html = document.createElement("li");
		 this.html.className +="actor-properties-physics properties-section";
		 this.html.innerHTML =
			'<li class="mdc-list-item mdc-ripple-upgraded properties-section-title">'+
				'<button id="expandbutton" class="material-icons mdc-top-app-bar__action-item" >expand_more</button>'+
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
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="type" type="text" value="Kinematic" class="mdc-text-field__input" readonly>'+
						'<label class="mdc-floating-label" for="text-field-filled">Type</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-menu-surface--anchor menu-field">'+
						'<div id="menuType" class="mdc-menu mdc-menu-surface mdc-menu-surface--close" tabindex="-1">'+
							'<ul class="mdc-list" role="menu" aria-hidden="true">'+
								'<li id="kinematic" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Kinematic</li>'+
								'<li id="dynamic" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Dynamic</li>'+
								'<li id="static" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Static</li>'+
							'</ul>'+
						'</div>'+
					'</div>'+
					'<div class="mdc-form-field">'+
						'<label class="text-check-label">Fixed Rotation</label>'+
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
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="velocityX" type="number" value="0" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Velocity X</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
						'<input id="velocityY" type="number" value="0" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Velocity Y</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
				'</div>'+
				'<div class="two-properties">'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="angularVelocity" type="number" value="0" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Angular Velocity</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
						'<input id="density" type="number" value="0" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Density</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
				'</div>'+
				'<div class="two-properties">'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="friction" type="number" value="0" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Friction</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
						'<input id="restitution" type="number" value="0" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Restitution</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
				'</div>'+
				'<div class="two-properties">'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="dampingLinear" type="number" value="0" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Damping Linear</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
						'<input id="dampingAngular" type="number" value="0" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Damping Angular</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
				'</div>'+
			'</div>';	

		var physicsOn=this.html.querySelector("#physicsOn");
		physicsOn.addEventListener("click",this.onClickHandler.bind(this));

		this.html.querySelector("#expandbutton").addEventListener("click",this.propertyGroupHandler.bind(this));

		this.html.querySelector("#kinematic").addEventListener("click",this.changeInputHandler.bind(this,"type","kinematic"));
		this.html.querySelector('#dynamic').addEventListener("click",this.changeInputHandler.bind(this,"type","dynamic"));
		this.html.querySelector('#static').addEventListener("click",this.changeInputHandler.bind(this,"type","static"));
		this.menuType = mdc.menu.MDCMenu.attachTo(this.html.querySelector("#menuType"));
		this.html.querySelector("#type").addEventListener("click",this.menuHandler.bind(this,this.menuType));
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