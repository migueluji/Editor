class RemoveFontCmd extends Command {
    
    constructor (fontID){
        super();
        this.pos=this.editor.model.fontList.findIndex(i => i.id == fontID);
        this.font=this.editor.model.fontList[this.pos];
        this.selectedFont=this.editor.selectedFont;
        this.type="RemoveFontCmd";
        this.name="Remove Font: "+fontID;
    }
    
    execute (){
        this.editor.removeFont(this.font.id);
        this.editor.selectFont(null);
    }
    
    undo(){
        this.editor.addFont(this.font);
        this.editor.selectFont(this.selectedFont);
    }

}
