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
				'<div class="mdc-text-field mdc-text-field--with-trailing-icon mdc-ripple-upgraded text-field--full">'+
					'<input id="text" type="text" value="value" class="mdc-text-field__input">'+ // text
						'<label class="mdc-floating-label" for="text-field-filled">Text</label>'+
						'<button id="textbutton" class="mdc-button mdc-button-upgraded upload-button" style="top:10px">'+
							'<i class="material-icons mdc-button_icon">add_box</i>'+
						'</button>'+
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
					'<div style="width:50%; margin-top:4px">'+
						'<div id="style" type="text" class="mdc-select">'+
							'<div class="mdc-select__anchor" style="width:100%">'+
								'<i class="mdc-select__dropdown-icon"></i>'+
								'<div class="mdc-select__selected-text"></div>'+
								'<span class="mdc-floating-label mdc-floating-label--float-above">Style</span>'+
								'<div class="mdc-line-ripple"></div>'+
							'</div>'+
							'<div class="mdc-select__menu mdc-menu mdc-menu-surface" style="width:100%">'+
								'<ul class="mdc-list">'+
									'<li class="mdc-list-item" data-value="Normal">Normal</li>'+
									'<li class="mdc-list-item" data-value="Italic">Italic</li>'+
									'<li class="mdc-list-item" data-value="Bold">Bold</li>'+
								
								'</ul>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div style="width:50%; margin-top:4px">'+
						'<div id="align" type="text" class="mdc-select">'+
							'<div class="mdc-select__anchor" style="width:100%">'+
								'<i class="mdc-select__dropdown-icon"></i>'+
								'<div class="mdc-select__selected-text"></div>'+
								'<span class="mdc-floating-label mdc-floating-label--float-above">Align</span>'+
								'<div class="mdc-line-ripple"></div>'+
							'</div>'+
							'<div class="mdc-select__menu mdc-menu mdc-menu-surface" style="width:100%">'+
								'<ul class="mdc-list">'+
									'<li class="mdc-list-item" data-value="Left">Left</li>'+
									'<li class="mdc-list-item" data-value="Center">Center</li>'+
									'<li class="mdc-list-item" data-value="Right">Right</li>'+
								'</ul>'+
							'</div>'+
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

		var textButton=this.html.querySelector("#textbutton");
		textButton.addEventListener("click",this.onClickTextButton.bind(this));

		this.html.querySelector("#expandbutton").addEventListener("click",this.propertyGroupHandler.bind(this));

	}

// Handlers
	onClickHandler(){
		(this.html.querySelector("#textOn").checked) ?	this.html.classList.remove("properties-section--disable"):
														this.html.classList.add("properties-section--disable");
	}

	onClickFontButton(){
		var input = this.html.querySelector("#font");
		Command.openAssetsCmd(input,input.value,"Font");
	}

	onClickTextButton(){
		var input=this.html.querySelector("#text");
		var dialog = new ChoosePropertyView(input);
		var editorFrame=document.querySelector(".editor-frame-root");
		editorFrame.appendChild(dialog.html);
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