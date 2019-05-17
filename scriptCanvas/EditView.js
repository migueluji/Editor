class EditView {

    constructor(expression) {   
		 this.html = document.createElement("div");
		 this.html.className +="mdc-card__actions node-panel";
		 this.html.innerHTML =
			'<div style="pointer-events:all" class="mdc-text-field mdc-ripple-upgraded text-field--full">'+
					'<input id="property" type="text" value="a" class="mdc-text-field__input">'+
					'<label class="mdc-floating-label">Property</label>'+
					'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
				'</div>'+
			'<div>'+	
			'<div class="mdc-text-field mdc-ripple-upgraded text-field--full">'+
				'<input id="value" type="text" value="a" class="mdc-text-field__input">'+
				'<label class="mdc-floating-label">Value</label>'+
				'<div class="mdc-line-ripple"></div>'+
			'</div>';

		this.expression=expression;

		var textFields=this.html.querySelectorAll('.mdc-text-field');
		textFields.forEach(i=> {
			mdc.textField.MDCTextField.attachTo(i);
		//	i.addEventListener("keypress",this.keyPressHandler.bind(this));
		});

		this.exp = String(expression.text).split("=");
		this.html.querySelector("#property").value=this.exp[0];
		this.html.querySelector("#value").value=this.exp[1];

		var inputs=this.html.querySelectorAll("input");
		inputs.forEach(input=>{
			input.addEventListener("change",this.onChangeInputHandler.bind(this,input));
		});
	}


/* Handlers
	keyPressHandler(e){
		var chr = String.fromCharCode(e.which);
		var name=this.html.querySelector("input").value;
		var filter="/+-*%";
		if ((filter.indexOf(chr) < 0) || (name.length >= 20)){
			e.preventDefault();
		}	
		return true;
	}
*/
	onChangeInputHandler(input){
		// var sceneID=document.querySelector(".sceneselected").id;
		// var actorID=document.querySelector(".actorselected").id;
		// var scriptID=document.querySelector(".scriptselected").id;
		// var nodeID=document.querySelector(".nodeselected").id;

		(input.id=="property")?this.exp[0]=input.value:this.exp[1]=input.value;
		this.expression = {"text":this.exp[0]+"="+this.exp[1]};

		//CmdManager.changeNodeExpression(sceneID,actorID,scriptID,nodeID,expression);
	}
}
