class ScriptCanvasView {

    constructor() {   
		 this.html = document.createElement("div");
         this.html.className +="scriptcanvas";
      //   this.html.style.display="none";
         this.html.innerHTML =
         '<button id="addif" class="if-button mdc-fab mdc-ripple-upgraded add-property-button">'+
             '<span class="button-text">IF</span>'+
        '</button>'+
        '<button id="adddo" class="do-button mdc-fab mdc-ripple-upgraded add-property-button">'+
            '<span class="button-text">DO</span>'+
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

        this.html.querySelector("#adddo").addEventListener("click",this.addDoHandler.bind(this));
        this.html.querySelector("#addif").addEventListener("click",this.addIfHandler.bind(this));

     }

    addView(html){
		var children=this.html.querySelector("."+html.classList[0]);
		children.parentNode.replaceChild(html,children);
    }

// Handlers
    addDoHandler(){
        var dialog = new DoSelectionView();
		var editorFrame=document.querySelector(".editor-frame-root");
		editorFrame.appendChild(dialog.html);
    }

    addIfHandler(){
        var dialog = new IfSelectionView();
		var editorFrame=document.querySelector(".editor-frame-root");
		editorFrame.appendChild(dialog.html);
    }

}