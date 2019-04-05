class ScriptCanvasView {

    constructor() {   
		 this.html = document.createElement("div");
         this.html.className +="scriptcanvas";
      //   this.html.style.display="none";
         this.html.innerHTML =
         '<button id="addif" class="if-button mdc-fab mdc-ripple-upgraded add-property-button">'+
             '<span class="button-text">if</span>'+
        '</button>'+
        '<button id="adddo" class="do-button mdc-fab mdc-ripple-upgraded add-property-button">'+
            '<span class="button-text">do</span>'+
        '</button>'+
          '<div class="scritp-background">'+
            '<div class="init">'+
                '<svg style="position: relative; z-index: -1" height="100px" width="50px">'+
                    '<line x1="8" y1="8" x2="8" y2="100" style="stroke:lightgray;stroke-width:2"></line>'+
                '</svg>'+
            '</div>'+
            '<div class="nodelist"></div>'+
            '<div class="end">'+
                '<svg style="position: relative; z-index: -1; transform:translateY(-50px);" height="50px" width="50px">'+
                    '<line x1="18" y1="-12" x2="18" y2="64" style="stroke:lightgray;stroke-width:2"></line>'+
        '       </svg>'+
            '</div>'+
        '</div>';


     }

    addView(html){
		var children=this.html.querySelector("."+html.classList[0]);
		children.parentNode.replaceChild(html,children);
    }

}