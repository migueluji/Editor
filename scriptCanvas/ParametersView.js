class ParametersView  {

    constructor(parameters) {  
			this.parameters=parameters;
			this.html = document.createElement("div");
			this.html.className +="mdc-card__actions node-panel";

			this.addFields(parameters);

			var textFields=this.html.querySelectorAll('.mdc-text-field');
			textFields.forEach(i=> {
				mdc.textField.MDCTextField.attachTo(i);
			});

			var inputs=this.html.querySelectorAll("input");
			inputs.forEach(input=>{
				input.addEventListener("change",this.onChangeInputHandler.bind(this,input));
			});
	}

	addFields(parameters){
		for (const field in parameters) {
			var fieldView = new FieldView(field,parameters[field]);
			this.html.appendChild(fieldView.html);
		};
	}

	onChangeInputHandler(input){
		this.parameters[input.id]=input.value;
 	}
}
