class DoView extends NodeView {

    constructor() {   
		super();
		this.html = document.createElement("div");
		this.html.className +="node element";
		this.html.innerHTML=
			'<div class="mdc-chip">'+
			'</div>'+
			'<div class="mdc-card">'+
			'</div>';
	}

	addView(node){
		this.html.id=node.id;
		var chip=new ChipView(this.html.id);
		var children = this.html.querySelector(".mdc-chip");
		children.parentNode.replaceChild(chip.html,children);
		this.html.querySelector(".circle").classList.add("do");

		var card=new CardView(this.html.id);
		card.html.querySelector(".card-title").classList.add("do");
		children = this.html.querySelector(".mdc-card");
		children.parentNode.replaceChild(card.html,children);

		var labels=this.html.querySelectorAll(".mdc-list-item__primary-text");
		labels.forEach(i=>i.innerHTML=node.type);
		this.html.querySelector(".mdc-list-item__secondary-text").innerHTML=node.expression.text;
		
		var icon=null; 
		var view=null;
		switch(node.type){
			case "Edit" : icon="edit"; view = new EditView(node.expression);break;
			// case "Spawn" : icon="person_add";view = new SpawnView(node.expression);break;
			// case "Delete" : icon="delete";view = new DeleteView(node.expression);break;
			// case "Animate" : icon="movie_creation";view = new AnimateView(node.expression);break;
			// case "Play" : icon="volume_up";view = new PlayView(node.expression);break;
			// case "Move" : icon="navigation";view = new MoveView(node.expression);break;
			// case "Move To" : icon="place";view = new MoveToView(node.expression);break;
			// case "Rotate" : icon="rotate_left";view = new RotateView(node.expression);break;
			// case "Rotate To" : icon="rotate_90_degrees_ccw";view = new EditView(node.expression);break;
			// case "Push" : icon="call_made";view = new RotateToView(node.expression);break;
			// case "Push To" : icon="keyboard_tab";view = new PushView(node.expression);break;
			// case "Torque" : icon="sync";view = new TorqueView(node.expression);break;
			// case "Go To" : icon="input";view = new GoToView(node.expression);break;
			// case "Add" : icon="present_to_all";view = new AddView(node.expression);break;
			// case "Remove" : icon="cancel_presentation";view = new RemoveView(node.expression);break;
			default: icon="edit"; view = new EditView(node.expression);break;
		 }
		
		var icons=this.html.querySelectorAll(".nodeIcon");
		icons.forEach(i=>i.innerHTML=icon);
		var insertPoint = this.html.querySelector(".mdc-card__actions");
		insertPoint.parentNode.replaceChild(view.html,insertPoint);
	}
}