class Command {
    
    constructor(editorRef){
        if(editorRef!== undefined) Command.editor=editorRef;
        this.editor= Command.editor;
    }

// GAME
    static saveGameCmd(){
        this.editor.saveGame();
    }

    static takeScreenshot(){
        this.editor.takeScreenshot();
    }  

    static openGamePropertiesCmd(){
        this.editor.openGameProperties();
    }

    static playGameCmd(){
        this.editor.playGame();
    }
    
// SCENES
    static openSceneMenuCmd(sceneID,x,y){
        this.editor.openSceneMenu(sceneID,x,y);
    }

    static selectSceneCmd(sceneID){
        this.editor.selectScene(sceneID);
    }

    static openCastCmd(){
        this.editor.openCast();
    }

    static drawerToggleCmd(){
        this.editor.drawerToggle();
    }

// ACTORS
    static openActorMenuCmd(actorID,x,y){
        this.editor.openActorMenu(actorID,x,y);
    }

    static openActorScriptMenuCmd(scriptID,x,y){
        this.editor.openActorScriptMenu(scriptID,x,y);
    }

    static selectActorCmd(actorID){
        this.editor.selectActor(actorID);
    }

    static openActorPropertiesCmd(){
        this.editor.openActorProperties();
    }

    static selectScriptCmd(scriptID){
        this.editor.selectScript(scriptID,true);//init script position
    }

    static openActorScriptsCmd(){
        this.editor.openActorScripts();
    }

    static closeActorScriptsCmd(){
        this.editor.closeActorScripts();
    }

    static selectNodeCmd(nodeID){
        this.editor.selectNode(nodeID);
    }

// TAGS
    static openTagsCmd(input){
        this.editor.openTags(input);
    }

// GETS
    static getTagListCmd(){
        return(this.editor.getTagList());
    }

    static getActorListCmd(){
        return(this.editor.getActorList());
    }

    static getSceneListCmd(){
        return(this.editor.getSceneList());
    }

    static getPropertiesListCmd(element,type){
        return(this.editor.getPropertiesList(element,type));
    }
    
// ASSETS
    static addAssetCmd(name,type){
        this.editor.addAsset(name,type);
    }

    static removeAssetCmd(assetID, type){
        this.editor.removeAsset(assetID, type);
    }

    static openAssetsCmd(input,name,option){
        this.editor.openAssets(input,name,option);
    }

    static closeAssetCmd(){
        this.editor.closeAsset();
    }

    static selectAssetCmd(assetID){
        this.editor.selectAsset(assetID);
    }

    static uploadFileCmd(file, type){
		this.editor.uploadFile(file,type);
    }
    
	static deleteFileCmd(assetID, fileName, type){
	    this.editor.deleteFile(assetID, fileName, type);
	}
}