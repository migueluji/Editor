class PropertyView {

    constructor(property,value) {   
		 this.html = document.createElement("li");
		 this.html.innerHTML =
			'<div class="new-property mdc-list-item mdc-ripple-upgraded">'+
				// aqui se inserta la propiedad
				'<button id="more" class="mdc-button mdc-list-item__meta material-icons">more_vert</button>'+
			'</div>'+
			'<div class="mdc-menu-surface--anchor menu-new-property">'+
				'<div class="mdc-menu mdc-menu-surface mdc-menu-surface--close" tabindex="-1">'+
					'<ul class="mdc-list" role="menu" aria-hidden="true">'+
						'<li id="delete" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Delete</li>'+
					'</ul>'+
				'</div>';
			'</div>';

		this._property=property;
		this._value=value;
		var list=this.html.querySelector(".new-property");
		(typeof(value)==='number') ?	list.insertBefore(this.newNumberPropertyView(),list.childNodes[0]) :
									  	list.insertBefore(this.newBooleanPropertyView(),list.childNodes[0]);

		this.html.querySelector("#property").value=value;
		this.html.querySelector("#property").id=property;
		this.html.querySelector("#label").innerText=property.charAt(0).toUpperCase()+property.slice(1); // primer caracter en mayusculas

		var text=this.html.querySelector('.mdc-text-field');
		if (text != null) {
			mdc.textField.MDCTextField.attachTo(text);
			text.firstChild.addEventListener("change",this.onChangeInputHandler.bind(this,text.firstChild));
		}
		else{
			var checkbox=this.html.querySelector(".mdc-checkbox");
			checkbox.firstChild.addEventListener("change",this.onChangeInputHandler.bind(this,checkbox.firstChild));
			value ? this.html.querySelector("#"+property).checked=true : this.html.querySelector("#"+property).checked=false;
		}

		this.html.querySelector("#more").addEventListener("click",this.menuNewPropertyHandler.bind(this));
		this.html.querySelector('#delete').addEventListener("click",this.removeNewPropertyHandler.bind(this,));
		this.menu = mdc.menu.MDCMenu.attachTo(this.html.querySelector('.mdc-menu'));

	}

//Handler
	onChangeInputHandler(element){
		this._property=element.id;
		(element.type !=="number")  ?   this._value=Boolean(element.checked): this._value=Number(element.value);
		CmdManager.changeGamePropertyCmd(this._property,this._value);
	}

	menuNewPropertyHandler(){
		this.menu.open = true;
	}

	removeNewPropertyHandler(){
		var text =this._property;
		if (confirm('Are you sure you want to delete "'+text+'" property?')){
			CmdManager.removeGamePropertyCmd(this._property,this._value); 
		}
	}

//Utils
	newNumberPropertyView (){
		var html=document.createElement('div');
		html.className +="mdc-text-field mdc-ripple-upgraded text-field--full";
		html.innerHTML=
			'<input id="property" type="number" step="0.1" class="mdc-text-field__input">'+
			'<label id="label" class="mdc-floating-label" for="text-field-filled"></label>'+
			'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>';
		return html;
	}

	newBooleanPropertyView (){
		var html=document.createElement('div');
		html.className +="mdc-form-field";
		html.innerHTML=
			'<label id="label" class="text-check-label"></label>'+
			'<div class="mdc-checkbox mdc-list-item__meta mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
				'<input id="property" type="checkbox" class="mdc-checkbox__native-control">'+
				'<div class="mdc-checkbox__background">'+
					'<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">'+
						'<path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>'+
					'</svg>'+
				'</div>'+
			'</div>';
		return html;
	}
}
