class AppBarView {

    constructor() {   
		 this._html = document.createElement("header");
		 this._html.className +="mdc-top-app-bar";
		 this._html.innerHTML =
					'<div class="mdc-top-app-bar__row">'+
						'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
							'<button id="drawer" class="material-icons mdc-top-app-bar__navigation-icon mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">menu</button>'+
							'<span class="mdc-top-app-bar__title">scene 1</span>'+
						'</section>'+
						'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
							'<button id="undo" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="Undo" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">undo</button>'+
							'<button id="redo" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="Redo" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">redo</button>'+
							'<button id="list" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="List" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">list</button>'+
							'<button id="save" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="save" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">save</button>'+
							'<button id="play" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="Play" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">play_circle_filled</button>'+
						'</section>'+
					'</div>';

    }
	
	get html() {  
        return this._html;
	}

	drawerListener(drawerHandler) {
		this._html.querySelector("#drawer").addEventListener("click",drawerHandler);
	}

	undoListener(undo) {
		this._html.querySelector("#undo").addEventListener("click",undo);
	}

	redoListener(redo) {
		this._html.querySelector("#redo").addEventListener("click",redo);
	}
	
}
