class SceneProperties_ {
    
    constructor(view,model,cmdManager) {
        this._view = new ScenePropertiesView();
        this._model = model;  
        this._view.closeScenePropertiesListener(view.closeSheetHandler.bind(view));
    }

    get view() {
        return this._view;
    }

    get model(){
        return this._model;
    }

}