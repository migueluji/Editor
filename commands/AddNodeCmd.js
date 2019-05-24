class AddNodeCmd extends Command {

    constructor (sceneID,actorID,scriptID,nodeID,insertPoint,type){
        super();
        this.type=type;
        var parameters = {};
        this.sceneID = sceneID;
        this.actorID = actorID;
        this.scriptID = scriptID;
        this.nodeID = nodeID;
        this.insertPoint= insertPoint;
        switch(type){
            // Condiciones
            case "Compare":     parameters= new Object({"Value 1":null,"Operation":"<","Value 2":null});break;
            case "Check":       parameters= new Object({"Property":null});break;
            case "Collision":   parameters= new Object({"Tag":null});break;
            case "Timer":       parameters= new Object({"Seconds":0});break;
            case "Touch":       parameters= new Object({"Mode":"down","On Actor":true});break;
            case "Keyboard":    parameters= new Object({"Key":null,"Key Mode":"down"});break;
            // Acciones
			case "Edit" :       parameters= new Object({"Property":null,"Value":null});break;
			case "Spawn" :      parameters= new Object({"Actor":null,"X":0,"Y":0,"Angle":0});break;
			case "Delete" :     parameters= new Object({});break;
			case "Animate" :    parameters= new Object({"Animation":null,"Fps":24});break;
			case "Play" :       parameters= new Object({"Sound":null,"Volume":1, "Start":0, "Pan":0});break;
			case "Move" :       parameters= new Object({"Speed":0,"Angle":0});break;
			case "Move To" :    parameters= new Object({"Speed":0,"X":0,"Y":0});break;
			case "Rotate" :     parameters= new Object({"Speed":0,"Pivot X":0,"Pivot Y":0});break;
			case "Rotate To" :  parameters= new Object({"Speed":0,"X":0,"Y":0,"Pivot X":0,"Pivot Y":0});break;
			case "Push" :       parameters= new Object({"Force":0,"Angle":0});break;
			case "Push To" :    parameters= new Object({"Force":0,"X":0,"Y":0});break;
			case "Torque" :     parameters= new Object({"Angle":0});break;
			case "Go To" :      parameters= new Object({"Go To":null});break;
			case "Add" :        parameters= new Object({"Add":null,"Stop":false});break;
	        case "Remove" :     parameters= new Object({});break;
        }
        var actions = ["Edit","Spawn","Delete","Animate","Play","Move","Move To","Rotate","Rotate To","Push","Push To","Torque","Go To","Add","Remove"];
        var conditions = ["Compare","Check","Collision","Timer","Touch","Keyboard"];
        if (actions.includes(type)) this.node =new Do({"id":Utils.id(),"type":type,"parameters":parameters});
        else if (conditions.includes(type)) this.node = new If({"id":Utils.id(),"type":type,"parameters":parameters,"nodeListTrue":[],"nodeListFalse":[]});
        this.type = "AddNodeCmd";
        this.name = "Add Node: " + this.type;
    }
 
    execute (){  
        this.editor.addNode(this.sceneID,this.actorID,this.scriptID,this.nodeID,this.insertPoint,this.node);
    }
    
    undo(){
        this.editor.removeNode(this.sceneID,this.actorID,this.scriptID,this.node.id);
    }

}
