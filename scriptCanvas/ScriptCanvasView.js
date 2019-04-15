class ScriptCanvasView {

    constructor(nodeList) {   
		 this.html = document.createElement("div");
         this.html.className +="scriptcanvas";
         this.html.style.display="none";
         this.html.innerHTML =
         '<button id="addif" class="if-button mdc-fab mdc-ripple-upgraded add-property-button">'+
             '<span class="button-text">IF</span>'+
        '</button>'+
        '<button id="adddo" class="do-button mdc-fab mdc-ripple-upgraded add-property-button">'+
            '<span class="button-text">DO</span>'+
        '</button>'+
          '<div class="script-background">'+
            '<div class="init">'+
                '<svg style="position: relative; z-index: -1" height="1000px" width="50px">'+
                    '<line id="rule-line" x1="8" y1="8" x2="8" y2="400" style="stroke:lightgray;stroke-width:2"></line>'+
                '</svg>'+
            '</div>'+
            '<div class="nodelist"></div>'+
            '<div class="end">'+
            '</div>'+
        '</div>';
        this.html.querySelector("#adddo").addEventListener("click",this.addDoHandler.bind(this));
        this.html.querySelector("#addif").addEventListener("click",this.addIfHandler.bind(this));

     }

    addNode(html,nodeView,nodePos){
        html.insertBefore(nodeView,html.childNodes[nodePos]);
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

// Utilities
    update (html,nodeList){
        this.updateNodeList(html.querySelector(".nodelist"),nodeList);
        this.redraw();
    }
    updateNodeList(html,nodeList){
        var nodePos=0;
        nodeList.forEach(node=>{
            nodePos++;
            switch(node.type){
               case "Compare": var nodeView = new IfView(); break;
               case "Check" : var nodeView = new IfView(); break;
            }
            nodeView.addView(node);
            this.addNode(html,nodeView.html,nodePos);   
            if (node.nodeListTrue) {
                var newhtml = nodeView.html.querySelector(".yes");
                this.updateNodeList(newhtml,node.nodeListTrue);
            }
         //   if (node.nodeListFalse) this.update(nodeView.html,node.nodeListFalse);
        });
 
    }

    redraw (){
        /*redibuja los cuadros*/
        var cuadros=document.querySelectorAll('.cuadro');
        cuadros.forEach(cuadro=>{
            var upNodeChildren=cuadro.parentNode.children;
            var childrenWidht1=upNodeChildren[2].clientWidth+32;
            var childrenWidht2=upNodeChildren[3].clientWidth+32;
            var boxWidth = childrenWidht1/2+childrenWidht2/2-4;

            cuadro.style.height=cuadro.parentNode.parentNode.clientHeight-50+"px";
            cuadro.style.width=boxWidth+"px";
            var position=childrenWidht1/2;
            cuadro.style.transform="translateX("+position+"px)";
        });
        /* redibuja la linea de fondo*/

        this.html.querySelector("#rule-line").setAttribute("y2",this.html.querySelector(".script-background").clientHeight-25);
    }

}