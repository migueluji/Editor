class SceneList_ {
    
    constructor(view,model,cmdManager) {
        this._view = view;
        this._model = model;  
        this.view.addSceneListener(cmdManager.addSceneCmd.bind(cmdManager));
    }

    get view() {
        return this._view;
    }

    get model(){
        return this._model;
    }

}