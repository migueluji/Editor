class GamePropertiesSettingsView {

    constructor() {   
		 this._html = document.createElement("li");
		 this._html.className +="game-properties-settings properties-section";
		 this._html.innerHTML =
			'<li class="mdc-list-item mdc-ripple-upgraded properties-section-title">'+
				'<button id="expandbutton" class="material-icons mdc-top-app-bar__action-item" >expand_more</button>'+
				'Settings'+

			'</li>'+
			'<div class="properties-panel">'+
				'<div class="mdc-text-field mdc-ripple-upgraded text-field--full">'+
					'<input type="text" value="Untitle Game" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Game name</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
				'</div>'+
				'<div class="two-properties">'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input type="number" value="800" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Width</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
						'<input type="number" value="640" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Height</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
						'</div>'+	
				'</div>'+
				'<div class="mdc-text-field mdc-ripple-upgraded text-field--full">'+
				'<input type="text" value="Scene 1" class="mdc-text-field__input">'+
					'<label class="mdc-floating-label" for="text-field-filled">Initial Scene</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
				'</div>'+
/*				'<div class="mdc-menu-surface--anchor">'+
					'<div class="mdc-menu mdc-menu-surface mdc-menu-surface--close mdc-menu-surface--open" tabindex="-1" style="transform-origin: left top 0px; left: 0px; top: 0px; max-height: 463px;">'+
						'<ul class="mdc-list">'+
						'</ul>'+
					'</div>'+
				'</div>'+*/
			'</div>';

		var textFields=this._html.querySelectorAll('.mdc-text-field');
		textFields.forEach(element => {	mdc.textField.MDCTextField.attachTo(element);}); 
		this._html.querySelector("#expandbutton").addEventListener("click",this.propertyGroupHandler.bind(this));
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

}

