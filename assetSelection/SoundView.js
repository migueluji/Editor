class SoundView {

    constructor() {
			this.html = document.createElement("li");
			this.html.className +="mdc-image-list__item";
			this.html.innerHTML =
				'<div class="mdc-image-list__image-aspect-container">'+
					'<img class="mdc-image-list__image" src="./images/sound.png">'+
				'</div>'+
				'<div class="mdc-image-list__supporting">'+
					'<span class="mdc-image-list__label">Text label</span>'+
				'</div>';
			this.html.addEventListener("click",this.selectSoundHandler.bind(this));
	}

  	addView(sound) {
		this.html.id=sound.id;
		this.html.querySelector(".mdc-image-list__label").innerHTML=sound.name;
	}

	remove() { 
		this.html.remove();
	}

// Handlers
	selectSoundHandler(e){
		Command.selectSoundCmd(e.srcElement.parentNode.parentNode.id);
	}

}
