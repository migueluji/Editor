class ChipView  {
	
	constructor(node,icon,color) {
		this.html = document.createElement("div");
		this.html.className +="mdc-chip";
		this.html.innerHTML =
			'<div id="open" class="'+color+' circle">'+
				'<i class="nodeIcon material-icons mdc-chip_icon">'+icon+'</i>'+
			'</div>'+
			'<span class="nodelabel mdc-list-item__text">'+
				'<span class="mdc-list-item__primary-text">'+node.type+'</span>'+
				'<span class="mdc-list-item__secondary-text">'+Object.values(node.parameters)+'</span>'+
			'</span>'+
			'<i id="remove" class="chipIcon ge-chip-button material-icons">cancel</i>';
	}
}