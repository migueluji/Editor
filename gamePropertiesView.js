class GamePropertiesView {

    constructor() {   
		 this._html = document.createElement("div");
		 this._html.className +="game-properties";
		// this._html.style.display="none";
		 this._html.innerHTML =
						'<header class="mdc-top-app-bar--dense properties-bar">'+
							'<div class="mdc-top-app-bar__row">'+
								'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
									'<span class="mdc-toolbar__title">Game Properties</span>'+
								'</section>'+
								'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
									'<button id="closebutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="close" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">close</button>'+
								'</section>'+
							'</div>'+
						'</header>'+
						'<ul class="mdc-list properties-list">'+
							'<li class="game-properties-settings"></li>'+
							'<li class="game-properties-sound"></li>'+
							'<li class="game-properties-new"></li>'+
							'<li style="height:44px"></li>'+
							'<button id="addproperty" class="mdc-fab mdc-ripple-upgraded add-property-button" aria-label="Add Scene"'+
								'style="--mdc-ripple-fg-size:33px; --mdc-ripple-fg-scale:2.70291; --mdc-ripple-fg-translate-start:5.5px, 19.6875px; --mdc-ripple-fg-translate-end:11.5px, 11.5px;">'+
									'<i class="mdc-fab__icon material-icons">add</i>'+
					   		'</button>'+
						'</ul>';
		this._html.querySelector("#closebutton").addEventListener("click",SideSheetView.closeSheetHandler);
		this._html.querySelector("#addproperty").addEventListener("click",this.addPropertyHandler.bind(this));
    }
	
	get html() {  
        return this._html;
	}

	addView(html) {
		var children=this._html.querySelector("."+html.classList[0]);
		children.parentNode.replaceChild(html,children);
	}

	updateGameProperty(property,value) {
		var element=this._html.querySelector("#"+property);
		(element.type==="checkbox") ? element.value=element.checked=Boolean(value) : element.value=value;
		element.focus();
	}

//Handlers
	addPropertyHandler(){
		var dialog = new NewPropertyDialogView();
		var node=document.querySelector(".editor-frame-root");
		node.appendChild(dialog.html);
		dialog.html.querySelector("#propertyname").focus();
	}

//Utilities
	init(gameProperties){
		Object.keys(gameProperties).forEach(element => {
			this._html.querySelector("#"+element).value=gameProperties[element];
		});
		gameProperties.play ? this._html.querySelector("#play").checked=true : this._html.querySelector("#play").checked=false;
		gameProperties.loop ? this._html.querySelector("#loop").checked=true : this._html.querySelector("#loop").checked=false;
	}

}
