class EditorView {

    constructor() {   
		 this._html = document.createElement("div");
		 this._html.className +="editor-frame-root";
		 this._html.innerHTML =
            '<aside class="mdc-drawer mdc-drawer--dismissible mdc-drawer--open">'+ //DRAWER
                '<div class="mdc-drawer__header"></div>'+ //header
                '<div class="mdc-drawer__content"></div>'+ //content
            '</aside>'+
            '<div class="mdc-drawer-app-content">'+ //DRAWER CONTENT
                '<header class="mdc-top-app-bar"></header>'+ // top-app-bar
                '<div class="main-content">'+ //canvas + settings
                    '<div class="canvas"></div>'+
                    '<aside class="side-sheet"></aside>'+
                '</div>'+
            '</div>';
     }
	
	get html() {  
        return this._html;
    }

    addView(html){
		var children=this._html.querySelector("."+html.classList[0]);
		children.parentNode.replaceChild(html,children);
	}

}