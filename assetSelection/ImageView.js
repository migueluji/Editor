class ImageView {

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
			this.html.addEventListener("click",this.selectImageHandler.bind(this));
	}

  	addView(image) {
		this.html.id=image.id;
		this.html.querySelector(".mdc-image-list__label").innerHTML=image.name;
		this.html.querySelector(".mdc-image-list__image").src="./images/"+image.name;
	}

	remove() { 
		this.html.remove();
	}

// Handlers
	selectImageHandler(e){
		Command.selectImageCmd(e.srcElement.parentNode.parentNode.id);
	}

}
