class GamePropertiesNewView {

    constructor(newProperties) {   
		this.html = document.createElement("li");
		this.html.className +="game-properties-new";
		var textFields=this.html.querySelectorAll('.mdc-text-field');
			textFields.forEach(element => {	
				mdc.textField.MDCTextField.attachTo(element);
		}); 
		this.init(newProperties);
	}

	addProperty (html,position){
		(this.html.childNodes.length===position) ? this.html.appendChild(html) :
						 this.html.childNodes[position].parentNode.insertBefore(html,this.html.childNodes[position]);
	}

	removeProperty(property){
		var child=this.html.querySelector('#'+property).parentNode.parentNode.parentNode;
		child.parentNode.removeChild(child);
	}

// Utils
	init (newProperties){
		var property;
		var value;
		var position=0;
		Object.entries(newProperties).forEach(element => {
			property=element[0];
			value=element[1];
			var propertyView = new PropertyView(property,value);
			this.addProperty(propertyView.html,position);
			position++;
			if (value!=="number") {
				value ? this.html.querySelector("#"+property).checked=true : this.html.querySelector("#"+property).checked=false;
			}
        });
	}
}
