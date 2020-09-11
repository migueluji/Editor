class AssetView {

    constructor(asset,option) {
			this.html = document.createElement("li");
			this.html.className +="mdc-image-list__item image-file";
			this.html.innerHTML =
				'<div class="image-list mdc-image-list__image-aspect-container" style="margin:-2px">'+
					'<img class="mdc-image-list__image" style="pointer-events:none" src="">'+
				'</div>'+
				'<div class="mdc-image-list__supporting">'+
					'<span class="mdc-image-list__label">'+asset.name+'</span>'+
				'</div>';
			this.html.id=asset.id;
			this.html.addEventListener("mousedown",this.selectAssetHandler.bind(this));
			this.addView(asset,option);
	}

  	addView(asset,option) {
		var img = this.html.querySelector(".mdc-image-list__image");
		switch (option) {
			case "Sound" : img.src="./images/sound.png"; break;
			case "Font" : img.src="./images/font.png"; break;
			default : img.src=app.serverGamesFolder+"/"+app.gameFolder+"/images/"+asset.name; break;
		}
		img.onload= function(){
			(img.naturalWidth>=img.naturalHeight) ?	img.style.height="auto" : img.style.width="auto";
		};
	}

	remove() { 
		this.html.remove();
	}

// Handlers
	selectAssetHandler(e){
		e.preventDefault();
		if (e.srcElement.parentNode.id) Command.selectAssetCmd(e.srcElement.parentNode.id);
	}
}
