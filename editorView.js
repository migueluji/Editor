class EditorView {

    constructor() {   
		 this._html = document.createElement("div");
		 this._html.className +="editor-frame-root";
		 this._html.innerHTML =
                '<aside class="mdc-drawer mdc-drawer--dismissible mdc-drawer--open">'+
                    '<div class="mdc-drawer__header" style="border-bottom: 1px solid lightgray">'+
                        '<h3 class="mdc-drawer__title">Gamesonomy</h3>'+
                        '<h6 class="mdc-drawer__subtitle">Untitle Game</h6>'+
                        '<button id="gameProperties" class="mdc-button mdc-button-upgraded" style="left:75%">'+
                            '<i class="material-icons mdc-button_icon">settings</i>'+
                        '</button>'+
                    '</div>'+
                    '<div class="mdc-drawer__content"></div>'+
                '</aside>'+
                '<div class="mdc-drawer-app-content">'+
                    '<header class="mdc-top-app-bar"></header>'+ // top-app-bar
                    '<div class="main-content">'+ //canvas + settings
                        '<div class="canvas"></div>'+
                        '<aside class="side-sheet"></aside>'+
                    '</div>'+
                '</div>';
        
         this._html.querySelector("#gameProperties").addEventListener("click",this.gamePropertiesHandler.bind(this));
    }
	
	get html() {  
        return this._html;
    }

    set html(html){
		var children=this._html.querySelector("."+html.className);
		children.parentNode.replaceChild(html,children);
	}

    gamePropertiesHandler(){
        SideSheetView.openSheetHandler(".game-properties");
    }

}