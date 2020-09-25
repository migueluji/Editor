class CardView {

	constructor(node,icon,color) {  
		var text=node.type.replace("_"," ");
		this.html = document.createElement("div");
		this.html.className +="mdc-card action-card";
		this.html.style="display:block";
		this.html.innerHTML =
		  	'<div class="card-background"></div>'+
			'<div style=" -webkit-user-select: none;" class="mdc-card__primary-action card-title '+color+'">'+
				'<div class="circle">'+
					'<button class="nodeIcon mdc-icon-button material-icons mdc-top-app-bar__action-item">'+icon+'</button>'+
				'</div>'+
				'<span class="nodelabel mdc-list-item__text">'+
					'<span class="mdc-list-item__primary-text card-title_label">'+text+'</span>'+
				'</span>'+
				'<button id="close" class="chipIcon ge-chip-button mdc-icon-button material-icons mdc-top-app-bar__action-item">close</button>'+
			'</div>'+
			'<div class="mdc-card__actions"></div>';
		if (color=="if") this.html.classList.add("moveup");
		var insertPoint = this.html.querySelector(".mdc-card__actions"); // inserta los campos en la card
		this.fields = new ParametersView(node.parameters);
		insertPoint.parentNode.replaceChild(this.fields.html,insertPoint);
	}
}