class SceneList_ {
    
    constructor(view,editor_) {
        this.view = view;
        this.model = editor_.model;  
        this.view.addSceneListener(editor_.addSceneCmd.bind(editor_));
    }

    getView() {
        return this.view;
    }

}