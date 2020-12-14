class FieldView  {

    constructor(type,key,value,list,option) { 
		this.key=key;
		this.value=value;
		this.html = document.createElement("div"); 
		this.html.style="width:100%";
		switch(true){
			case type=="boolean" : this.boolean(key,value); break;
			case type=="select" : this.select(key,value,list,option); break;
			default : this.input(type,key,value,list);break;
		}
	}

	boolean(key,value){
		this.html.className +="text-field--full";
		this.html.innerHTML=
			'<div class="mdc-form-field">'+
				'<label class="text-check-label"></label>'+
				'<div class="mdc-checkbox mdc-list-item__meta mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
					'<input id="" type="checkbox" class="mdc-checkbox__native-control">'+
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

	select(key,value,list,option){
		this.html.className +="text-field--full";
		this.html.innerHTML=
			'<div style="width:100%;margin:4px 0px" class="mdc-select mdc-select--filled">'+
				'<div style="background:white" class="mdc-select__anchor">'+
					'<span class="mdc-select__ripple"></span>'+
					'<span class="mdc-select__selected-text"></span>'+
					'<span class="mdc-select__dropdown-icon">'+
						'<svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">'+
							'<polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon>'+
							'<polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15"></polygon>'+
						'</svg>'+
					'</span>'+
					'<span class="mdc-floating-label"></span>'+
					'<span class="mdc-line-ripple"></span>'+
				'</div>'+
				'<div id="menu" class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">'+
					'<ul class="mdc-list"></ul>'+
				'</div>'+
			'</div>';
		var separator;
		this.html.querySelector(".mdc-select").id=key;
		var listView=this.html.querySelector("ul");

		var menuSize=16;
		list.forEach((property,i)=>{
			var item = document.createElement("li");
			item.classList.add("mdc-list-item");
			item.setAttribute("data-value",property);
			item.innerHTML=
				'<span class="mdc-list-item__ripple"></span>'+
				'<span class="mdc-list-item__text">'+property+'</span>';
			if(item.dataset.value==value){
				item.classList.add("mdc-list-item--selected");
				item.setAttribute("tabIndex","0");
				item.setAttribute("aria-selected","true");
			}
			if 	((i!=0 && ["fps","displayWidth","sleeping","spriteOn","textOn","soundOn","physicsOn"].includes(property)) ||
				(option=="Number" && i!=0 && ["","opacity","size","start","velocityX"].includes(property)) || // change is you want "" by "x"
				((list[i-1]=="Me"))){
				separator = document.createElement("li");
				separator.className +="mdc-list-divider";
				separator.setAttribute("role","separator");
				listView.appendChild(separator);
				if (menuSize<336) menuSize=menuSize+16;
			}
			if (menuSize<336) menuSize=menuSize+48;
			listView.appendChild(item);
		});
		key=key.charAt(0).toUpperCase() + key.slice(1);
		this.html.querySelector(".mdc-floating-label").textContent=key.replace("_"," ");
		this.html.querySelector("#menu").style="height:"+menuSize+"px";
	}

	input(type,key,value,list){
		this.html.innerHTML =
			'<label style="width: -webkit-fill-available;margin:4px 0px" class="mdc-text-field mdc-text-field--filled">'+
				'<span class="mdc-text-field__ripple"></span>'+
				'<input name="script" class="mdc-text-field__input" style="display: inline-block;text-overflow: ellipsis;width: calc(85%);">'+ //ellipsis style
				'<span class="mdc-floating-label"></span>'+
				'<button id="button" style="margin-right:-8px" class="mdc-menu-surface--anchor mdc-button mdc-button-upgraded upload-button">'+
					'<i class="material-icons mdc-button_icon">more_vert</i>'+
				'</button>'+
				'<span class="mdc-line-ripple"></span>'+
			'</label>'+
			'<div class="mdc-menu-surface--anchor">'+
				'<div id="menufunctions" class="mdc-menu mdc-menu-surface">'+
					'<ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">'+
						'<li id="property" class="mdc-list-item" role="menuitem">'+
							'<span class="mdc-list-item__ripple"></span>'+
							'<span class="mdc-list-item__text">Property</span>'+
						'</li>'+
						'<li role="separator" class="mdc-list-divider"></li>'+
						'<li id="sqrt" class="mdc-list-item" role="menuitem">'+
							'<span class="mdc-list-item__ripple"></span>'+
							'<span class="mdc-list-item__text">Sqrt</span>'+
						'</li>'+
						'<li id="abs" class="mdc-list-item" role="menuitem">'+
							'<span class="mdc-list-item__ripple"></span>'+
							'<span class="mdc-list-item__text">Abs</span>'+
						'</li>'+
						'<li id="random" class="mdc-list-item" role="menuitem">'+
							'<span class="mdc-list-item__ripple"></span>'+
							'<span class="mdc-list-item__text">Random</span>'+
						'</li>'+
						'<li id="round" class="mdc-list-item" role="menuitem">'+
						'<span class="mdc-list-item__ripple"></span>'+
							'<span class="mdc-list-item__text">Round</span>'+
						'</li>'+
						'<li id="sin" class="mdc-list-item" role="menuitem">'+
							'<span class="mdc-list-item__ripple"></span>'+
							'<span class="mdc-list-item__text">Sin</span>'+
						'</li>'+
						'<li id="cos" class="mdc-list-item" role="menuitem">'+
							'<span class="mdc-list-item__ripple"></span>'+
							'<span class="mdc-list-item__text">Cos</span>'+
						'</li>'+
						'<li id="tan" class="mdc-list-item" role="menuitem">'+
							'<span class="mdc-list-item__ripple"></span>'+
							'<span class="mdc-list-item__text">Tan</span>'+
						'</li>'+
						'<li id="asin" class="mdc-list-item" role="menuitem">'+
						'<span class="mdc-list-item__ripple"></span>'+
							'<span class="mdc-list-item__text">Asin</span>'+
						'</li>'+
						'<li id="acos" class="mdc-list-item" role="menuitem">'+
							'<span class="mdc-list-item__ripple"></span>'+
							'<span class="mdc-list-item__text">Acos</span>'+
						'</li>'+
						'<li id="atan" class="mdc-list-item" role="menuitem">'+
							'<span class="mdc-list-item__ripple"></span>'+
							'<span class="mdc-list-item__text">Atan</span>'+
						'</li>'+
					'</ul>'+
				'</div>'+
			'</div>';	

		this.input = this.html.querySelector("input");
		this.input.spellcheck=false;
		this.input.id="Value";

		(value!=null && value[0]=="#") ? this.input.type="color" : this.input.type="text"; 
		this.input.value=value;
		this.input.id=key;

		key=key.charAt(0).toUpperCase() + key.slice(1);
		this.html.querySelector(".mdc-floating-label").textContent=key.replace("_"," ");	
		
		var button=this.html.querySelector("button");
		var icon=button.querySelector('i');
		
		switch (type){
			case "file": 
				icon.innerHTML="folder";
				this.input.setAttribute("readonly","readonly");
				button.addEventListener("click",this.loadAssetHandler.bind(this,list));break;
			case "text": 
				icon.innerHTML="add_box";
				button.addEventListener("click",this.openPropertiesHandler.bind(this,list));break;
			case "tags" :
				icon.innerHTML="label";
				button.addEventListener("click",this.opentTagsHandler.bind(this));break;
			case "color": 
				icon.style.display="none"; this.input.style="transform: translateY(8px)"; break; // ajust color picker
			case "key": 
				icon.style.display="none"; break;
			case "properties":
				icon.innerHTML="add_box"; 
				button.addEventListener("click",this.openPropertiesHandler.bind(this,list)); break;
			default:			
				button.addEventListener("click",this.menuHandler.bind(this));
				var menuHtml=this.html.querySelector("#menufunctions");
				this.menu = mdc.menu.MDCMenu.attachTo(menuHtml);
				menuHtml.style="height:312px;margin-left:96px;margin-top:-48px";
				var menuItems=this.html.querySelectorAll("li");
				menuItems.forEach(item=>{
					item.addEventListener("click",this.menuItemHandler.bind(this,item.id));
				}); break;
		}
	}

//Handlers
	menuItemHandler(id){
		if (id!="property"){
			this.input.value += id+"()";
			if ("createEvent" in document) {
				var event = document.createEvent("HTMLEvents");
				event.initEvent("input", false, true);
				this.input.dispatchEvent(event);
				this.input.focus();
		   }
		}
		else {
			this.openPropertiesHandler("Number");
		}
	}

	menuHandler(){
		this.menu.open=true;
	}

	openPropertiesHandler(list){
		new ChoosePropertyView(this.input,list);
	}

	opentTagsHandler(){
		Command.openTagsCmd(this.input);
	}

	loadAssetHandler(list){
		Command.openAssetsCmd(this.input,this.input.value,list);
	}

}



