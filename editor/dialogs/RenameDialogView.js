class RenameDialogView {

    constructor(element,elementID) {   
		var value=document.querySelector("#"+elementID).querySelector(".mdc-list-item__text").innerHTML;
		this.html = document.createElement("div");
		this.html.className +="dialog-full-screen";
		this.html.innerHTML =
			'<div class="mdc-elevation--z24 mdc-card">'+
				'<h2 id="title" class="demo-card__title mdc-typography--headline6">Rename    </h2>'+
				'<label style="width:auto;margin:0px" class="mdc-text-field mdc-text-field--filled">'+
					'<span class="mdc-text-field__ripple"></span>'+
					'<input id="input" value="'+value+'" class="mdc-text-field__input" type="text">'+
					'<span class="mdc-floating-label">New name</span>'+
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
		this.element=element;
		this.elementID=elementID;
		this.panel=null;
		this.html.querySelector("#title").innerText="Rename "+element;
		var textField=this.html.querySelector('.mdc-text-field');
		mdc.textField.MDCTextField.attachTo(textField);
		textField.addEventListener("keypress",this.keyPressHandler.bind(this));

		this.html.querySelector("#okbutton").addEventListener("click",this.okButtonHandler.bind(this));
		this.html.addEventListener("keypress",this.enterKeyHandler.bind(this));
		this.html.querySelector("#cancelbutton").addEventListener("click",this.cancelButtonHandler.bind(this));
		this.html.addEventListener("click",this.cancelBackgroundHandler.bind(this));

		this.html.querySelector("#input").select();
  }

// Handlers
	keyPressHandler(e){
		var chr = String.fromCharCode(e.which);
		var name=this.html.querySelector("#input").value;
		var filter=" abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		if ((filter.indexOf(chr) < 0) || (name.length >= 20)){
			e.preventDefault();
		}	
		return true;
	}

	enterKeyHandler(e){
		if (e.keyCode==13) this.okButtonHandler();
	}
	
	okButtonHandler(){
		var input=this.html.querySelector("#input");
		var name=input.value.trim().split(/\s+/).join(" "); // delete white spaces
		switch(this.element){
			case "scene": this.panel=document.querySelector(".mdc-drawer__content"); break;
			case "actor": this.panel=document.querySelector(".cast"); break;
			case "script": this.panel=document.querySelector(".actor-scripts"); break;
		}
		var list=this.panel.querySelectorAll(".mdc-list-item__text");
		var exist=false;
		if (name=="") {
			this.html.querySelector("#error").innerText="Required field"
		}
		else {
			list.forEach(element=>{
				if (element.innerText===name) exist=true;
			});
			if (exist){
				this.html.querySelector("#error").innerText="This "+this.element+" name already exists"
			}
			else{
				switch (this.element) {
					case "scene": 
						CmdManager.renameSceneCmd(this.elementID,name); 
						break;
					case "actor":
						var sceneSelected=document.querySelector(".sceneselected").id;
						CmdManager.renameActorCmd(sceneSelected,this.elementID,name);
						break;
					case "script": 	
						var sceneSelected=document.querySelector(".sceneselected").id;
						var actorSelected=document.querySelector(".actorselected").id;
						CmdManager.renameScriptCmd(sceneSelected,actorSelected,this.elementID,name);break;
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
