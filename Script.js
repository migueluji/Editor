class Script {
	
    constructor(script) {
        this.nodeList=[];
        Object.assign(this,script);
        this.assignNodes(this.nodeList);
    }

    addNode(nodeID,insertPoint,node){
        if (nodeID==null){ //script vacio
            this.nodeList.splice(0,0,node);
        }
        else {
            var founded=this.findNode(null,null,this.nodeList,nodeID); // parentID y side = null
            var actualNodeList=founded.list;
            var pos=founded.pos;
            var position=0;
            switch (insertPoint) {
                case "rightStart" :{
                    actualNodeList[pos].nodeListTrue.splice(position,0,node); break;  
                }
                case "leftStart" : {
                    actualNodeList[pos].nodeListFalse.splice(position,0,node); break; 
                }
                case "right" : {
                    position = actualNodeList[pos].nodeListTrue.length;
                    actualNodeList[pos].nodeListTrue.splice(position,0,node); break;  
                }
                case "left" :{
                    position = actualNodeList[pos].nodeListFalse.length;
                    actualNodeList[pos].nodeListFalse.splice(position,0,node); break;  
                }
                case "down" : {
                    actualNodeList.splice(pos+1,0,node); break;
                }
            }
        }
    
    }

    removeNode(nodeID){
        var founded=this.findNode(null,null,this.nodeList,nodeID);
        founded.list.splice(founded.pos,1);
    }

    changeNode(nodeID,parameters){
        var founded=this.findNode(null,null,this.nodeList,nodeID);
        founded.list[founded.pos].parameters=parameters;
    }

// utils
    assignNodes(nodeList){
        if (nodeList) nodeList.forEach((node,i)=>{
            if (node.hasOwnProperty("nodeListTrue")) { // si es un IF
                nodeList[i]= new If(node);
                if(node.nodeListTrue) this.assignNodes(node.nodeListTrue);
                if(node.nodeListFalse)this.assignNodes(node.nodeListFalse);
            }
            else {
                nodeList[i]=new Do(node);
            }
        });
    }

    findNode(parentID,side,list,nodeID){ // returns the list and the pos of the nodeID (also the parentID and the side
        var pos=0;
        var node=undefined;
        while (pos<list.length) {
            if (list[pos].id==nodeID){
                return  {"parentID":parentID,"side":side,"list":list,"pos":pos};
            }
            else {
                if(list[pos].nodeListTrue) {
                    node = this.findNode(list[pos].id,"right",list[pos].nodeListTrue,nodeID)
                    if (node!=undefined) return node;
                }
                if(list[pos].nodeListFalse) {
                    node = this.findNode(list[pos].id,"left",list[pos].nodeListFalse,nodeID)
                    if (node!=undefined) return node;
                }
            }
            pos++;
        }
    }
}

