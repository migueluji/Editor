class AppBarView {

  constructor(sceneName) {   
		this.html = document.createElement("header");
		this.html.className +="mdc-top-app-bar";
		this.html.innerHTML =
		'<div class="mdc-elevation--z2 mdc-top-app-bar__row">'+
			'<section style="width:40%" class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
				'<button id="drawer" class="material-icons mdc-top-app-bar__navigation-icon mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">menu</button>'+
				'<span id="sceneName" class="mdc-top-app-bar__title"></span>'+
			'</section>'+
			'<button id="play" style="font-size:36px" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">play_arrow</button>'+
			'<section style="width:40%" class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
				'<button id="save" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">save</button>'+	
				'<button id="undo" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">undo</button>'+
				'<button id="redo" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">redo</button>'+
				'<button id="cast" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">list</button>'+
				'<button id="settings" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded">settings</button>'+
			'</section>'+
		'</div>';
		this.updateSceneName(sceneName);	
		this.html.querySelector("#drawer").addEventListener("click",Command.drawerToggleCmd.bind(Command));
		this.html.querySelector("#save").addEventListener("click",Command.saveGameCmd.bind(Command));
		this.html.querySelector("#undo").addEventListener("click",CmdManager.undo.bind(CmdManager));
		this.html.querySelector("#redo").addEventListener("click",CmdManager.redo.bind(CmdManager));
		this.html.querySelector("#cast").addEventListener("click",Command.openCastCmd.bind(Command));
		this.html.querySelector("#play").addEventListener("click",Command.playGameCmd.bind(Command));
		this.html.querySelector("#settings").addEventListener("click",Command.openGamePropertiesCmd.bind(Command));

		var bar=this.html;
		mdc.topAppBar.MDCTopAppBar.attachTo(bar);
  }

	updateSceneName(sceneName) {
		this.html.querySelector("#sceneName").innerText=sceneName.split("_").join(" ");;
	}
	
 	drawerToogle() {
        const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
		drawer.open = drawer.open ? false : true;	
	}

}
