class FontView {

    constructor() {
			this.html = document.createElement("li");
			this.html.className +="mdc-image-list__item";
			this.html.innerHTML =
				'<div class="mdc-image-list__image-aspect-container">'+
					'<img class="mdc-image-list__image" src="./images/font.png">'+
				'</div>'+
				'<div class="mdc-image-list__supporting">'+
					'<span class="mdc-image-list__label">Text label</span>'+
				'</div>';
			this.html.addEventListener("click",this.selectFontHandler.bind(this));
	}

  	addView(font) {
		this.html.id=font.id;
		this.html.querySelector(".mdc-image-list__label").innerHTML=font.name;
	}

	remove() { 
		this.html.remove();
	}

// Handlers
	selectFontHandler(e){
		Command.selectFontCmd(e.srcElement.parentNode.parentNode.id);
	}

}
