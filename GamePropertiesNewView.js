class GamePropertiesNewView {

    constructor() {   
		 this._html = document.createElement("li");
		 this._html.className +="game-properties-new properties-section";
		 this._html.innerHTML =
	//		'<div class="properties-panel open">'+
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
	//			'</div>'+
			'</div>';

		var textFields=this._html.querySelectorAll('.mdc-text-field');
		textFields.forEach(element => {	
			mdc.textField.MDCTextField.attachTo(element);
	//		element.firstChild.addEventListener("change",this.onChangeInputHandler.bind(this,element.firstChild));
		}); 
	//	this._html.querySelector("#expandbutton").addEventListener("click",this.propertyGroupHandler.bind(this));
		
	}

	get html() {  
        return this._html;
	}

// Handlers

/*
	onChangeInputHandler(element){
		var property=element.id;
		var value =this.html.querySelector("#"+property).value;
		console.log("vista",property,value);
		CmdManager.changeGamePropertyCmd(property,value);
	}
*/
}

