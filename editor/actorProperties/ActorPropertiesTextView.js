class ActorPropertiesTextView {

    constructor() {   
		 this.html = document.createElement("li");
		 this.html.className +="actor-properties-text properties-section";
		 this.html.innerHTML =
			'<li class="mdc-list-item mdc-ripple-upgraded properties-section-title">'+
				'<button id="expandbutton" style="margin-right:8px" class="mdc-icon-button material-icons mdc-top-app-bar__action-item">expand_more</button>'+				'Text'+
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
				'<label style="width: -webkit-fill-available;" class="half-text mdc-text-field mdc-text-field--filled">'+
					'<span class="mdc-text-field__ripple"></span>'+
					'<input id="text" value="Text" style="width:212px" class="mdc-text-field__input" type="text">'+
					'<span class="mdc-floating-label" >Text</span>'+
					'<button id="textbutton" class="mdc-button mdc-button-upgraded upload-button" style="top:10px">'+
						'<i class="material-icons mdc-button_icon">add_box</i>'+
					'</button>'+
					'<span class="mdc-line-ripple"></span>'+
				'</label>'+
				'<label style="width: -webkit-fill-available;" class="half-text mdc-text-field mdc-text-field--filled">'+
					'<span class="mdc-text-field__ripple"></span>'+
					'<input id="font" value="Font" style="width:212px" class="mdc-text-field__input" type="text">'+
					'<span class="mdc-floating-label" >Font</span>'+
					'<button id="fontbutton" class="mdc-button mdc-button-upgraded upload-button" style="top:10px">'+
						'<i class="material-icons mdc-button_icon">folder</i>'+
					'</button>'+
					'<span class="mdc-line-ripple"></span>'+
				'</label>'+
				'<div class="two-properties">'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input  style="transform: translateY(8px);"  id="fill" value="#ffffff" class="mdc-text-field__input" type="color">'+
						'<span class="mdc-floating-label" >Fill</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="size" value="12" min="1" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Size</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
				'</div>'+
				'<div class="two-properties">'+	
					'<div id="style" style="min-width:auto" class="half-text mdc-select mdc-select--filled">'+
						'<div style="width:auto;background:white" class="mdc-select__anchor">'+
							'<span class="mdc-select__ripple"></span>'+
							'<span class="mdc-select__selected-text"></span>'+
							'<span class="mdc-select__dropdown-icon">'+
								'<svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">'+
									'<polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon>'+
									'<polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15"></polygon>'+
								'</svg>'+
							'</span>'+
							'<span class="mdc-floating-label">Style</span>'+
							'<span class="mdc-line-ripple"></span>'+
						'</div>'+
						'<div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">'+
							'<ul class="mdc-list">'+
								'<li class="mdc-list-item mdc-list-item--selected"  data-value="Normal">'+
									'<span class="mdc-list-item__ripple"></span>'+
									'<span class="mdc-list-item__text">Normal</span>'+
								'</li>'+
								'<li class="mdc-list-item" data-value="Italic">'+
									'<span class="mdc-list-item__ripple"></span>'+
									'<span class="mdc-list-item__text">Italic</span>'+
								'</li>'+
								'<li class="mdc-list-item" data-value="Bold">'+
								'<span class="mdc-list-item__ripple"></span>'+
								'<span class="mdc-list-item__text">Bold</span>'+
							'</li>'+
							'</ul>'+
						'</div>'+
					'</div>'+		
					'<div id="align" style="min-width:auto" class="half-text mdc-select mdc-select--filled">'+
						'<div style="width:auto;background:white" class="mdc-select__anchor">'+
							'<span class="mdc-select__ripple"></span>'+
							'<span class="mdc-select__selected-text"></span>'+
							'<span class="mdc-select__dropdown-icon">'+
								'<svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">'+
									'<polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon>'+
									'<polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15"></polygon>'+
								'</svg>'+
							'</span>'+
							'<span class="mdc-floating-label">Align</span>'+
							'<span class="mdc-line-ripple"></span>'+
						'</div>'+
						'<div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">'+
							'<ul class="mdc-list">'+
								'<li class="mdc-list-item mdc-list-item--selected"  data-value="Left">'+
									'<span class="mdc-list-item__ripple"></span>'+
									'<span class="mdc-list-item__text">Left</span>'+
								'</li>'+
								'<li class="mdc-list-item" data-value="Center">'+
									'<span class="mdc-list-item__ripple"></span>'+
									'<span class="mdc-list-item__text">Center</span>'+
								'</li>'+
								'<li class="mdc-list-item" data-value="Right">'+
								'<span class="mdc-list-item__ripple"></span>'+
								'<span class="mdc-list-item__text">Right</span>'+
							'</li>'+
							'</ul>'+
						'</div>'+
					'</div>'+	
				'</div>'+
				'<div class="two-properties">'+	
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="offsetX" value="1" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Offset X</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
					'<label class="half-text mdc-text-field mdc-text-field--filled">'+
						'<span class="mdc-text-field__ripple"></span>'+
						'<input id="offsetY" value="1" class="mdc-text-field__input" type="number">'+
						'<span class="mdc-floating-label" >Offset Y</span>'+
						'<span class="mdc-line-ripple"></span>'+
					'</label>'+
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