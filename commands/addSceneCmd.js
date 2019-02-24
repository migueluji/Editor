class AddSceneCmd extends Command {

    constructor (pos){
        super();
        this.scene= new Scene({"name":this.newName(pos),"id":"id"+(new Date()).valueOf()});
        this.pos=pos;
        this.type="AddSceneCmd";
        this.name="Add Scene: "+this.scene.id;
    }

    newName (pos){
        pos = pos+1;
        var name="Scene "+pos;
        while(this.editor.model.sceneList.findIndex(i=>i.name==name)!== -1){
            pos++;
            name="Scene "+pos;
        }
        return name;
    }

    execute (){  
        this.editor.addScene(this.scene,this.pos);
    }
    
    undo(){
        this.editor.removeScene(this.scene.id);
    }

}
