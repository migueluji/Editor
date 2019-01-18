class SoundView {

    constructor() {
			this._html = document.createElement("li");
			this._html.className +="mdc-image-list__item";
			this._html.innerHTML =
				'<div class="mdc-image-list__image-aspect-container">'+
					'<img class="mdc-image-list__image" src="./images/sound.png">'+
				'</div>'+
				'<div class="mdc-image-list__supporting">'+
					'<span class="mdc-image-list__label">Text label</span>'+
				'</div>';
			this._html.addEventListener("click",this.selectSoundHandler.bind(this));
	}
	
	get html() {
		return this._html;
  	}
    
  	addView(sound) {
		this._html.id=sound.id;
		this._html.querySelector(".mdc-image-list__supporting").firstChild.innerHTML=sound.name;
	}

	remove() { 
		this._html.remove();
	}

// Handlers
	selectSoundHandler(e){
		Command.selectSoundCmd(this._html.id);
	}

}


