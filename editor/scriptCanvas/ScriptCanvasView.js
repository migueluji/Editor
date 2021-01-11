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
        this.background=this.html.querySelector(".script-background");
        this.background.addEventListener("mousemove",this.mouseMoveHandler.bind(this));
        this.background.addEventListener("mousedown",this.mouseDowndHandler.bind(this));
        this.background.addEventListener("mouseup",this.mouseUpHandler.bind(this));
        this.background.addEventListener("mouseleave",this.mouseUpHandler.bind(this));
        this.background.addEventListener("click",this.unselectNodeHandler.bind(this));
        this.selectedNode=null;
        this.selected=null;
        this.drawerX=0;
        this.scriptID=null;

      
        this.traslateX=this.traslateY=0;
  }

    addNode(html,nodeView,nodePos){
        html.insertBefore(nodeView,html.childNodes[nodePos]);
    }

    updateSelectedNode(nodeID){
        // unselect tags yes, no
        var listno =this.html.querySelectorAll(".notext");
        var listyes =this.html.querySelectorAll(".yestext");
        listno.forEach(element=> element.style.display="none");
        listyes.forEach(element=> element.style.display="none");
        // select old node
        var nodesSelected=this.html.querySelectorAll(".nodeselected");
        var chipsSelected=this.html.querySelectorAll(".mdc-elevation--z6");
		nodesSelected.forEach(i=>i.classList.remove("nodeselected"));
        chipsSelected.forEach(i=>i.classList.remove("mdc-elevation--z6"));
        // close cards 
        var cards=this.html.querySelectorAll(".action-card");
        cards.forEach(i=>i.classList.remove("open"));
        // select new node
		if (nodeID!=null)  {
            var node = this.html.querySelector("#"+nodeID);
            var chip = node.querySelector(".mdc-chip");
            node.classList.add("nodeselected");
            chip.classList.add("mdc-elevation--z6");;
            if(node.firstChild.classList.contains("condition")){
                if (this.selectedNode!=nodeID) {
                    this.selected=null; // restart if the node is different 
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
                e = e || window.event;
                e.preventDefault();
                Command.selectNodeCmd(null);
            }  
        }
    }

    mouseDowndHandler(e){  
        if(e.target.classList[0]=="script-background"){
            e = e || window.event;
            e.preventDefault();
            this.x0=this.x1=e.clientX;
            this.y0=this.y1=e.clientY;
            this.down=true;
        }
        else this.down=false;
    //     console.log("down",this.down,e.target.classList[0]);
    }

    mouseUpHandler(e){
        if (this.down){
            e = e || window.event;
            e.preventDefault();
            this.down=false;
            this.traslateX=this.traslateX+(this.x1-this.x0);
            this.traslateY=this.traslateY+(this.y1-this.y0);
        }
    //      console.log("up",this.down,e.target.classList[0]);
    }
    
    mouseMoveHandler(e){
        if (this.down && e.target.classList[0]=="script-background"){
            e = e || window.event;
            e.preventDefault();
            this.x1=e.clientX;
            this.y1=e.clientY;
            this.x=this.centerX+this.traslateX+(this.x1-this.x0);
            this.y=this.centerY+this.traslateY+(this.y1-this.y0);
            e.target.style.transform="translate("+this.x+"px,"+this.y+"px)";
        }
    //      console.log("move",this.down,e.target.classList[0]);
    }

    addDoHandler(e){
        if (this.html.querySelector(".open")==null){ // if there is not a card opened
            var insert = this.getInsertPoint();
            this.dialog = new DoSelectionView(insert);
            var editorFrame=document.querySelector(".editor-frame-root");
            editorFrame.appendChild(this.dialog.html);
        }
     }

    addIfHandler(e){
        if (this.html.querySelector(".open")==null){ // if there is not a card opened
            var insert = this.getInsertPoint();
            var dialog = new IfSelectionView(insert);
            var editorFrame=document.querySelector(".editor-frame-root");
            editorFrame.appendChild(dialog.html);
        }
    }

// Utilities
    init(){
        this.centerX=(this.html.clientWidth-this.background.clientWidth)/2;
        this.centerY=-4000; // due to top margin of green circle
        this.traslateX=this.traslateY=0;
    }

    updateStageDrawer(){
        this.init(); 
        this.update(this.nodeList);
    }

    update(nodeList,init){
        this.selected="no";
        var list =this.html.querySelector(".nodelist");
        var script = document.querySelector(".scriptselected");
        var scriptID;
        if (script) scriptID = script.id;
        while (list.firstChild)	list.removeChild(list.firstChild);
        this.updateNodeList(list,nodeList);
        this.updateSelectedNode(null);
        this.redrawFrames();

        //if (this.scriptID!=scriptID) this.init(); // first update of nodeList
        if (init) this.init();
        this.scriptID=scriptID;

        this.x=this.centerX+this.traslateX;
        this.y=this.centerY+this.traslateY;
        this.background.style.transform="translate("+this.x+"px,"+this.y+"px)";
        this.nodeList=nodeList;
    }

    updateNodeList(html,nodeList){
        var nodePos=0;
        var nodeView;
        var chip = new EmptyNodeView(this);
        nodePos++;
        this.addNode(html,chip.html,nodePos);
        nodeList.forEach(node=>{
            nodePos++;
            if ('type' in node) { // to avoid "null" error
                if (node.nodeListTrue!=null) nodeView = new IfView();
                else nodeView = new DoView();
                nodeView.addView(node);
                this.addNode(html,nodeView.html,nodePos); 
                var chip = new EmptyNodeView(this);
                nodePos++;
                this.addNode(html,chip.html,nodePos);
                if (node.nodeListTrue) {
                    this.updateNodeList(nodeView.html.querySelector(".yes"),node.nodeListTrue);
                }  
                if (node.nodeListFalse) {
                    this.updateNodeList(nodeView.html.querySelector(".no"),node.nodeListFalse);
                }
            }

        });
    }

    redrawFrames (){
        var frames=document.querySelectorAll('.frame');
        frames.forEach(frame=>{
            var upNodeChildren=frame.parentNode.children;
            var childrenWidht1=upNodeChildren[2].clientWidth+16; 
            var childrenWidht2=upNodeChildren[3].clientWidth+16; // 16 due to margin of 8px 
            var boxWidth = childrenWidht1/2+childrenWidht2/2-4; // 4 due to border
            frame.style.height=frame.parentNode.parentNode.clientHeight-28+"px";
            frame.style.width=boxWidth+"px";
            var position=childrenWidht1/2;
            frame.style.transform="translateX("+position+"px)";
        });
        // height
        var nodelist= document.querySelector(".nodelist");
        var height=nodelist.offsetHeight+32;
        var line=document.querySelector("#rule-line");
        line.parentNode.setAttribute("height",height);
        line.setAttribute("y2",height);
    }

    getInsertPoint(){ // returns: parentID, side (of parent), position (into the parent list)
        var node = this.html.querySelector(".nodeselected");
        var insert ={"parentID":null,"side":null,"position":null};
        var nodeList=null;
        if (node==null){ // there is not node selected
            nodeList=this.html.querySelector(".nodelist"); // found main nodelist
            insert.position=(nodeList.childNodes.length-1)/2;// 2 to take into account empty chips
        }
        else {
            if (node.firstChild.classList.contains("condition")){ // Insert into condition node
                insert.parentID=node.id;
                if (node.firstChild.querySelector(".yestext").style.display=="block"){ // insertar in a codition node in the yes side
                    insert.side="right";
                    insert.position=(node.querySelector(".yes").childNodes.length-1)/2;
                }
                else if (node.firstChild.querySelector(".notext").style.display=="block"){
                    insert.side="left";
                    insert.position=(node.querySelector(".no").childNodes.length-1)/2;
                    }
                    else {
                        insert.side=null;
                    }       
            };
            if (insert.side==null){ // Insert any node into the parent list
                nodeList=node.parentNode;
                insert.parentID=nodeList.parentNode.parentNode.id || null;
                if (nodeList.classList.contains("yes")) insert.side="right";
                else if (nodeList.classList.contains("no")) insert.side="left";
                var i=0;
                while ((node=node.previousSibling)!=null) i++;
                insert.position=((i-1)/2)+1;
            }
        }
        return insert;
    }

}