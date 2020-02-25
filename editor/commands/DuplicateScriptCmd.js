class DuplicateScriptCmd extends Command {

    constructor (sceneID,actorID,scriptID){
        super();
        this.sceneID = sceneID;
        this.actorID = actorID;
        var scenePos = this.editor.model.sceneList.findIndex(i => i.id == sceneID);
        var actorPos = this.editor.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID);
        this.pos = this.editor.model.sceneList[scenePos].actorList[actorPos].scriptList.findIndex(i => i.id == scriptID);
        this.scriptList=this.editor.model.sceneList[scenePos].actorList[actorPos].scriptList;
        var script = this.editor.model.sceneList[scenePos].actorList[actorPos].scriptList[this.pos];
        this.script = new Script(JSON.parse(JSON.stringify(script))); // Se crea igual que cuando se lee de disco
        this.script.id = Utils.id();
        this.script.name = Utils.newName(this.script.name,this.scriptList);
        this.type = "DuplicateScriptCmd";
        this.name = "Duplicate Script: " + this.script.id;
    }

    execute (){  
        this.editor.addScript(this.sceneID,this.actorID,this.pos+1,this.script);
    }
    
    undo(){
        this.editor.removeScript(this.sceneID,this.actorID,this.script.id);
    }

}
