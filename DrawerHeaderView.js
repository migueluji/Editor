class DrawerHeaderView {

    constructor(gameName) {   
		this._html = document.createElement("div");
		this._html.className +="mdc-drawer__header";
		this._html.innerHTML =
                    '<h3 class="mdc-drawer__title">Gamesonomy</h3>'+
                    '<h6 id="gameName" class="mdc-drawer__subtitle">Untitle Game</h6>'+
                    '<h6 class="mdc-drawer__subtitle"></h6>'+
                    '<button id="gameProperties" class="mdc-button mdc-button-upgraded" style="left:75%">'+
                       '<i class="material-icons mdc-button_icon">settings</i>'+
                    '</button>';
        this._html.querySelector("#gameProperties").addEventListener("click",this.gamePropertiesHandler.bind(this));
        this.updateSceneName(gameName);
    }
	
	get html() {  
        return this._html;
    }

    updateSceneName (gameName){
        this.html.querySelector("#gameName").innerText=gameName;
    }

// Handlers
    gamePropertiesHandler(){
          SideSheetView.openSheetHandler(".game-properties");
    }

}