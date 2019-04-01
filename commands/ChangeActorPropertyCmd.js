class ChangeActorPropertyCmd extends Command {

    constructor (sceneID,actorID,property,value){
        super();
        this.sceneID=sceneID;
        this.actorID=actorID;
        this.property=property;
        this.value=value;
        this.scenePos=this.editor.model.sceneList.findIndex(i => i.id == sceneID);
        this.actorPos=this.editor.model.sceneList[this.scenePos].actorList.findIndex(i=>i.id==actorID);
        this.oldValue=this.editor.model.sceneList[this.scenePos].actorList[this.actorPos][property];
        this.type="ChangeActorPropertyCmd";
        this.name="Change Actor Property: "+this.property;
    }

    execute (){  
        this.editor.changeActorProperty(this.sceneID,this.actorID,this.property,this.value);
    }
    
    undo(){
        this.editor.changeActorProperty(this.sceneID,this.actorID,this.property,this.oldValue);
    }

}
