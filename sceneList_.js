class SceneList_ {
    
    constructor(view,model) {
        this._view = view;
        this._model = model;  
        this.view.addSceneListener(CmdManager.addSceneCmd.bind(CmdManager));
    }

    get view() {
        return this._view;
    }

    get model(){
        return this._model;
    }

}