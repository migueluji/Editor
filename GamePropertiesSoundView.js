class GamePropertiesSoundView {

    constructor() {   
		 this._html = document.createElement("li");
		 this._html.className +="game-properties-sound properties-section properties-section--disable";
		 this._html.innerHTML =
			'<li class="mdc-list-item mdc-ripple-upgraded properties-section-title">'+
				'<button id="expandbutton" class="material-icons mdc-top-app-bar__action-item" >expand_more</button>'+
				'Sound'+
				'<div class="mdc-checkbox mdc-list-item__meta mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
					'<input id="play" value="true" type="checkbox" class="mdc-checkbox__native-control">'+
					'<div class="mdc-checkbox__background">'+
						'<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">'+
							'<path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>'+
						'</svg>'+
					'</div>'+
				'</div>'+
			'</li>'+
			'<div class="properties-panel">'+
				'<div class="mdc-text-field mdc-text-field--with-trailing-icon mdc-ripple-upgraded text-field--full">'+
					'<input id="sound" type="text" value="value" class="mdc-text-field__input" disabled>'+ //sound file
						'<label class="mdc-floating-label" for="text-field-filled">Sound File</label>'+
						'<button id="soundbutton" class="mdc-button mdc-button-upgraded upload-button" style="top:10px">'+
							'<i class="material-icons mdc-button_icon">folder</i>'+
						'</button>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
				'</div>'+
				'<div class="two-properties">'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="volume" min="0" step="0.1" type="number" value="1" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Volume</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
						'<input id="start" min="0" step="0.1" type="number" value="0" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Start</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
						'</div>'+	
				'</div>'+
				'<div class="two-properties">'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="pan" step="0.1" min="-1" max="1" type="number" value="0" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Pan</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-form-field">'+
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

		var play=this._html.querySelector("#play");
		play.addEventListener("click",this.onClickHandler.bind(this));

		var soundButton=this._html.querySelector("#soundbutton");
		soundButton.addEventListener("click",this.onClickSoundButton.bind(this));

		this._html.querySelector("#expandbutton").addEventListener("click",this.propertyGroupHandler.bind(this));
	}
	
	get html() {  
        return this._html;
	}

// Handlers
	onClickHandler(){
		(this.html.querySelector("#play").checked) ?	this.html.classList.remove("properties-section--disable"):
														this.html.classList.add("properties-section--disable");
	}

	onClickSoundButton(){
		SideSheetView.openSheetHandler("sound-selection");
	}

	propertyGroupHandler(){
		var element=this._html.querySelector(".properties-panel");
		var expandButton=this._html.querySelector("#expandbutton");
		element.classList.toggle("open");
		element.classList.contains("open") ? expandButton.innerHTML='expand_less' : expandButton.innerHTML='expand_more';
	}

}