class GamePropertiesNewView {

    constructor(newProperties) {   
		this._html = document.createElement("li");
		this._html.className +="game-properties-new";
		var textFields=this._html.querySelectorAll('.mdc-text-field');
			textFields.forEach(element => {	
				mdc.textField.MDCTextField.attachTo(element);
		}); 

		this.init(newProperties);
	}

	get html() {  
        return this._html;
	}

	addProperty (html,position){
		(this.html.childNodes.length===position) ? this._html.appendChild(html) :
						 this._html.childNodes[position].parentNode.insertBefore(html,this._html.childNodes[position]);
	}

	removeProperty(property){
		var child=this._html.querySelector('#'+property).parentNode.parentNode.parentNode;
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
				value ? this._html.querySelector("#"+property).checked=true : this._html.querySelector("#"+property).checked=false;
			}
        });
	}
}
