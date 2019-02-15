class EditorView {

    constructor() {   
		 this.html = document.createElement("div");
		 this.html.className +="editor-frame-root";
		 this.html.innerHTML =
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

    addView(html){
		var children=this.html.querySelector("."+html.classList[0]);
		children.parentNode.replaceChild(html,children);
	}

}