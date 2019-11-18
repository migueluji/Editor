class ScriptCanvasView {

    constructor() {   
		 this.html = document.createElement("div");
         this.html.className +="scriptcanvas";
         this.html.style.display="none";
         this.html.style.transform="";
         this.html.innerHTML =
            '<button id="addif" class="if-button mdc-fab mdc-ripple-upgraded add-property-button">'+
                '<span class="button-text">IF</span>'+
            '</button>'+
            '<button id="adddo" class="do-button mdc-fab mdc-ripple-upgraded add-property-button">'+
                '<span class="button-text">DO</span>'+
            '</button>'+
            '<div class="script-background">'+
                '<div class="init">'+
                    '<svg style="pointer-events:none;position: relative; z-index: -1" height="10px" width="50px">'+
                        '<line id="rule-line" x1="8" y1="8" x2="8" y2="400" style="stroke:lightgray;stroke-width:2"></line>'+
                    '</svg>'+
                '</div>'+
                '<div class="nodelist"></div>'+
                '<div class="end">'+
                '</div>'+
            '</div>';
        this.html.querySelector("#adddo").addEventListener("click",this.addDoHandler.bind(this));
        this.html.querySelector("#addif").addEventListener("click",this.addIfHandler.bind(this));
        this.html.addEventListener("mousemove",this.mouseMoveHandler.bind(this));
        this.html.addEventListener("mousedown",this.mouseDowndHandler.bind(this));
        this.html.addEventListener("mouseup",this.mouseUpHandler.bind(this));
        this.html.addEventListener("mouseleave",this.mouseUpHandler.bind(this));
        this.html.addEventListener("click",this.unselectNodeHandler.bind(this));
        this.selectedNode=null;
        this.selected=null;
        this.drawerX=256;
  }

    addNode(html,nodeView,nodePos){
        html.insertBefore(nodeView,html.childNodes[nodePos]);
    }

    updateSelectedNode(nodeID){
          // deselecciona etiquetas yes, no
        var listno =this.html.querySelectorAll(".notext");
        var listyes =this.html.querySelectorAll(".yestext");
        listno.forEach(element=> element.style.display="none");
        listyes.forEach(element=> element.style.display="none");
        // deselecciona antiguo nodo
        var nodesSelected=this.html.querySelectorAll(".nodeselected");
        var chipsSelected=this.html.querySelectorAll(".mdc-elevation--z6");
		nodesSelected.forEach(i=>i.classList.remove("nodeselected"));
        chipsSelected.forEach(i=>i.classList.remove("mdc-elevation--z6"));
        // cierra ventanas de tarjetas
        var cards=this.html.querySelectorAll(".action-card");
        cards.forEach(i=>i.classList.remove("open"));
        // selecciona el nuevo nodo
		if (nodeID!=null)  {
            var node = this.html.querySelector("#"+nodeID);
            var chip = node.querySelector(".mdc-chip");
            node.classList.add("nodeselected");
            chip.classList.add("mdc-elevation--z6");;
            if(node.firstChild.classList.contains("condition")){
                if (this.selectedNode!=nodeID) {
                    this.selected="no"; // se reinicia si el nodo es diferente
                    this.selectedNode=nodeID;
                }
                if (this.selected==null) {
                    this.selected="yes";
                    node.querySelector(".yestext").style.display="block";
                }
                else if (this.selected=="yes") {
                    this.selected="no";
                    node.querySelector(".notext").style.display="block";
                }
                else this.selected=null;
            } 
            else this.selected="no";
        }
        else {
            this.selected="no";
        }
	}

// Handlers
    unselectNodeHandler(e){
        if (e.target.classList[0]=="script-background") {
            if (e.target.querySelector(".open")==null){
                e.preventDefault();
                Command.selectNodeCmd(null);
            }  
        }
    }

    mouseDowndHandler(e){
    //    console.log("mouse down");
        if (e.target.classList[0]=="script-background") {
            e.preventDefault();
            this.x0=e.clientX;
            this.y0=e.clientY;
            this.down=true;
        }
    }

    mouseUpHandler(e){
    //    console.log("mouse up");
        if (e.target.classList[0]=="script-background") {
            e.preventDefault();
            this.down=false;
            this.posx=this.x;
            this.posy=this.y;
        }
    }
    
    mouseMoveHandler(e){
     //   console.log("mouse move");
        if (e.target.classList[0]=="script-background") {
            e.preventDefault();
            if(this.down){
                this.x1=e.clientX;
                this.y1=e.clientY;
                this.x=this.x1-this.x0;
                this.y=this.y1-this.y0;
                var element=this.html.querySelector(".script-background");
                this.x=this.x+this.posx;
                this.y=this.y+this.posy;
                element.style.transform="translate("+this.x+"px,"+this.y+"px)";
                console.log( element.style.transform);
            }
        }  
    }

    addDoHandler(){
        var insert = this.getInsertPoint();
        this.dialog = new DoSelectionView(insert.nodeID,insert.insertPoint);
		var editorFrame=document.querySelector(".editor-frame-root");
        editorFrame.appendChild(this.dialog.html);
     }

    addIfHandler(){
        var insert = this.getInsertPoint();
        var dialog = new IfSelectionView(insert.nodeID,insert.insertPoint);
		var editorFrame=document.querySelector(".editor-frame-root");
        editorFrame.appendChild(dialog.html);
    }

// Utilities
    update(nodeList){
        this.selected="no";
        this.nodeList=nodeList;
        var list =this.html.querySelector(".nodelist"); 
		while (list.firstChild)	list.removeChild(list.firstChild);
        this.updateNodeList(list,nodeList);
        this.redrawFrames();
        var element=this.html.querySelector(".script-background");
        if (this.currentList!=nodeList[0].id) { // compute initial view
            this.posx=(this.html.clientWidth-element.clientWidth)/2;
            element.firstChild.style="margin-top:"+this.html.clientHeight+"px";
            this.posy=-this.html.clientHeight+100;
            this.currentList=nodeList[0].id;
            this.drawerX=0;
        }
        this.posx=this.posx-this.drawerX;
        console.log(this.drawerX,this.posx);
        element.style.transform="translate("+this.posx+"px,"+this.posy+"px)";
    }

    updateStageDrawer(){
        var drawerApp=document.querySelector(".mdc-drawer-app-content");
        (drawerApp.getBoundingClientRect().x==0) ? this.drawerX=-256 : this.drawerX=256;
        this.update(this.nodeList);
    }

    updateNodeList(html,nodeList){
        var nodePos=0;
        var nodeView;
        nodeList.forEach(node=>{
            nodePos++;
            if (node instanceof If) nodeView = new IfView();
            else nodeView = new DoView();
            nodeView.addView(node);
            this.addNode(html,nodeView.html,nodePos); 
            if (node.nodeListTrue) {
                this.updateNodeList(nodeView.html.querySelector(".yes"),node.nodeListTrue);
            }  
            if (node.nodeListFalse) {
                this.updateNodeList(nodeView.html.querySelector(".no"),node.nodeListFalse);
            }
        });
    }

    redrawFrames (){
        var frames=document.querySelectorAll('.frame');
        frames.forEach(frame=>{
            var upNodeChildren=frame.parentNode.children;
            var childrenWidht1=upNodeChildren[2].clientWidth+16; 
            var childrenWidht2=upNodeChildren[3].clientWidth+16; // 16 por el marigen de 8px 
            var boxWidth = childrenWidht1/2+childrenWidht2/2-4; // 4 por el borde

            frame.style.height=frame.parentNode.parentNode.clientHeight-56+"px";
            frame.style.width=boxWidth+"px";
            var position=childrenWidht1/2;
            frame.style.transform="translateX("+position+"px)";
        });
        // height
        var nodelist= this.html.querySelector(".nodelist");
        var height=nodelist.offsetHeight+64;
        var line=this.html.querySelector("#rule-line");
        line.parentNode.setAttribute("height",height);
        line.setAttribute("y2",height);

    }

    getInsertPoint(){
        var node = this.html.querySelector(".nodeselected");
        var nodeID=null;
        var insertPoint="down";
        if (node==null){ // si no hay nodo seleccionado se inserta al final de la lista principal
            var nodelist=this.html.querySelector(".nodelist");
            var position = nodelist.childNodes.length;
            if (position!=0) nodeID=nodelist.childNodes[position-1].id;
        }
        else {
            if (node.firstChild.classList.contains("condition")){
                if (node.firstChild.querySelector(".yestext").style.display=="block"){ // insertar en un nodo condición en el yes
                    insertPoint="right";
                }
                else if (node.firstChild.querySelector(".notext").style.display=="block"){
                    insertPoint="left";
                }
            }
            nodeID=node.id;
        }
        return {"nodeID":nodeID,"insertPoint":insertPoint}
    }

}