class GamePropertiesSettingsView {

    constructor(gameModel) {   
		 this._html = document.createElement("li");
		 this._html.className +="game-properties-settings properties-section";
		 this._html.innerHTML =
			'<li class="mdc-list-item mdc-ripple-upgraded properties-section-title">'+
				'<button id="expandbutton" class="material-icons mdc-top-app-bar__action-item" >expand_more</button>'+
				'Settings'+
			'</li>'+
			'<div class="properties-panel">'+
				'<div class="mdc-text-field mdc-ripple-upgraded text-field--full">'+
					'<input id="name" type="text" value="value" class="mdc-text-field__input">'+
					'<label class="mdc-floating-label" for="text-field-filled">Game name</label>'+
					'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
				'</div>'+
				'<div class="two-properties">'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="width" type="number" value="0"  class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Width</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
						'<input id="height" type="number" value="0"  class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Height</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
				'</div>'+
				'<div class="mdc-text-field mdc-ripple-upgraded text-field--full">'+
					'<input id="initialScene" type="text"  value="0" class="mdc-text-field__input">'+
					'<label class="mdc-floating-label" for="text-field-filled">Initial Scene</label>'+
					'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
				'</div>'+
			'</div>';

		var textFields=this._html.querySelectorAll('.mdc-text-field');
		textFields.forEach(element => {	
			mdc.textField.MDCTextField.attachTo(element);
			element.firstChild.addEventListener("change",this.onChangeInputHandler.bind(this,element.firstChild));
		}); 
		this._html.querySelector("#expandbutton").addEventListener("click",this.propertyGroupHandler.bind(this));
		this._init(gameModel);
	}
	
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
		this._html.querySelector("#name").value=gameModel.name;
		this._html.querySelector("#width").value=gameModel.width;
		this._html.querySelector("#height").value=gameModel.height;
		this._html.querySelector("#initialScene").value=gameModel.initialScene;
	}

}

