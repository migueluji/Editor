class RenameSceneDialogView {

    constructor(sceneID) {   
		 this.html = document.createElement("div");
		 this.html.className +="dialog-full-screen";
		 this.html.innerHTML =
				'<div class="mdc-card">'+
					'<h2 class="demo-card__title mdc-typography--headline6">Rename scene    </h2>'+
					'<div class=text-field-container">'+
						'<div class="mdc-text-field mdc-ripple-upgraded text-field--full">'+
							'<input id="scenename" type="text"  class="mdc-text-field__input">'+
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
		this.sceneID=sceneID;
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
		var name=this.html.querySelector("#scenename").value;
		var filter=" abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		if ((filter.indexOf(chr) < 0) || (name.length >= 15)){
			e.preventDefault();
		}	
		return true;
	}

	okButtonHandler(){
		var input=this.html.querySelector("#scenename");
		var name=input.value.trim(); 
		var panel=document.querySelector(".mdc-drawer__content");
		var sceneList=panel.querySelectorAll(".mdc-list-item__text");
		var exist=false;
		var sceneID;
		if (name=="") {
			this.html.querySelector("#error").innerText="Required field"
		}
		else {
			sceneList.forEach(element=>{
				if (element.firstChild.innerText===name) exist=true;
			});
			if (exist){
				this.html.querySelector("#error").innerText="This scene name already exists"
			}
			else{
				CmdManager.renameSceneCmd(this.sceneID,name);
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
