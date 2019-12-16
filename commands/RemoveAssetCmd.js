class RemoveAssetCmd extends Command {
    
    constructor (assetID,option){
        super();
        this.option=option;
        var assetList;
        switch (option) {
            case "Image" : 
                assetList=this.editor.model.imageList; break;
            case "Sound" : 
                assetList=this.editor.model.soundList; break;
            case "Font" : 
                assetList=this.editor.model.fontList; break;
        }
        this.pos=assetList.findIndex(i => i.id == assetID);
        this.asset=assetList[this.pos];
        this.type="RemoveAssetCmd";
        this.name="Remove "+option+": "+assetID;
    }
    
    execute (){
        this.editor.removeAsset(this.asset.id,this.option);
        this.editor.selectAsset(null);
    }
    
    undo(){
        this.editor.addAsset(this.asset,this.option);
        this.editor.selectAsset(this.asset.id);
    }

}
