class RemoveImageCmd extends Command {
    
    constructor (imageID){
        super();
        this.pos=this.editor.model.imageList.findIndex(i => i.id == imageID);
        this.image=this.editor.model.imageList[this.pos];
        this.selectedImage=this.editor.selectedImage;
        this.type="RemoveImageCmd";
        this.name="Remove Image: "+imageID;
    }
    
    execute (){
        this.editor.removeImage(this.image.id);
        this.editor.selectImage(null);
    }
    
    undo(){
        this.editor.addImage(this.image);
        this.editor.selectImage(this.selectedImage);
    }

}
