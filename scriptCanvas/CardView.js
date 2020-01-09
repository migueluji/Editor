class CardView {

	constructor(node,icon,color) {  
		this.view=null;
		this.html = document.createElement("div");
		this.html.className +="mdc-card action-card";
		this.html.innerHTML =
		  	'<div class="card-background"></div>'+
			'<div style=" -webkit-user-select: none;" class="mdc-card__primary-action card-title '+color+'">'+
				'<div  style="pointer-events:none" class="circle">'+
					'<i  class="nodeIcon material-icons mdc-chip_icon">'+icon+'</i>'+
				'</div>'+
				'<span style="pointer-events:none" class="nodelabel mdc-list-item__text">'+
					'<span style="pointer-events:none" class="mdc-list-item__primary-text card-title_label">'+node.type+'</span>'+
				'</span>'+
				 '<i id="close" class="chipIcon ge-chip-button material-icons">close</i>'+
			'</div>'+
			'<div class="mdc-card__actions"></div>';
		if (color=="if") this.html.classList.add("moveup");
		var insertPoint = this.html.querySelector(".mdc-card__actions"); // inserta los campos en la card
		this.fields = new ParametersView(node.parameters);
		insertPoint.parentNode.replaceChild(this.fields.html,insertPoint);
	}
}