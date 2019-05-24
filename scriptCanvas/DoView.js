class DoView extends NodeView {

  constructor() {   
			super();
			this.html.classList.add("element");
	}

	createFields(node){
		this.html.querySelector(".circle").classList.add("do");
		var fields=null;
		switch(node.type){
			case "Edit" : this.icon="edit"; break;
			case "Spawn" : this.icon="person_add";break;
		//	case "Delete" : this.icon="delete";break;
			case "Animate" : this.icon="movie_creation";break;
			case "Play" : this.icon="volume_up";break;
			case "Move" : this.icon="navigation";break;
			case "Move To" : this.icon="place";break;
			case "Rotate" : this.icon="rotate_left";break;
			case "Rotate To" : this.icon="rotate_90_degrees_ccw";break;
			case "Push" : this.icon="call_made";break;
			case "Push To" : this.icon="keyboard_tab";break;
			case "Torque" : this.icon="sync";break;
			case "Go To" : this.icon="input";break;
			case "Add" : this.icon="present_to_all";break;
		//	case "Remove" : this.icon="cancel_presentation";break;
		}
		this.html.querySelector(".card-title").classList.add("do");
		var insertPoint = this.html.querySelector(".mdc-card__actions"); // inserta los campos en la card
		this.fields = new ParametersView(node.parameters);
		insertPoint.parentNode.replaceChild(this.fields.html,insertPoint);
	}
}