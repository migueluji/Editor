class ParametersView  {

    constructor(parameters) {  
			this.parameters={};
			Object.assign(this.parameters,parameters);
			this.html = document.createElement("div");
			this.html.className +="mdc-card__actions node-panel";
			this.addFields(parameters);
			this.addListeners();
	}

	addFields(parameters){
		for (const field in parameters) {
			var type;
			var list=null;
			switch(field){
				case "operation" : type="select"; list=["Less","Less Equal","Equal","Greater Equal","Greater","Different"];break;
				case "tags" : type="tags"; break;
				case "mode" : type="select"; list=["Down","Up","Is Over","Tap"];break;
				case "key_Mode" : type="select"; list=["Pressed","Down","Up"];break;
				case "actor" : type="select"; list=Command.getActorListCmd();break;
				case "scene" : type="select"; list=Command.getSceneListCmd(); break;
				case "animation" : type="file"; list="Animation"; break;
				case "key" : type="key"; break;
				case "sound_File" : type="file";list="Sound" ; break;
				case "property" : type="properties";(parameters.hasOwnProperty("value")) ? list="All" : list="Boolean";break;
				case "value": {
					var property=parameters["property"].split(".")[1];
					switch (property){
						case "image" : type="file"; list="Image";break;
						case "sound" : type="file"; list="Sound";break;
						case "soundtrack" : type="file"; list="Sound";break;
						case "font" : type="file"; list="Font";break;
						case "color" : type="color"; break;
						case "text" : type="text"; list="All-Text"; break;
						case "tags" : type="tags"; break;
 						case "backgroundColor" : type="color";break;
						case "fill" : type="color"; break;
						case "collider" : type="select"; list=["Circle","Box"];break;
						case "style" : type="select"; list=["Normal","Italic","Bold"];break;
						case "align" : type="select"; list=["Left","Center","Right"];break;
						case "type" : type="select"; list=["Dynamic","Kinematic","Static"];break;
						case "currentScene": type ="select"; list=Command.getSceneListCmd(); break;
						default: type="input";break;
					}; break;
				};	
				default : type="input";break;
			}
			if ((typeof parameters[field]=="boolean"))	type="boolean";
			var fieldView = new FieldView(type,field,parameters[field],list,null);
			this.html.appendChild(fieldView.html);	
		};
	}

	removeFields(){
		while (this.html.firstChild){ // remove all items from the list
			this.html.removeChild(this.html.firstChild);
		};
	}

// Handlers
	editChangeHandler(){
		var parameter=this.parameters["property"].split(".");
		var element=parameter[0];
		var property=parameter[1];
		var keys=Command.getPropertiesListCmd(element,"Boolean");
		if (this.parameters.hasOwnProperty("value")) // only for edit, not for check
			(keys.includes(property))?this.parameters["value"]=false:this.parameters["value"]=null;
		if (property=="color" || property=="backgroundColor" || property=="fill") this.parameters["value"]="#ffffff";
		else if (property=="image") this.parameters["value"]="";
		this.removeFields();
		this.addFields(this.parameters);
		this.addListeners();
	}

	changeInputHandler(input){
		var value=null;
		switch (input.type){
			case "checkbox": value= Boolean(input.checked);break;
			default: value=input.value; break;
		}
		this.parameters[input.id]=value;
		if (input.id=="property") this.editChangeHandler();
	 }
	 
	 changeSelectHandler(select){
		this.parameters[select.id]=select.querySelector('.mdc-list-item--selected').dataset.value;
	 }

	 keyDownHandler(key,e){
		e.preventDefault();
		key.value=e.code;
		this.changeInputHandler(key);
	 }

// Utils
	 addListeners(){
		var textFields=this.html.querySelectorAll('.mdc-text-field');
		textFields.forEach(i=> {
			mdc.textField.MDCTextField.attachTo(i);
		});

		var inputs=this.html.querySelectorAll("input");
		inputs.forEach(input=>{
			input.addEventListener("input",this.changeInputHandler.bind(this,input));
		});

		var selects=this.html.querySelectorAll(".mdc-select");
		selects.forEach(select=>{
			mdc.select.MDCSelect.attachTo(select);
			select.addEventListener("MDCSelect:change",this.changeSelectHandler.bind(this,select));
		})

		var keys=this.html.querySelectorAll("#key");
		keys.forEach(key=>{
					key.addEventListener("keydown",this.keyDownHandler.bind(this,key));
		});
	 }
}
