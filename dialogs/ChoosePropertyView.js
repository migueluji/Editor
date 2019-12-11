class ChoosePropertyView {

    constructor(input) {   
		 this.html = document.createElement("div");
		 this.html.className +="dialog-full-screen";
		 this.html.innerHTML =
				'<div class="mdc-card" style="width:270px">'+
					'<h2 id="title" class="demo-card__title mdc-typography--headline6">Choose Property</h2>'+
					'<div class="text-field-container"></div>'+
				'<div>'+				
				'<div class="mdc-card__actions">'+
					'<div class="mdc-card__action-icons">'+
						'<button id="cancelbutton" class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded">Cancel</button>'+
						'<button id="okbutton" class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded">Ok</button>'+
					'</div>'+
				'</div>';
		
		var parameters={Element:"",Property:""};
		this.container=this.html.querySelector(".text-field-container");
		this.addFields(parameters);
		this.addListeners();
		this.parameters=parameters;
		this.input=input;

		this.html.querySelector("#okbutton").addEventListener("click",this.okButtonHandler.bind(this));
		this.html.querySelector("#cancelbutton").addEventListener("click",this.cancelButtonHandler.bind(this));
		this.html.addEventListener("click",this.cancelBackgroundHandler.bind(this));
  }
	removeFields(){
		while (this.container.firstChild){ // elimina todos los elementos de la lista
			this.container.removeChild(this.container.firstChild);
		};
	}

	addFields(parameters){
		for (const field in parameters) {
			var list=null;
			switch(field){
				case "Element" : type="select"; list=["Game","Me"]; list=list.concat(Command.getActorListCmd()); break;
				case "Property" : type="select"; list=Command.getPropertiesListCmd(parameters.Element,"number"); break;
			}
			var fieldView = new FieldView(type,field,parameters[field],list);
			this.container.appendChild(fieldView.html);	
		}
	}	

	editChangeHandler(){
		this.removeFields();
		this.addFields(this.parameters);
		this.addListeners();
	}

// Handlers
  	changeSelectHandler(select){
		this.parameters[select.id]=select.querySelector(".mdc-list-item--selected").dataset.value;
		this.editChangeHandler();
 	 }
	
	okButtonHandler(){
		this.input.value += this.parameters.Element+"."+this.parameters.Property;
		this.input.focus();
		this.cancelButtonHandler();
	}

	cancelButtonHandler(){
		var node=document.querySelector(".dialog-full-screen");
		node.parentNode.removeChild(node);
	}

	cancelBackgroundHandler(e){
		if (e.target===this.html)	this.cancelButtonHandler();
	}

// Utils
	addListeners(){
		var selects=this.html.querySelectorAll(".mdc-select");
		selects.forEach(select=>{
			mdc.select.MDCSelect.attachTo(select);
			select.addEventListener("MDCSelect:change",this.changeSelectHandler.bind(this,select));
		});
	};
}
