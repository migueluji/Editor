class ActorPropertiesView {

    constructor(actorModel) {   
		 this.html = document.createElement("div");
		 this.html.className +="actor-properties side-sheet-content";
		 this.html.style.display="none";
		 this.html.innerHTML =
			'<header class="mdc-top-app-bar--dense properties-bar">'+
				'<div class="mdc-top-app-bar__row">'+
					'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
						'<span class="mdc-toolbar__title">Actor Properties</span>'+
					'</section>'+
					'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
						'<button id="codebutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">code</button>'+
						'<button id="addproperty" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">add_circle_outline</button>'+
						'<button id="closebutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">close</button>'+
					'</section>'+
				'</div>'+
			'</header>'+
			'<ul class="mdc-list properties-list">'+
				'<li class="actor-properties-settings"></li>'+
				'<li class="actor-properties-sprite"></li>'+
				'<li class="actor-properties-text"></li>'+
				'<li class="actor-properties-sound"></li>'+
				'<li class="actor-properties-physics"></li>'+
				'<li class="properties-new"></li>'+
			'</ul>';
		this.html.querySelector("#codebutton").addEventListener("click",Command.openActorScriptsCmd.bind(Command));
		this.html.querySelector("#closebutton").addEventListener("click",SideSheetView.closeSheetHandler);
		this.html.querySelector("#addproperty").addEventListener("click",this.addPropertyHandler.bind(this));
		this.createFrame(actorModel);
	}

	addView(html) {
		var children=this.html.querySelector("."+html.classList[0]);
		children.parentNode.replaceChild(html,children);
	}

	updateActorName(name){
		var title = this.html.querySelector(".mdc-toolbar__title");
		title.innerText=name;
	}

	updateActorProperty(property,value) {
		var element=this.html.querySelector("#"+property);
		(element.type==="checkbox") ? element.value=element.checked=Boolean(value) : element.value=value;
		if (property == "visible") this.spriteView.onClickHandler();
		if (property == "write") this.textView.onClickHandler();
		if (property == "play") this.soundView.onClickHandler();
		if (property == "active") this.physicsView.onClickHandler();
		element.focus();
	}

//Frame
	createFrame(actorModel){
		this.settingsView= new ActorPropertiesSettingsView();
		this.addView(this.settingsView.html);
		this.spriteView= new ActorPropertiesSpriteView();
		this.addView(this.spriteView.html);
		this.textView= new ActorPropertiesTextView();
		this.addView(this.textView.html);
		this.soundView= new ActorPropertiesSoundView();
		this.addView(this.soundView.html);
		this.physicsView= new ActorPropertiesPhysicsView();
		this.addView(this.physicsView.html);

		var textFields=this.html.querySelectorAll('.mdc-text-field');
		textFields.forEach(element => {	
			mdc.textField.MDCTextField.attachTo(element);
		}); 

		var inputs=this.html.querySelectorAll("input");
		inputs.forEach(element=>{
			element.addEventListener("change",this.onChangeInputHandler.bind(this,element));
		})
	}

//Handlers
	addPropertyHandler(){
		var dialog = new NewPropertyDialogView("actor-properties");
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
		}
		var sceneID=document.querySelector(".sceneselected").id;
		var actorID=document.querySelector(".actorselected").id;
		CmdManager.changeActorPropertyCmd(sceneID,actorID,this.property,this.value);
	}

//Utilities
	update(actorModel){
		this.updateActorName(actorModel.name);
		Object.keys(actorModel.properties).forEach(element => {
			this.updateActorProperty(element,actorModel.properties[element]);
		});
		this.newPropertiesView= new NewPropertiesView(actorModel.newProperties);
		this.addView(this.newPropertiesView.html);
	}

}
