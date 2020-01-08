class Command {
    
    constructor(editorRef){
        if(editorRef!== undefined){//si tengo un editor
          Command.editor=editorRef;
        }
        this.editor= Command.editor;
    }

// GAME
    static saveGameCmd(){
        this.editor.saveGame();
    }

    static openGamePropertiesCmd(){
        this.editor.openGameProperties();
    }

    static playGameCmd(){
        this.editor.playGame();
    }
// SCENES
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
    static selectActorCmd(actorID){
        this.editor.selectActor(actorID);
    }

    static openActorPropertiesCmd(){
        this.editor.openActorProperties();
    }

    static selectScriptCmd(scriptID){
        this.editor.selectScript(scriptID);
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

// ASSETS
    static openAssetsCmd(input,name,option){
        this.editor.openAssets(input,name,option);
    }

    static closeAssetCmd(){
        this.editor.closeAsset();
    }

    static selectAssetCmd(assetID){
        this.editor.selectAsset(assetID);
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

}