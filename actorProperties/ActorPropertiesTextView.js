class ActorPropertiesTextView {

    constructor() {   
		 this.html = document.createElement("li");
		 this.html.className +="actor-properties-text properties-section";
		 this.html.innerHTML =
			'<li class="mdc-list-item mdc-ripple-upgraded properties-section-title">'+
				'<button id="expandbutton" class="material-icons mdc-top-app-bar__action-item" >expand_more</button>'+
				'Text'+
				'<div class="mdc-checkbox mdc-list-item__meta mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">'+
					'<input id="textOn" value="true" type="checkbox" class="mdc-checkbox__native-control">'+
					'<div class="mdc-checkbox__background">'+
						'<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">'+
							'<path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>'+
						'</svg>'+
					'</div>'+
				'</div>'+
			'</li>'+
			'<div class="properties-panel">'+
				'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
					'<input id="text" type="text" value="Write anything..." class="mdc-text-field__input">'+
					'<label class="mdc-floating-label" for="text-field-filled">Text</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
				'</div>'+	
				'<div class="mdc-text-field mdc-text-field--with-trailing-icon mdc-ripple-upgraded text-field--full">'+
					'<input id="font" type="text" value="value" class="mdc-text-field__input">'+ // font file
						'<label class="mdc-floating-label" for="text-field-filled">Font</label>'+
						'<button id="fontbutton" class="mdc-button mdc-button-upgraded upload-button" style="top:10px">'+
							'<i class="material-icons mdc-button_icon">folder</i>'+
						'</button>'+
					'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
				'</div>'+
				'<div class="two-properties">'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="fill" type="color" value="#ffffff" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Fill</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
						'<input id="size" min="1"  type="number" value="20" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Size</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
						'</div>'+	
				'</div>'+
				'<div class="two-properties">'+	
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="style" type="text" value="Normal" class="mdc-text-field__input" readonly>'+
						'<label class="mdc-floating-label" for="text-field-filled">Style</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-menu-surface--anchor menu-field">'+
						'<div id="menuStyle" class="mdc-menu mdc-menu-surface mdc-menu-surface--close" tabindex="-1">'+
							'<ul class="mdc-list" role="menu" aria-hidden="true">'+
								'<li id="normal" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Normal</li>'+
								'<li id="italic" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Italic</li>'+
								'<li id="bold" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Bold</li>'+
								'<li id="italic-bold" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Italic-Bold</li>'+
							'</ul>'+
						'</div>'+
					'</div>'+
					'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
						'<input id="align" type="text" value="left" class="mdc-text-field__input" readonly>'+
						'<label class="mdc-floating-label" for="text-field-filled">Align</label>'+
							'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div class="mdc-menu-surface--anchor menu-field">'+
						'<div id="menuAlign" class="mdc-menu mdc-menu-surface mdc-menu-surface--close" tabindex="-1">'+
							'<ul class="mdc-list" role="menu" aria-hidden="true">'+
								'<li id="left" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Left</li>'+
								'<li id="center" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Center</li>'+
								'<li id="right" class="mdc-list-item mdc-ripple-upgraded" role="menuitem" tabindex="-1">Right</li>'+
							'</ul>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<div class="two-properties">'+	
				'<div class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
					'<input id="offsetX" type="number" value="0" class="mdc-text-field__input">'+
					'<label class="mdc-floating-label" for="text-field-filled">Offset X</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
				'</div>'+	
				'<div class="mdc-text-field mdc-ripple-upgraded text-field--end">'+
					'<input id="offsetY" type="number" value="0" class="mdc-text-field__input">'+
					'<label class="mdc-floating-label" for="text-field-filled">Offset Y</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
				'</div>'+	
			'</div>'+
			'</div>';	

		var textOn=this.html.querySelector("#textOn");
		textOn.addEventListener("click",this.onClickHandler.bind(this));

		var fontButton=this.html.querySelector("#fontbutton");
		fontButton.addEventListener("click",this.onClickFontButton.bind(this));

		this.html.querySelector("#expandbutton").addEventListener("click",this.propertyGroupHandler.bind(this));

		
		this.html.querySelector("#normal").addEventListener("click",this.changeInputHandler.bind(this,"style","normal"));
		this.html.querySelector('#italic').addEventListener("click",this.changeInputHandler.bind(this,"style","italic"));
		this.html.querySelector('#bold').addEventListener("click",this.changeInputHandler.bind(this,"style","bold"));
		this.html.querySelector('#italic-bold').addEventListener("click",this.changeInputHandler.bind(this,"style","italic-bold"));
		this.menuStyle = mdc.menu.MDCMenu.attachTo(this.html.querySelector("#menuStyle"));
		this.html.querySelector("#style").addEventListener("click",this.menuHandler.bind(this,this.menuStyle));

		
		this.html.querySelector("#left").addEventListener("click",this.changeInputHandler.bind(this,"align","left"));
		this.html.querySelector('#center').addEventListener("click",this.changeInputHandler.bind(this,"align","center"));
		this.html.querySelector('#right').addEventListener("click",this.changeInputHandler.bind(this,"align","right"));
		this.menuAlign = mdc.menu.MDCMenu.attachTo(this.html.querySelector('#menuAlign'));
		this.html.querySelector("#align").addEventListener("click",this.menuHandler.bind(this,this.menuAlign));
	}

// Handlers
	changeInputHandler(field,style){
		var input=this.html.querySelector("#"+field);
		input.value=style;
		if ("createEvent" in document) {
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("change", false, true);
			input.dispatchEvent(evt);
		}
	}

	menuHandler(menu){
		menu.open=true;
	}

	onClickHandler(){
		(this.html.querySelector("#textOn").checked) ?	this.html.classList.remove("properties-section--disable"):
														this.html.classList.add("properties-section--disable");
	}

	onClickFontButton(){
		var input = this.html.querySelector("#font");
		Command.openAssetsCmd(input,input.value,"Font");
	}

	propertyGroupHandler(){
		var element=this.html.querySelector(".properties-panel");
		var expandButton=this.html.querySelector("#expandbutton");
		element.classList.toggle("open");
		element.classList.contains("open") ? expandButton.innerHTML='expand_less' : expandButton.innerHTML='expand_more';
		if (element.classList.contains("open")) {
			var sceneID=document.querySelector(".sceneselected").id;
			var actorID=document.querySelector(".actorselected").id;
			CmdManager.changeActorPropertyCmd(sceneID,actorID,"textOn",true);
		}
	}

}