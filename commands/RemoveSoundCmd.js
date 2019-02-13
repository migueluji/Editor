class RemoveSoundCmd extends Command {
    
    constructor (soundID){
        super();
        this.pos=this.editor.model.soundList.findIndex(i => i.id == soundID);
        this.sound=this.editor.model.soundList[this.pos];
        this.selectedSound=this.editor.selectedSound;
        this.type="RemoveSoundCmd";
        this.name="Remove Sound: "+soundID;
    }
    
    execute (){
        this.editor.removeSound(this.sound.id);
        this.editor.selectSound(null);
    }
    
    undo(){
        this.editor.addSound(this.sound);
        this.editor.selectSound(this.selectedSound);
    }

}
