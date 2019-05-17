class CardView extends NodeView {

	constructor(id) {  
		super(); 
		this.id=id;
		this.html = document.createElement("div");
		this.html.className +="mdc-card action-card mdc-elevation--z6";
		this.html.innerHTML =
			'<div class="mdc-card__primary-action card-title">'+
				'<div class="circle">'+
					'<i class="nodeIcon material-icons mdc-chip_icon">code</i>'+
				'</div>'+
				'<span class="nodelabel mdc-list-item__text">'+
					'<span class="mdc-list-item__primary-text card-title_label">Line item</span>'+
				'</span>'+
				'<i id="close" class="chipIcon ge-chip-button material-icons">close</i>'+
			'</div>'+
			'<div class="mdc-card__actions"></div>';

		this.html.querySelector("#close").addEventListener("click",this.closeNodeInfoHandler.bind(this));
		this.html.onselectstart= function() {return false;}
	}
}