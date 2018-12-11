class GameProperties_ {
    
    constructor(view,model,cmdManager) {
        this._view = new GamePropertiesView();
        this._model = model;  
        this._view.closeGamePropertiesListener(view.closeSheetHandler.bind(view));
    }

    get view() {
        return this._view;
    }

}