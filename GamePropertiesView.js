class GamePropertiesView {

    constructor(gameModel) {   
		 this._html = document.createElement("div");
		 this._html.className +="game-properties side-sheet-content";
		 this._html.style.display="none";
		 this._html.innerHTML =
			'<header class="mdc-top-app-bar--dense properties-bar">'+
				'<div class="mdc-top-app-bar__row">'+
					'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
						'<span class="mdc-toolbar__title">Game Properties</span>'+
					'</section>'+
					'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
						'<button id="closebutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="close" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">close</button>'+
					'</section>'+
				'</div>'+
			'</header>'+
			'<ul class="mdc-list properties-list">'+
				'<li class="game-properties-settings"></li>'+
				'<li class="game-properties-sound"></li>'+
				'<li class="game-properties-physics"></li>'+						
				'<li class="game-properties-new"></li>'+
				'<li style="height:44px"></li>'+
				'<button id="addproperty" class="mdc-fab mdc-ripple-upgraded add-property-button" aria-label="Add Scene"'+
					'style="--mdc-ripple-fg-size:33px; --mdc-ripple-fg-scale:2.70291; --mdc-ripple-fg-translate-start:5.5px, 19.6875px; --mdc-ripple-fg-translate-end:11.5px, 11.5px;">'+
						'<i class="mdc-fab__icon material-icons">add</i>'+
				'</button>'+
			'</ul>';
		this._html.querySelector("#closebutton").addEventListener("click",SideSheetView.closeSheetHandler);
		this._html.querySelector("#addproperty").addEventListener("click",this.addPropertyHandler.bind(this));
		
		this.createFrame(gameModel);
		this.init(gameModel);
	}
	
	get html() {  
        return this._html;
	}

	addView(html) {
		var children=this._html.querySelector("."+html.classList[0]);
		children.parentNode.replaceChild(html,children);
	}

	updateGameProperty(property,value) {
		var element=this._html.querySelector("#"+property);
		(element.type==="checkbox") ? element.value=element.checked=Boolean(value) : element.value=value;
		if (property == "play") this._soundView.onClickHandler();
      	if (property == "physics") this._physicsView.onClickHandler();
		element.focus();
	}

//Frame
	createFrame(gameModel){
		this._settingsView= new GamePropertiesSettingsView();
		this.addView(this._settingsView.html);
		this._soundView= new GamePropertiesSoundView();
		this.addView(this._soundView.html);
		this._physicsView= new GamePropertiesPhysicsView();
		this.addView(this._physicsView.html);

		var textFields=this._html.querySelectorAll('.mdc-text-field');
		textFields.forEach(element => {	
			mdc.textField.MDCTextField.attachTo(element);
		}); 

		var inputs=this._html.querySelectorAll("input");
		inputs.forEach(element=>{
			element.addEventListener("change",this.onChangeInputHandler.bind(this,element));
		})

		this._newPropertiesView= new GamePropertiesNewView(gameModel.newProperties);
		this.addView(this._newPropertiesView.html);

	}

//Handlers
	addPropertyHandler(){
		var dialog = new NewPropertyDialogView("game-properties");
		var editorFrame=document.querySelector(".editor-frame-root");
		editorFrame.appendChild(dialog.html);
		dialog.html.querySelector("#propertyname").focus();
	}

	onChangeInputHandler(element){
		this._property=element.id;
		switch (element.type){
			case "checkbox": 	this._value=Boolean(element.checked); break;
			case "number" : 	this._value=Number(element.value); break;
			case "text" : 		this._value=String(element.value).trim(); break;
		}
		if (element.id==="name" && this._value==="") this._value="Untitled Game";
		CmdManager.changeGamePropertyCmd(this._property,this._value);
	}

//Utilities
	init(gameModel){
		Object.keys(gameModel.properties).forEach(element => {
			this.updateGameProperty(element,gameModel.properties[element]);
		});
	}

}
