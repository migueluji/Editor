class ChangeActorPropertyCmd extends Command {

    constructor (sceneID,actorID,property,value){
        super();
        this.sceneID=sceneID;
        this.actorID=actorID;
        this.property=property;
        this.value=value;
        var scenePos=this.editor.model.sceneList.findIndex(i => i.id == sceneID);
        var actorPos=this.editor.model.sceneList[scenePos].actorList.findIndex(i=>i.id==actorID);
        var actor=this.editor.model.sceneList[scenePos].actorList[actorPos];
        switch (property) {
            // case "imageSize" :
            //     this.oldValue={image:actor.image,width:actor.width,height:actor.height};
            //     break;
            case "position" :
                this.oldValue={x:actor.x,y:actor.y};
                break;
            case "scale" :
                this.oldValue={x:actor.x,y:actor.y,angle:actor.angle,flipX:actor.flipX,
                                scaleX:actor.scaleX,scaleY:actor.scaleY};
                break;
            case "scaleNoUniform" :
                this.oldValue={x:actor.x,y:actor.y,angle:actor.angle,flipX:actor.flipX,
                               scaleX:actor.scaleX,scaleY:actor.scaleY};
                break;
            default:
                this.oldValue=actor[property];
                break;
        }
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
