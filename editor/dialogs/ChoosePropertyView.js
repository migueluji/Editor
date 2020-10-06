class ChoosePropertyView {

    constructor(input,option) {   
		this.input=input;
		this.option=option;
		this.html = document.createElement("div");
		this.html.className +="dialog-full-screen";
		this.html.innerHTML =
			'<div class="mdc-elevation--z24 mdc-card" style="width:270px">'+
				'<h2 id="title" class="demo-card__title mdc-typography--headline6">Choose Property</h2>'+
				'<div class="text-field-container"></div>'+
			'<div>'+				
			'<div class="mdc-card__actions">'+
				'<div class="mdc-card__action-icons">'+
					'<button id="cancelbutton" class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded"><span class="mdc-button__ripple"></span>Cancel</button>'+
					'<button id="okbutton" class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded"><span class="mdc-button__ripple"></span>Ok</button>'+
				'</div>'+
			'</div>';
		
		var editorFrame=document.querySelector(".editor-frame-root");
		editorFrame.appendChild(this.html);
		
		var parameters={Element:"Me",Property:undefined};

		if (input.id=="property"){
			var parameter=input.value.split(".");
			if (parameter[0]=="") parameter[0]="Me";
			parameters={Element:parameter[0],Property:parameter[1]};
		}
		this.container=this.html.querySelector(".text-field-container");
		this.addFields(parameters);
		this.addListeners();
		this.parameters=parameters;

		this.html.querySelector("#okbutton").addEventListener("click",this.okButtonHandler.bind(this));
		this.html.querySelector("#cancelbutton").addEventListener("click",this.cancelButtonHandler.bind(this));
		this.html.addEventListener("click",this.cancelBackgroundHandler.bind(this));
  }
	removeFields(){
		while (this.container.firstChild){ // remove all items from the list
			this.container.removeChild(this.container.firstChild);
		};
	}

	addFields(parameters){
		for (const field in parameters) {
			var list=null;
			var type;
			switch(field){
				case "Element" : type="select"; list=["Game","Me"]; list=list.concat(Command.getActorListCmd()); break;
				case "Property" : type="select"; list=Command.getPropertiesListCmd(parameters.Element,this.option); list.unshift("");break;
			}
			var fieldView = new FieldView(type,field,parameters[field],list,this.option);
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
		var oldElement= this.parameters[select.id];
		this.parameters[select.id]=select.querySelector(".mdc-list-item--selected").dataset.value;
		if (select.id=="Element" && oldElement!=this.parameters[select.id] ) this.parameters.Property=null;
		this.editChangeHandler();
 	 }
	
	okButtonHandler(){
		var id=this.input.id;
		var type=this.input.type;
		if (this.parameters.Property!=null){
			switch (true) {
				case (id =="text") || ((id=="value")&& (this.option=="All-Text")): this.input.value +="${"+this.parameters.Element+"."+this.parameters.Property+"}"; break;
				case (id =="property"):this.input.value=this.parameters.Element+"."+this.parameters.Property; break;
				default: this.input.value += this.parameters.Element+"."+this.parameters.Property; break;
			}
			if ("createEvent" in document) {
				var event = document.createEvent("HTMLEvents");
				if (id!="text") event.initEvent("input", false, true);
				else event.initEvent("change", false, true);
				this.input.dispatchEvent(event);
				this.input.focus();
		   }
			this.cancelButtonHandler();
		}
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
