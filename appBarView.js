class AppBarView {

    constructor(sceneName) {   
		 this._html = document.createElement("header");
		 this._html.className +="mdc-top-app-bar";
		 this._html.innerHTML =
					'<div class="mdc-top-app-bar__row">'+
						'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
							'<button id="drawer" class="material-icons mdc-top-app-bar__navigation-icon mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">menu</button>'+
							'<span id="sceneName" class="mdc-top-app-bar__title"></span>'+
						'</section>'+
						'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
							'<button id="undo" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="Undo" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">undo</button>'+
							'<button id="redo" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="Redo" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">redo</button>'+
							'<button id="list" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="List" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">list</button>'+
							'<button id="save" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="save" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">save</button>'+
							'<button id="play" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="Play" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">play_circle_filled</button>'+
						'</section>'+
					'</div>';
		this._html.querySelector("#drawer").addEventListener("click",this.drawerHandler.bind(this));
		this._html.querySelector("#undo").addEventListener("click",CmdManager.undo.bind(CmdManager));
		this._html.querySelector("#redo").addEventListener("click",CmdManager.redo.bind(CmdManager));
		this.updateSceneName(sceneName);	
    }
	
	get html() {  
        return this._html;
	}

	updateSceneName(sceneName) {
		this._html.querySelector("#sceneName").innerText=sceneName;
	}
	
// Handlers
    drawerHandler() {
        const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
        drawer.open = drawer.open ? false : true;
	}
	
}
