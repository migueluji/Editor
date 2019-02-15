class DrawerHeaderView {

    constructor(gameName) {   
		this.html = document.createElement("div");
		this.html.className +="mdc-drawer__header";
		this.html.innerHTML =
            '<img style="width:100%; padding-top:24px; margin-bottom:-16px" src="./images/gamesonomy.png"></img>'+
            '<h3 id="gameName" class="mdc-drawer__title">Untitle Game</h3>'+
            '<h6 id="gameName" class="mdc-drawer__subtitle"></h6>'+
            '<button id="gameProperties" class="mdc-button mdc-button-upgraded" style="left:75%">'+
                '<i class="material-icons mdc-button_icon">settings</i>'+
            '</button>';
        this.html.querySelector("#gameProperties").addEventListener("click",this.gamePropertiesHandler.bind(this));
        this.updateGameName(gameName);
    }
	
    updateGameName (gameName){
        this.html.querySelector("#gameName").textContent=gameName;
      }

// Handlers
    gamePropertiesHandler(){
          SideSheetView.openSheetHandler("game-properties");
    }

}