class AddSoundCmd extends Command {
    
    constructor (soundName){
        super();
        this.sound={"id":Utils.id(), "name":soundName};
        this.selectedSound=this.editor.selectedSound;
        this.type="AddSoundCmd";
        this.name="Add Sound: "+this.sound.id;
    }

    execute (){
        this.editor.addSound(this.sound);
        this.editor.selectSound(this.sound.id);
    }
    
    undo(){
        this.editor.removeSound(this.sound.id);
        this.editor.selectSound(this.selectedSound);
    }

}
