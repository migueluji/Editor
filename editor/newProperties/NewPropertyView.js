class NewPropertyView {

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
		this.property=property;
		this.value=value;
		this.createFrame(property,value);

		this.html.querySelector("#more").addEventListener("click",this.menuNewPropertyHandler.bind(this));
		this.html.querySelector('#delete').addEventListener("click",this.removeNewPropertyHandler.bind(this));
		this.menu = mdc.menu.MDCMenu.attachTo(this.html.querySelector('.mdc-menu'));
	}

	createFrame(property,value){
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
	}


//Handler
	onChangeInputHandler(element){
		this.property=element.id;
		(element.type !=="number")  ?   this.value=Boolean(element.checked): this.value=Number(element.value);
		var panel=this.html.parentNode.parentNode.parentNode;
		if (panel.classList.contains("game-properties"))
			CmdManager.changeGamePropertyCmd(this.property,this.value);
		else {
			var sceneID=document.querySelector(".sceneselected").id;
			var actorID=document.querySelector(".actorselected").id;
			CmdManager.changeActorPropertyCmd(sceneID,actorID,this.property,this.value);
		}
	}

	menuNewPropertyHandler(){
		this.menu.open = true;
	}

	removeNewPropertyHandler(){
		if (confirm('Are you sure you want to delete "'+this.property+'" property?')){
			var panel=this.html.parentNode.parentNode.parentNode;
			var list=panel.querySelectorAll(".new-property");
			this.pos=0;
			while ( this.pos < list.length && !(list[this.pos].querySelector("#"+this.property))) {
			   this.pos++;
			}
			if(panel.classList.contains("game-properties")) {
				CmdManager.removeGamePropertyCmd(this.property,this.value,this.pos); 
			}
			else {
				var sceneID=document.querySelector(".sceneselected").id;
				var actorID=document.querySelector(".actorselected").id;
				CmdManager.removeActorPropertyCmd(sceneID,actorID,this.property,this.value,this.pos);
			}
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
