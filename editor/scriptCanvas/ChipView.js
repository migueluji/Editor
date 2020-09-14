class ChipView  {
	
	constructor(node,icon,color) {
		var text=node.type.replace("_"," ");
		this.html = document.createElement("div");
		this.html.className +="mdc-chip";
		this.html.innerHTML =
			'<div class="mdc-chip__ripple"></div>'+
			'<div id="open" class="'+color+' circle">'+
				'<button class="nodeIcon mdc-icon-button material-icons mdc-top-app-bar__action-item">'+icon+'</button>'+
			'</div>'+
			'<span style="width:72px" class="nodelabel mdc-list-item__text">'+
				'<span class="mdc-list-item__primary-text">'+text+'</span>'+
				'<span class="mdc-list-item__secondary-text">'+Object.values(node.parameters)+'</span>'+
			'</span>'+
			'<button id="remove" class="chipIcon ge-chip-button mdc-icon-button material-icons mdc-top-app-bar__action-item">cancel</button>';
	}
}