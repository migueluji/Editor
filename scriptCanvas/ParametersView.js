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
			var option=null;
			var typeOf=null;
			switch(field){
				case "operation" : type="select"; option=["Less","Less Equal","Equal","Greater Equal","Greater","Different"];break;
				case "tag" : type="select"; option=Command.getTagListCmd(); break;
				case "mode" : type="select"; option=["Down","Up","Is Over","Tap"];break;
				case "key_Mode" : type="select"; option=["Pressed","Down","Up"];break;
				case "actor" : type="select"; option=Command.getActorListCmd();break;
				case "scene" : type="select"; option=Command.getSceneListCmd(); break;
				case "animation" : type="file"; option="Animation"; break;
				case "key" : type="key"; break;
				case "sound" : type="file";option="Sound" ; break;
				case "element" : type="select"; option=["Game","Me"]; option=option.concat(Command.getActorListCmd()); break;
				case "property" : type="select"; parameters.hasOwnProperty("value") ? typeOf="all" : typeOf="boolean";
								option=Command.getPropertiesListCmd(parameters["element"],typeOf); break;
				case "value": {
					switch (parameters["property"]){
						case "image" : type="file"; option="Image";break;
						case "sound" : type="file"; option="Sound";break;
						case "font" : type="file"; option="Font";break;
						case "color" : type="color"; break;
						case "text" : type="text"; break;
						case "tags" : type="tags"; break;
 						case "backgroundColor" : type="color";break;
						case "fill" : type="color"; break;
						case "collider" : type="select"; option=["Circle","Box","Polygon"];break;
						case "tags" : type="select"; option=Command.getTagListCmd(); break;
						case "style" : type="select"; option=["Normal","Italic","Bold","Italic-Bold"];break;
						case "align" : type="select"; option=["Left","Center","Right"];break;
						case "type" : type="select"; option=["Kinematic","Dynamic","Static"];break;
						case "currentScene": type ="select"; option=Command.getSceneListCmd(); break;
						default: type="input";break;
					}; break;
				};	
				default : type="input";break;
			}
		//	console.log("field",typeof parameters[field]);
			if ((typeof parameters[field]=="boolean"))	type="boolean";
			var fieldView = new FieldView(type,field,parameters[field],option);
			this.html.appendChild(fieldView.html);	
		};
	}

	removeFields(){
		while (this.html.firstChild){ // elimina todos los elementos de la lista
			this.html.removeChild(this.html.firstChild);
		};
	}

// Handlers
	editChangeHandler(){
		var keys=Command.getPropertiesListCmd(this.parameters["element"],"boolean");
		if (this.parameters.hasOwnProperty("value")) // only for edit, not for check
			(keys.includes(this.parameters["property"]))?this.parameters["value"]=false:this.parameters["value"]=null;
		if (this.parameters["property"] == "color" || this.parameters["property"]=="backgroundColor" || this.parameters["property"]=="fill") this.parameters["value"]="#ffffff";
		if (this.parameters["property"] == "image") this.parameters["value"]="";
		this.removeFields();
		this.addFields(this.parameters);
		this.addListeners();
	}

	changeInputHandler(input){
	//	console.log("change input",input);
		var value=null;
		switch (input.type){
			case "checkbox": value= Boolean(input.checked);break;
			default: value=input.value; break;
		}
		this.parameters[input.id]=value;
	 }
	 
	 changeSelectHandler(select){
		this.parameters[select.id]=select.querySelector('.mdc-list-item--selected').dataset.value;
		if ((select.id=="element") || (select.id=="property")) this.editChangeHandler();
	 }

	 keyDownHandler(key,e){
		e.preventDefault();
		key.value=e.key;
		if (key.value===" ") key.value="Space";
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

		var keys=this.html.querySelectorAll("#Key");
		keys.forEach(key=>{
			key.addEventListener("keydown",this.keyDownHandler.bind(this,key));
		});
	 }
}
