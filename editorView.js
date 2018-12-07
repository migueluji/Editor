class EditorView {

    constructor() {   
		 this._html = document.createElement("div");
		 this._html.className +="editor-frame-root";
		 this._html.innerHTML =
                '<aside class="mdc-drawer mdc-drawer--dismissible mdc-drawer--open">'+
                    '<div class="mdc-drawer__header">'+
                        '<h3 class="mdc-drawer__title">Gamesonomy</h3>'+
                        '<h6 class="mdc-drawer__subtitle">Untitle Game</h6>'+
                        '<h6 class="mdc-drawer__subtitle"></h6>'+
                    '</div>'+
                '</aside>'+
                '<div class="mdc-drawer-app-content">'+
                '</div>';
    }
	
	get html() {  
        return this._html;
    }
    
    createAppBar(headerHtml){
        var parent= this._html.querySelector(".mdc-drawer-app-content");
        parent.appendChild(headerHtml);
    }

    createDrawer(drawerHtml){
        var parent= this._html.querySelector(".mdc-drawer");
        parent.appendChild(drawerHtml);
    }
    
    drawerHandler(){
        const drawer = mdc.drawer.MDCDrawer.attachTo(this._html.querySelector('.mdc-drawer'));
        drawer.open= drawer.open ? false : true;
    }
}