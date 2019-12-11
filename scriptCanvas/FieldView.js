class FieldView  {

    constructor(type,key,value,list) { 
		this.html = document.createElement("div"); 
		this.html.style="width:100%";
		switch(true){
			case type == "select" : this.operation(key,value,list);break;
			case (type == "input") || (type=="file") || (type=="color"): this.input(key,value,type);break;
			case type == "boolean" : this.boolean(key,value);break;
		}
	}

	boolean(key,value){
		this.html.className +="text-field--full";
		this.html.innerHTML=
			'<div class="mdc-form-field">'+
				'<label class="text-check-label"></label>'+
				'<div class="mdc-checkbox mdc-list-item__meta mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
					'<input id="screen" type="checkbox" class="mdc-checkbox__native-control">'+
					'<div class="mdc-checkbox__background">'+
						'<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24"><path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>'+
					'</div>'+
				'</div>'+
			'</div>';
		this.html.querySelector("label").innerHTML=key;
		var input = this.html.querySelector("input");
		if (value) {
			input.checked=true; input.value=true;
		}
		else{
			input.checked=false; input.value=false;
		} 
		input.id=key;
	}

	operation(key,value,list){
		this.html.className +="text-field--full";
		this.html.innerHTML=
			'<div class="mdc-select">'+
				'<div class="mdc-select__anchor" style="width:100%">'+
					'<i class="mdc-select__dropdown-icon"></i>'+
					'<div class="mdc-select__selected-text"></div>'+
					'<span class="mdc-floating-label mdc-floating-label--float-above"></span>'+
					'<div class="mdc-line-ripple"></div>'+
				'</div>'+
				'<div class="mdc-select__menu mdc-menu mdc-menu-surface" style="width:100%">'+
					'<ul class="mdc-list"></ul>'+
				'</div>'+
			'</div>';
		var separator;
		this.html.querySelector(".mdc-select").id=key;
		var listView=this.html.querySelector("ul");
		list.forEach(element=>{
			var item = document.createElement("li");
			item.classList.add("mdc-list-item");
			item.setAttribute("data-value",element);
			item.innerHTML=element;
			if(item.dataset.value==value){
				item.classList.add("mdc-list-item--selected");
				item.setAttribute("tabIndex","0");
				item.setAttribute("aria-selected","true");
			}
			if ((element=="displayWidth") || (element=="x") || (element=="spriteOn") || (element=="textOn") ||(element=="soundOn") || (element=="physicsOn")){
				separator = document.createElement("li");
				separator.className +="mdc-list-divider";
				separator.setAttribute("role","separator");
				listView.appendChild(separator);
			}
			listView.appendChild(item);
			if((element=="Me")) {
				separator = document.createElement("li");
				separator.className +="mdc-list-divider";
				separator.setAttribute("role","separator");
				listView.appendChild(separator);
			}
		});
		this.html.querySelector("span").textContent=key.replace("_"," ");	
	}

	input(key,value,type){
		this.html.innerHTML =
			'<div class="text-field--full mdc-text-field mdc-ripple-upgraded">'+
				'<input class="mdc-text-field__input" style="padding-right:36px">'+
				'<label class="mdc-floating-label"></label>'+
				'<button id="button" class="mdc-button mdc-button-upgraded upload-button" style="padding:0px;right:8px;min-width: 24px;">'+
					'<i class="material-icons mdc-button_icon">more_vert</i>'+
				'</button>'+
				'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
			'</div>'+
			'<div class="mdc-menu-surface--anchor" style="transform: translate(180px, -56px">'+
				'<div class="mdc-menu mdc-menu-surface mdc-menu-surface--close" tabindex="-1">'+
					'<ul class="mdc-list" role="menu" aria-hidden="true">'+
						'<li id="property" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Property</li>'+
						'<li class="mdc-list-divider" role="separator" tabindex="-1"></li>'+
						'<li id="sqrt" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Sqrt</li>'+
						'<li id="abs" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Abs</li>'+
						'<li id="random" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Random</li>'+
						'<li id="integer" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Integer</li>'+
						'<li id="sin" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Sin</li>'+
						'<li id="cos" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Cos</li>'+
						'<li id="tan" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Tan</li>'+
						'<li id="asin" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Asin</li>'+
						'<li id="acos" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Acos</li>'+
						'<li id="atan" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Atan</li>'+
					'</ul>'+
				'</div>'+
			'</div>';	
		this.input = this.html.querySelector("input");
		this.input.spellcheck=false;
		(value!=null && value[0]=="#") ? this.input.type="color" : this.input.type="text"; 
		this.input.value=value;
		this.input.id=key;
		this.input.addEventListener("change",this.focusInput.bind(this));
		this.html.querySelector("label").textContent=key.replace("_"," ");	

		var button=this.html.querySelector("button");
		button.addEventListener("click",this.menuHandler.bind(this));
		var icon=button.querySelector('i');
		switch (type){
			case "file": icon.innerHTML="folder";break;
			case "color": icon.style.display="none";break;
		}
		this.menu = mdc.menu.MDCMenu.attachTo(this.html.querySelector('.mdc-menu'));
		var menuItems=this.html.querySelectorAll("li");
		menuItems.forEach(item=>{
			item.addEventListener("click",this.menuItemHandler.bind(this,item.id));
		});


	}

//Handlers
	focusInput(){
		this.input.focus();
	}

	menuItemHandler(id){
		if (id!="property"){
			this.input.value += id+"()";
			this.focusInput();
		}
		else {
			var dialog = new ChoosePropertyView(this.input);
			var editorFrame=document.querySelector(".editor-frame-root");
			editorFrame.appendChild(dialog.html);
		}
	}

	menuHandler(){
		this.menu.open=true;
	}
}



