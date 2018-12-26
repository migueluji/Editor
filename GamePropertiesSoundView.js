class GamePropertiesSoundView {

    constructor(gameModel) {   
		 this._html = document.createElement("li");
		 this._html.className +="game-properties-sound properties-section";
		 this._html.innerHTML =
			'<li class="mdc-list-item mdc-ripple-upgraded properties-section-title">'+
				'<button id="expandbutton" class="material-icons mdc-top-app-bar__action-item" >expand_more</button>'+
				'Sound'+
				'<div class="mdc-checkbox mdc-list-item__meta mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
					'<input type="checkbox" class="mdc-checkbox__native-control">'+
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
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
						'<input id="loop" type="number" value="1" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Loop</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
			'</div>';	
		
			var textFields=this._html.querySelectorAll('.mdc-text-field');
			textFields.forEach(element => {	
				mdc.textField.MDCTextField.attachTo(element);
				element.firstChild.addEventListener("change",this.onChangeInputHandler.bind(this,element.firstChild));
			}); 
			this._html.querySelector("#expandbutton").addEventListener("click",this.propertyGroupHandler.bind(this));
			this._init(gameModel);    }
	
	get html() {  
        return this._html;
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
		console.log("vista",property,value);
		CmdManager.changeGamePropertyCmd(property,value);
	}

	_init (gameModel){
		this._html.querySelector("#sound").value=gameModel.sound;
		this._html.querySelector("#volume").value=gameModel.volume;
		this._html.querySelector("#start").value=gameModel.start;
		this._html.querySelector("#pan").value=gameModel.pan;
		this._html.querySelector("#loop").value=gameModel.loop;
	}


}

