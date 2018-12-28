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
				'<div class="mdc-text-field mdc-ripple-upgraded text-field--full">'+
					'<input id="sound" type="text" value="value" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Sound File</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
				'</div>'+
				'<div class="two-properties">'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="volume" type="number" value="1" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Volume</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
						'<input id="start" type="number" value="0" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Start</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
						'</div>'+	
				'</div>'+
				'<div class="two-properties">'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="pan" type="number" value="0" class="mdc-text-field__input">'+
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

		var textFields=this._html.querySelectorAll('.mdc-text-field');
		textFields.forEach(element => {	
			mdc.textField.MDCTextField.attachTo(element);
			element.firstChild.addEventListener("change",this.onChangeInputHandler.bind(this,element.firstChild));
		}); 

		var checkboxes=this._html.querySelectorAll(".mdc-checkbox");
		checkboxes.forEach(element => {	
			element.firstChild.addEventListener("change",this.onChangeInputHandler.bind(this,element.firstChild));
		}); 
		var play=this._html.querySelector("#play");
		play.addEventListener("click",this.onClickHandler.bind(this,play));

		this._html.querySelector("#expandbutton").addEventListener("click",this.propertyGroupHandler.bind(this));
	}
	
	get html() {  
        return this._html;
	}

// Handlers
	onClickHandler(){
		if (this.html.querySelector("#play").checked) {
			this.html.classList.remove("properties-section--disable");
		}
		else {
			this.html.className+=" properties-section--disable";
		}
	}

	propertyGroupHandler(){
		var element=this._html.querySelector(".properties-panel");
		var expandButton=this._html.querySelector("#expandbutton");
		element.classList.toggle("open");
		element.classList.contains("open") ? expandButton.innerHTML='expand_less' : expandButton.innerHTML='expand_more';
	}

	onChangeInputHandler(element){
		var property=element.id;
		var value =this.html.querySelector("#"+property).value;
		if (element.id=="play") {
			value =this.html.querySelector("#play").checked; // control del checkbox
		}
		if (element.id=="loop") {
			value =this.html.querySelector("#loop").checked; // control del checkbox
		}
		this.onClickHandler();
		CmdManager.changeGamePropertyCmd(property,value);
	}

}