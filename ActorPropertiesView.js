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
						'<button id="closebutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="close" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">close</button>'+
					'</section>'+
				'</div>'+
			'</header>'+
			'<ul class="mdc-list properties-list">'+
				'<li class="actor-properties-settings"></li>'+
				'<li class="actor-properties-render"></li>'+
				'<li class="actor-properties-text"></li>'+
				'<li class="actor-properties-sound"></li>'+
				'<li class="actor-properties-physics"></li>'+
				'<li class="properties-new"></li>'+
				'<li style="height:44px"></li>'+
				'<button id="addproperty" class="mdc-fab mdc-ripple-upgraded add-property-button" aria-label="Add Actor"'+
					'style="background:red; --mdc-ripple-fg-size:33px; --mdc-ripple-fg-scale:2.70291; --mdc-ripple-fg-translate-start:5.5px, 19.6875px; --mdc-ripple-fg-translate-end:11.5px, 11.5px;">'+
						'<i class="mdc-fab__icon material-icons">add</i>'+
				'</button>'+
			'</ul>';
		this.html.querySelector("#closebutton").addEventListener("click",SideSheetView.closeSheetHandler);
		this.html.querySelector("#addproperty").addEventListener("click",this.addPropertyHandler.bind(this));
		this.createFrame(actorModel);
		this.update(actorModel);
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
		if (property == "visible") this.renderView.onClickHandler();
		if (property == "write") this.textView.onClickHandler();
		if (property == "play") this.soundView.onClickHandler();
		if (property == "active") this.physicsView.onClickHandler();
		element.focus();
	}

//Frame
	createFrame(actorModel){
		this.settingsView= new ActorPropertiesSettingsView();
		this.addView(this.settingsView.html);
		this.renderView= new ActorPropertiesSpriteView();
		this.addView(this.renderView.html);
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

		this.newPropertiesView= new NewPropertiesView(actorModel.newProperties);
		this.addView(this.newPropertiesView.html);
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
		if (element.id==="name" && this.value==="") this.value="Untitled Game";
		var sceneID=document.querySelector(".mdc-list-item--sceneselected").parentElement.id;
		var actorID=document.querySelector(".mdc-list-item--actorselected").parentElement.id;
		CmdManager.changeActorPropertyCmd(sceneID,actorID,this.property,this.value);
	}

//Utilities
	update(actorModel){
		this.updateActorName(actorModel.name);
		Object.keys(actorModel.properties).forEach(element => {
			this.updateActorProperty(element,actorModel.properties[element]);
		});
	}

}
