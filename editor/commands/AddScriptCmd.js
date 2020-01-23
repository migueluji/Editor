class AddScriptCmd extends Command {

    constructor (sceneID,actorID,scriptPos){
        super();
        this.scriptPos=scriptPos;
        this.sceneID=sceneID;
        this.actorID=actorID;
        this.script= new Script({"id":Utils.id(),"name":this.newName(scriptPos)});
        this.type="AddScriptCmd";
        this.name="Add Script: "+ this.script.id;
    }

    newName (scriptPos){
        scriptPos = scriptPos+1;
        var name="Script_"+scriptPos;
        var sceneIndex=this.editor.model.sceneList.findIndex(i=> i.id == this.sceneID);
        var actorIndex=this.editor.model.sceneList[sceneIndex].actorList.findIndex(i=>i.id==this.actorID);
        var scriptList = this.editor.model.sceneList[sceneIndex].actorList[actorIndex].scriptList;
        while( scriptList && scriptList.findIndex(i=>i.name==name)!== -1){
            scriptPos++;
            name="Script_"+scriptPos;
        }
        return name;
    }

    execute (){  
       this.editor.addScript(this.sceneID,this.actorID,this.scriptPos,this.script);
    }
    
    undo(){
        this.editor.removeScript(this.sceneID,this.actorID,this.script.id);
    }

}
