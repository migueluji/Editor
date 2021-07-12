class GamePropertiesSoundView {

    constructor() {   
		 this.html = document.createElement("li");
		 this.html.className +="game-properties-sound properties-section properties-section--disable";
		 this.html.innerHTML =
			'<li class="mdc-list-item mdc-ripple-upgraded properties-section-title">'+
				'<button id="expandbutton" style="margin-right:8px" class="mdc-icon-button material-icons mdc-top-app-bar__action-item">expand_more</button>'+
				'Sound'+
				'<div class="mdc-checkbox mdc-list-item__meta mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
					'<input id="soundOn" value="true" type="checkbox" class="mdc-checkbox__native-control">'+
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
					'<input style="width:212px" id="soundtrack" value="sound" class="mdc-text-field__input" type="text">'+
					'<span class="mdc-floating-label" >Soundtrack</span>'+
					'<button id="soundbutton" class="mdc-button mdc-button-upgraded upload-button" style="top:10px">'+
						'<i class="material-icons mdc-button_icon">folder</i>'+
					'</button>'+
					'<span class="mdc-line-ripple"></span>'+
				'</label>'+
				'<div class="two-properties">'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="volume" value="1" min="0" step="0.1" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Volume</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="start" value="0" min="0" step="0.1" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Start</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
				'</div>'+
				'<div class="two-properties">'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="pan" value="0" min="-1" max="1" step="0.1" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Pan</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<div class="half-text mdc-form-field">'+
						'<label class="text-check-label">Loop</label>'+
						'<div class="mdc-checkbox mdc-list-item__meta mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
							'<input id="loop" value="true" type="checkbox" class="mdc-checkbox__native-control">'+
							'<div class="mdc-checkbox__background">'+
								'<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">'+
									'<path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>'+
								'</svg>'+
							'</div>'+
						'</div>'+
					'</div>'+	
				'</div>'+
			'</div>';	

		var soundOn=this.html.querySelector("#soundOn");
		soundOn.addEventListener("click",this.onClickHandler.bind(this));

		var soundButton=this.html.querySelector("#soundbutton");
		soundButton.addEventListener("click",this.onClickSoundButton.bind(this));

		this.html.querySelector("#expandbutton").addEventListener("click",this.propertyGroupHandler.bind(this));
	}

// Handlers
	onClickHandler(){
		(this.html.querySelector("#soundOn").checked) ?	this.html.classList.remove("properties-section--disable"):
														this.html.classList.add("properties-section--disable");
	}

	onClickSoundButton(){
		var input = this.html.querySelector("#soundtrack");
		Command.openAssetsCmd(input,input.value,"Sound");
	}

	propertyGroupHandler(){
		var element=this.html.querySelector(".properties-panel");
		var expandButton=this.html.querySelector("#expandbutton");
		element.classList.toggle("open");
		element.classList.contains("open") ? expandButton.innerHTML='expand_less' : expandButton.innerHTML='expand_more';
		if (element.classList.contains("open")) {
			CmdManager.changeGamePropertyCmd("soundOn",true);
		}
	}

}