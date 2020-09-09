class NewTagDialogView {

    constructor() {   
		 this.html = document.createElement("div");
		 this.html.className +="dialog-full-screen";
		 this.html.innerHTML =
				'<div class="mdc-elevation--z24 mdc-card">'+
					'<h2 class="demo-card__title mdc-typography--headline6">Introduce New Tag    </h2>'+
					'<label style="width:auto;margin:0px" class="mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="tagname" value="" class="mdc-text-field__input" type="text">'+
						'<span class="mdc-floating-label">Tag name</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<p style="color:var(--mdc-theme-error);" class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg" id="error"></p>'+
				'<div>'+					
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
		var name=this.html.querySelector("#tagname").value;
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
		this.cancelButtonHandler();
		var input=this.html.querySelector("#tagname");
		CmdManager.addTagCmd(input.value);
	}

	cancelButtonHandler(){
		var node=document.querySelector(".dialog-full-screen");
		node=node.nextSibling;
		node.parentNode.removeChild(node);
	}

	cancelBackgroundHandler(e){
		if (e.target===this.html)	this.cancelButtonHandler();
	}
}
