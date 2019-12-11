class CardView {

	constructor() {  
		this.view=null;
		this.html = document.createElement("div");
		this.html.className +="mdc-card action-card";
		this.html.innerHTML =
		  	'<div></div>'+
			'<div class="mdc-card__primary-action card-title">'+
				'<div  style="pointer-events:none" class="circle">'+
					'<i class="nodeIcon material-icons mdc-chip_icon">code</i>'+
				'</div>'+
				'<span style="pointer-events:none" class="nodelabel mdc-list-item__text">'+
					'<span style="pointer-events:none" class="mdc-list-item__primary-text card-title_label">Line item</span>'+
				'</span>'+
				'<i id="close" class="chipIcon ge-chip-button material-icons">close</i>'+
			'</div>'+
			'<div class="mdc-card__actions"></div>';
	}
}