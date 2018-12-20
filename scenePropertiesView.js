class ScenePropertiesView {

    constructor() {   
		 this._html = document.createElement("div");
		 this._html.className +="scene-properties";
		 this._html.style.display="none";
		 this._html.innerHTML =
						'<header class="mdc-top-app-bar--dense">'+
							'<div class="mdc-top-app-bar__row">'+
								'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
									'<span class="mdc-toolbar__title">Scene Properties</span>'+
								'</section>'+
								'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
									'<button id="closebutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="close" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">close</button>'+
								'</section>'+
							'</div>'+
						'</header>';
		this._html.querySelector("#closebutton").addEventListener("click",SideSheetView.closeSheetHandler);
    }
	
	get html() {  
        return this._html;
	}

}
