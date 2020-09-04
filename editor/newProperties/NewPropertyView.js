class NewPropertyView {

    constructor(property,value) {   
		 this.html = document.createElement("li");
		 this.html.className ="new-property mdc-list-item mdc-ripple-upgraded";
		 this.html.style.height="auto";
		 this.html.innerHTML =
			// here is where the property is inserted
			'<button id="delete" class="mdc-button mdc-list-item__meta material-icons">delete</button>';
		this.property=property;
		this.value=value;
		this.createFrame(property,value);

		this.html.querySelector('#delete').addEventListener("click",this.removeNewPropertyHandler.bind(this));
	}

	createFrame(property,value){
		var list=this.html.querySelector(".new-property");
		(typeof(value)==='number') ?	this.html.insertBefore(this.newNumberPropertyView(),this.html.childNodes[0]) :
										this.html.insertBefore(this.newBooleanPropertyView(),this.html.childNodes[0]);

		this.html.querySelector("#property").value=value;
		this.html.querySelector("#property").id=property;
		this.html.querySelector("#label").innerText=property.charAt(0).toUpperCase()+property.slice(1); // primer caracter en mayusculas

		var text=this.html.querySelector('.mdc-text-field');
		if (text != null) {
			mdc.textField.MDCTextField.attachTo(text);
			var input =text.querySelector("input");
			input.addEventListener("change",this.onChangeInputHandler.bind(this,input));
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
			var scene=document.querySelector(".sceneselected");
			var actor=document.querySelector(".actorselected");
			var sceneID=null;
			var actorID=null;
			if (scene) sceneID=scene.id;
			if (actor) actorID=actor.id;
			CmdManager.changeActorPropertyCmd(sceneID,actorID,this.property,this.value);
		}
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
		var html=document.createElement('label');
		html.className +="mdc-text-field mdc-text-field--filled";
		html.innerHTML=
			'<span class="mdc-text-field__ripple"></span>'+
			'<input id="property" value="" class="mdc-text-field__input" type="number">'+
			'<span  id="label" class="mdc-floating-label" ></span>'+
			'<span class="mdc-line-ripple"></span>';
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
