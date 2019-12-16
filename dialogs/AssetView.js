class AssetView {

    constructor(option) {
			this.html = document.createElement("li");
			this.html.className +="mdc-image-list__item image-file";
			this.html.innerHTML =
				'<div class="mdc-image-list__image-aspect-container" style="margin:-2px">'+
					'<img class="mdc-image-list__image" src="">'+
				'</div>'+
				'<div class="mdc-image-list__supporting">'+
					'<span class="mdc-image-list__label">Text label</span>'+
				'</div>';
			this.html.addEventListener("click",this.selectAssetHandler.bind(this));
			this.option=option;
	}

  	addView(asset) {
		console.log("asset View",asset,this.option);
		this.html.id=asset.id;
		this.html.querySelector(".mdc-image-list__label").innerHTML=asset.name;
		var img = this.html.querySelector(".mdc-image-list__image");
		switch (this.option) {
			case "Image" : img.src="./images/"+asset.name; break;
			case "Sound" : img.src="./images/sound.png"; break;
			case "Font" : img.src="./images/font.png"; break;
		}
		(img.width>=img.height) ? img.style.height="auto" : img.style.width="auto";
	}

	remove() { 
		this.html.remove();
	}

// Handlers
	selectAssetHandler(e){
		//console.log("select",e.srcElement.parentNode.parentNode.id);
		if (e.srcElement.parentNode.parentNode.id) Command.selectAssetCmd(e.srcElement.parentNode.parentNode.id);
	}

}
