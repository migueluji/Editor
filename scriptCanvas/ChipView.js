class ChipView extends NodeView {
	
	constructor(id) {  
		super(); 
		this.id=id;
		this.html = document.createElement("div");
		this.html.className +="mdc-chip";
		this.html.innerHTML =
			'<div id="open" class="circle">'+
				'<i class="nodeIcon material-icons mdc-chip_icon">code</i>'+
			'</div>'+
			'<span class="nodelabel mdc-list-item__text">'+
				'<span class="mdc-list-item__primary-text"></span>'+
				'<span class="mdc-list-item__secondary-text"></span>'+
			'</span>'+
			'<i id="remove" class="chipIcon ge-chip-button material-icons">cancel</i>';

		this.html.addEventListener("click",this.selectNodeHandler.bind(this));
		this.html.querySelector("#remove").addEventListener("click",this.removeNodeHandler.bind(this));
		this.html.querySelector("#open").addEventListener("click",this.openNodeInfoHandler.bind(this));
		this.html.onselectstart= function() {return false;}
	}

}