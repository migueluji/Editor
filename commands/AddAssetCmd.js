class AddAssetCmd extends Command {
    
    constructor (name,option){
        super();
        this.option=option;
        this.asset=new Object({"id":Utils.id(), "name":name});
        switch (option) {
            case "Image" : this.assetSelected=this.editor.selectedImage; break;
            case "Sound" : this.assetSelected=this.editor.selectedSound; break;
            case "Font" :  this.assetSelected=this.editor.selectedFont; break;
        }
        this.type="AddAssetCmd";
        this.name="Add "+option+": "+this.asset.name;
    }

    execute (){
        this.editor.addAsset(this.asset,this.option);
    }
    
    undo(){
        this.editor.removeAsset(this.asset.id,this.option);
    }

}
