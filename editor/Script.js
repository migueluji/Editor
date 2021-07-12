class Script {
	
    constructor(script) {
        this.id=Utils.id();
        this.name=script.name;
        this.nodeList=[];
        Object.assign(this,script);
        this.assignNodes(this.nodeList);
    }

    addNode(insert,node){ // father, side, position, node 
        if (insert.parentID==null){ //script vacio
            this.nodeList.splice(insert.position,0,node);
        }
        else {
            var nodeList=this.findNode(this.nodeList,insert.parentID,null,null); // returns parent nodeList and position
            if (nodeList) {
                if (insert.side=="right") nodeList.list[nodeList.position].nodeListTrue.splice(insert.position,0,node);
                else if (insert.side=="left") nodeList.list[nodeList.position].nodeListFalse.splice(insert.position,0,node);
            }
        }
    }

    removeNode(nodeID){
        var founded = this.findNode(this.nodeList,nodeID,null,null);
        if (founded) founded.list.splice(founded.position,1);
    }

    changeNode(nodeID,parameters){
        var founded=this.findNode(this.nodeList,nodeID,null,null);
        founded.list[founded.position].parameters=parameters;
    }

// utils
    assignNodes(nodeList){
        if (nodeList) nodeList.forEach((node,i)=>{
            nodeList[i]= new Node(node);
            if (node && node.hasOwnProperty("nodeListTrue")) { // if node exist and is a condition
                if(node.nodeListTrue) this.assignNodes(node.nodeListTrue);
                if(node.nodeListFalse)this.assignNodes(node.nodeListFalse);
            }
        });
    }

    findNode(nodeList,nodeID,parentID,side){
        var pos = 0;
        var found = undefined;
        while (pos < nodeList.length){
            if (nodeList[pos].id==nodeID){
                return {"list":nodeList,"position":pos,"parentID":parentID,"side":side};
            } 
            else {
                if (nodeList[pos].nodeListTrue) {
                    found= this.findNode(nodeList[pos].nodeListTrue,nodeID,nodeList[pos].id,"right");
                    if (found) return found;
                }
                if (nodeList[pos].nodeListFalse) {
                    found=this.findNode(nodeList[pos].nodeListFalse,nodeID,nodeList[pos].id,"left");
                    if (found) return found;
                }
            }
            pos ++;
        }
    }

}

