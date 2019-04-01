class AddFontCmd extends Command {
    
    constructor (fontName){
        super();
        this.font= new Asset({"id":Utils.id(), "name":fontName});
        this.selectedFont=this.editor.selectedFont;
        this.type="AddFontCmd";
        this.name="Add Font: "+this.font.id;
    }

    execute (){
        this.editor.addFont(this.font);
        this.editor.selectFont(this.font.id);
    }
    
    undo(){
        this.editor.removeFont(this.font.id);
        this.editor.selectFont(this.selectedFont);
    }

}
