class GamePropertiesView {

    constructor(gameModel) {   
		 this.html = document.createElement("div");
		 this.html.className +="game-properties side-sheet-content";
		 this.html.style.display="none";
		 this.html.innerHTML =
			'<header class="mdc-top-app-bar--dense properties-bar">'+
				'<div class="mdc-top-app-bar__row">'+
					'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
						'<span class="mdc-toolbar__title">Game</span>'+
					'</section>'+
					'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
						'<button id="addproperty" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">add_circle_outline</button>'+
						'<button id="closebutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">close</button>'+
					'</section>'+
				'</div>'+
			'</header>'+
			'<ul class="mdc-list properties-list">'+
				'<li class="game-properties-settings"></li>'+
				'<li class="game-properties-sound"></li>'+
				'<li class="game-properties-physics"></li>'+						
				'<li class="properties-new"></li>'+
			'</ul>';
		this.html.querySelector("#closebutton").addEventListener("click",SideSheetView.closeSheetHandler);
		this.html.querySelector("#addproperty").addEventListener("click",this.addPropertyHandler.bind(this));	
		this.createFrame();
	}

	addView(html) {
		var children=this.html.querySelector("."+html.classList[0]);
		children.parentNode.replaceChild(html,children);
	}

	updateGameProperty(property,value) {
		var element=this.html.querySelector("#"+property);
	//	console.log(property,value);
		(element.type=="checkbox") ? element.value=element.checked=Boolean(value) : element.value=value;
		if (property == "soundOn") this.soundView.onClickHandler();
		if (property == "physicsOn") this.physicsView.onClickHandler();
		element.focus();
	}

//Frame
	createFrame(){
		this.settingsView= new GamePropertiesSettingsView();
		this.addView(this.settingsView.html);
		this.soundView= new GamePropertiesSoundView();
		this.addView(this.soundView.html);
		this.physicsView= new GamePropertiesPhysicsView();
		this.addView(this.physicsView.html);

		var textFields=this.html.querySelectorAll('.mdc-text-field');
		textFields.forEach(element => {	
			mdc.textField.MDCTextField.attachTo(element);
		}); 

		var inputs=this.html.querySelectorAll("input");
		inputs.forEach(element=>{
			element.addEventListener("input",this.onChangeInputHandler.bind(this,element));
		})
	}

//Handlers
	addPropertyHandler(){
		var dialog = new NewPropertyDialogView("game-properties");
		var editorFrame=document.querySelector(".editor-frame-root");
		editorFrame.appendChild(dialog.html);
		dialog.html.querySelector("#propertyname").focus();
	}

	onChangeInputHandler(element){
		this.property=element.id;
		switch (element.type){
			case "checkbox": 	this.value=Boolean(element.checked); break;
			case "number" : 	this.value=Number(element.value); break;
			case "text" : 		this.value=String(element.value).trim(); break;
			case "color" : 		this.value=String(element.value); break;
		}
		CmdManager.changeGamePropertyCmd(this.property,this.value);
	}

//Utilities
	update(gameModel){
		Object.keys(gameModel.properties).forEach(element => {
			this.updateGameProperty(element,gameModel.properties[element]);
			document.activeElement.blur();
		});
		this.newPropertiesView= new NewPropertiesView(gameModel.newProperties);
		this.addView(this.newPropertiesView.html);

	}

}
