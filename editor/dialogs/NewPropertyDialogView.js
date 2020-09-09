class NewPropertyDialogView {

    constructor(type) {   
		 this.html = document.createElement("div");
		 this.html.className +="dialog-full-screen";
		 this.html.innerHTML =
				'<div class="mdc-elevation--z24 mdc-card">'+
					'<h2 class="demo-card__title mdc-typography--headline6">Introduce new property</h2>'+
					'<label style="width:auto;margin:0px" class="mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="propertyname" value="" class="mdc-text-field__input" type="text">'+
						'<span class="mdc-floating-label">Property name</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<p style="color:var(--mdc-theme-error);" class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg" id="error"></p>'+
				'<div>'+
				'<h3 class="mdc-typography--subtitle1">Property type</h3>'+
				'<div class="mdc-form-field">'+
					'<div class="mdc-radio mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
						'<input id="number" class="mdc-radio__native-control" type="radio" name="radio-set" checked>'+
						'<div class="mdc-radio__background">'+
							'<div class="mdc-radio__outer-circle"></div>'+
							'<div class="mdc-radio__inner-circle"></div>'+
						'</div>'+
					'</div>'+
					'<label>Number</label>'+
				'</div>'+
				'<div class="mdc-form-field">'+
					'<div class="mdc-radio mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
						'<input id="boolean" class="mdc-radio__native-control" type="radio" name="radio-set" >'+
						'<div class="mdc-radio__background">'+
							'<div class="mdc-radio__outer-circle"></div>'+
							'<div class="mdc-radio__inner-circle"></div>'+
						'</div>'+
					'</div>'+
					'<label>Boolean</label>'+
				'</div>'+						
				'<div class="mdc-card__actions">'+
					'<div class="mdc-card__action-icons">'+
						'<button id="cancelbutton" class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded"><span class="mdc-button__ripple"></span>Cancel</button>'+
						'<button id="okbutton" class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded"><span class="mdc-button__ripple"></span>Ok</button>'+
					'</div>'+
				'</div>';
	
		this.type=type;
		this.name=null;
		this.value=null;
		var textField=this.html.querySelector('.mdc-text-field');
		mdc.textField.MDCTextField.attachTo(textField);
		textField.addEventListener("keypress",this.keyPressHandler.bind(this));
		this.html.querySelector("#okbutton").addEventListener("click",this.okButtonHandler.bind(this));
		this.html.addEventListener("keypress",this.enterKeyHandler.bind(this));
		this.html.querySelector("#cancelbutton").addEventListener("click",this.cancelButtonHandler.bind(this));
		this.html.addEventListener("click",this.cancelBackgroundHandler.bind(this));
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

	enterKeyHandler(e){
		if (e.keyCode==13) this.okButtonHandler();
	}

	okButtonHandler(){
		var input=this.html.querySelector("#propertyname");
		this.name=input.value; 
		var panel=document.querySelector("."+this.type);
		if (this.name=="") {
			this.html.querySelector("#error").innerText="Required field"
		}
		else {
			if ("abcdefghijklmnñopqrstuvwxyz".indexOf(this.name[0]) < 0)	{
				this.html.querySelector("#error").innerText="The first character must be a letter";
			}
			else{
				if (panel.querySelector("#"+this.name)){
					this.html.querySelector("#error").innerText="This property name already exists"
				}
				else{
					(this.html.querySelector("#number").checked) ? this.value=0 : this.value=true;
					if (this.type=="game-properties") CmdManager.addGamePropertyCmd(this.name,this.value);
					else {
						var actorID=document.querySelector(".actorselected").id;
						var sceneID=document.querySelector(".sceneselected").id;
						CmdManager.addActorPropertyCmd(sceneID,actorID,this.name,this.value);
					}
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

	cancelBackgroundHandler(e){
		if (e.target===this.html)	this.cancelButtonHandler();
	}

}
