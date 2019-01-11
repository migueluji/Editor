class NewPropertyDialogView {

    constructor(type) {   
		 this._html = document.createElement("div");
		 this._html.className +="dialog-full-screen";
		 this._html.innerHTML =
				'<div class="mdc-card">'+
					'<h2 class="demo-card__title mdc-typography--headline6">Introduce new property    </h2>'+
					'<div class=text-field-container">'+
						'<div class="mdc-text-field mdc-ripple-upgraded text-field--full">'+
							'<input id="propertyname" type="text"  class="mdc-text-field__input">'+
							'<label class="mdc-floating-label">Property name</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
						'</div>'+
						'<p style="color:red" class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg" id="error"></p>'+
					'</div>'+
				'<div>'+
				'<h3 class="mdc-typography--subtitle1">Property type</h3>'+
				'<div class="mdc-form-field">'+
					'<div class="mdc-radio mdc-ripple-upgraded mdc-ripple-upgraded--unbounded" style="--mdc-ripple-fg-size:24px; --mdc-ripple-fg-scale:1.66667; --mdc-ripple-left:8px; --mdc-ripple-top:8px;">'+
						'<input id="number" class="mdc-radio__native-control" type="radio" name="demo-radio-set" checked>'+
						'<div class="mdc-radio__background">'+
							'<div class="mdc-radio__outer-circle"></div>'+
							'<div class="mdc-radio__inner-circle"></div>'+
						'</div>'+
					'</div>'+
					'<label>Number</label>'+
				'</div>'+
				'<div class="mdc-form-field">'+
					'<div class="mdc-radio mdc-ripple-upgraded mdc-ripple-upgraded--unbounded" style="--mdc-ripple-fg-size:24px; --mdc-ripple-fg-scale:1.66667; --mdc-ripple-left:8px; --mdc-ripple-top:8px;">'+
						'<input id="boolean" class="mdc-radio__native-control" type="radio" name="demo-radio-set" >'+
						'<div class="mdc-radio__background">'+
							'<div class="mdc-radio__outer-circle"></div>'+
							'<div class="mdc-radio__inner-circle"></div>'+
						'</div>'+
					'</div>'+
					'<label>Boolean</label>'+
				'</div>'+						
				'<div class="mdc-card__actions">'+
					'<div class="mdc-card__action-icons">'+
						'<button id="cancelbutton" class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded">Cancel</button>'+
						'<button id="okbutton" class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded">Ok</button>'+
					'</div>'+
				'</div>';
	
		this._type=type;
		var textField=this._html.querySelector('.mdc-text-field');
		mdc.textField.MDCTextField.attachTo(textField);
		textField.addEventListener("keypress",this.keyPressHandler.bind(this));

		this._html.querySelector("#okbutton").addEventListener("click",this.okButtonHandler.bind(this));
		this._html.querySelector("#cancelbutton").addEventListener("click",this.cancelButtonHandler.bind(this));
    }
	
	get html() {  
        return this._html;
	}

// Handlers
	keyPressHandler(e){
		var chr = String.fromCharCode(e.which);
		var name=this.html.querySelector("#propertyname").value;
		var filter="abcdefghijklmnñopqrstuvwxyz1234567890";
		if ((filter.indexOf(chr) < 0) || (name.length >= 15)){
			e.preventDefault();
		}	
		return true;
	}

	okButtonHandler(){
		var input=this.html.querySelector("#propertyname");
		var name=input.value; 
		var panel=document.querySelector("."+this._type);
		if (name=="") {
			this.html.querySelector("#error").innerText="Required field"
		}
		else {
			if ("abcdefghijklmnñopqrstuvwxyz".indexOf(name[0]) < 0)	{
				this.html.querySelector("#error").innerText="The first character need to be a letter";
			}
			else{
				if (panel.querySelector("#"+name)){
					this.html.querySelector("#error").innerText="This property name already exists"
				}
				else{
					var value=null;
					if(this.html.querySelector("#number").checked){
						value=0;
					} 
					else{
						value=false;
					}
					CmdManager.addGamePropertyCmd(name,value);
					this.cancelButtonHandler();
				}
			}

		}
		input.focus();
	}

	cancelButtonHandler(){
		var node=document.querySelector(".dialog-full-screen");
		node.parentNode.removeChild(node);
	}

}
