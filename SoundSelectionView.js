class SoundSelectionView {

    constructor(soundList,soundSelected) {   
		 this._html = document.createElement("div");
		 this._html.className +="sound-selection side-sheet-content";
		 this._html.style.display="none";
		 this._html.innerHTML =
			'<header class="mdc-top-app-bar--dense properties-bar">'+
				'<div class="mdc-top-app-bar__row">'+
					'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
						'<button id="exitbutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="exit" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">arrow_back</button>'+
						'<span style="margin:0px" class="mdc-toolbar__title">Sounds</span>'+
					'</section>'+
					'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
						'<button id="uploadbutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="exit" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">cloud_upload</button>'+
						'<button id="deletebutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="exit" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">delete</button>'+
					'</section>'+
				'</div>'+
			'</header>'+
			'<ul class="mdc-image-list">'+

			'</ul>';
		this._html.querySelector("#exitbutton").addEventListener("click",this.exitSheetHandler.bind(this));
	}

	get html() {  
        return this._html;
	}

//Handlers
	exitSheetHandler(){
		this._html.style.display="none";
		SideSheetView.openSheetHandler("game-properties");
	}

}
