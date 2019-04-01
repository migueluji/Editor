class AddImageCmd extends Command {
    
    constructor (imageName){
        super();
        this.image=new Asset({"id":Utils.id(), "name":imageName});
        this.selectedImage=this.editor.selectedImage;
        this.type="AddImageCmd";
        this.name="Add Image: "+this.image.id;
    }

    execute (){
        this.editor.addImage(this.image);
        this.editor.selectImage(this.image.id);
    }
    
    undo(){
        this.editor.removeImage(this.image.id);
        this.editor.selectImage(this.selectedImage);
    }

}
