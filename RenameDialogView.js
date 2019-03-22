class RenameDialogView {

    constructor(element,elementID) {   
		 this.html = document.createElement("div");
		 this.html.className +="dialog-full-screen";
		 this.html.innerHTML =
				'<div class="mdc-card">'+
					'<h2 id="title" class="demo-card__title mdc-typography--headline6">Rename    </h2>'+
					'<div class=text-field-container">'+
						'<div class="mdc-text-field mdc-ripple-upgraded text-field--full">'+
							'<input id="input" type="text"  class="mdc-text-field__input">'+
							'<label class="mdc-floating-label">New name</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
						'</div>'+
						'<p style="color:red" class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg" id="error"></p>'+
					'</div>'+
				'<div>'+				
				'<div class="mdc-card__actions">'+
					'<div class="mdc-card__action-icons">'+
						'<button id="cancelbutton" class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded">Cancel</button>'+
						'<button id="okbutton" class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded">Ok</button>'+
					'</div>'+
				'</div>';
		this.element=element;
		this.elementID=elementID;
		this.panel=null;
		this.html.querySelector("#title").innerText="Rename "+element;
		var textField=this.html.querySelector('.mdc-text-field');
		mdc.textField.MDCTextField.attachTo(textField);
		textField.addEventListener("keypress",this.keyPressHandler.bind(this));

		this.html.querySelector("#okbutton").addEventListener("click",this.okButtonHandler.bind(this));
		this.html.querySelector("#cancelbutton").addEventListener("click",this.cancelButtonHandler.bind(this));
		this.html.addEventListener("click",this.cancelBackgroundHandler.bind(this));
  }

// Handlers
	keyPressHandler(e){
		var chr = String.fromCharCode(e.which);
		var name=this.html.querySelector("#input").value;
		var filter=" abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		if ((filter.indexOf(chr) < 0) || (name.length >= 15)){
			e.preventDefault();
		}	
		return true;
	}

	okButtonHandler(){
		var input=this.html.querySelector("#input");
		var name=input.value.trim();
		if (this.element=="scene") this.panel=document.querySelector(".mdc-drawer__content");
		else this.panel=document.querySelector(".cast");
		var list=this.panel.querySelectorAll(".mdc-list-item__text");
		var exist=false;
		if (name=="") {
			this.html.querySelector("#error").innerText="Required field"
		}
		else {
			list.forEach(element=>{
				if (element.firstChild.innerText===name) exist=true;
			});
			if (exist){
				this.html.querySelector("#error").innerText="This "+this.element+" name already exists"
			}
			else{
				if(this.element=="scene") CmdManager.renameSceneCmd(this.elementID,name);
				else {
					var sceneSelected=document.querySelector(".mdc-list-item--sceneselected").parentElement.id;
					CmdManager.renameActorCmd(sceneSelected,this.elementID,name);
				}
				this.cancelButtonHandler();
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
