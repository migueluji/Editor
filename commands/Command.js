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
    static openAssetsCmd(input){
        this.editor.openAssets(input);
    }
// SOUNDS
    static selectSoundCmd(soundID){
        this.editor.selectSound(soundID);
    }

    static openSoundsCmd(actorID){
        this.editor.openSounds(actorID);
    }

// IMAGES
    static selectImageCmd(imageID){
        this.editor.selectImage(imageID);
    }

    static openImagesCmd(){
        this.editor.openImages();
    }

// FONTS
    static selectFontCmd(fontID){
        this.editor.selectFont(fontID);
    }

    static openFontsCmd(){
        this.editor.openFonts();
    }

//
    static getTagListCmd(){
        return(this.editor.getTagList());
    }

    static getActorListCmd(){
        return(this.editor.getActorList());
    }

    static getSceneListCmd(){
        return(this.editor.getSceneList());
    }

    // static getPropertyValueCmd(property){
    //     return(this.editor.getPropertyValue(property));
    // }

    static getPropertiesListCmd(element,type){
        return(this.editor.getPropertiesList(element,type));
    }

}