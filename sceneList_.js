class SceneList_ {
    
    constructor(view,model,cmdManager) {
        this.view = view;
        this.model = model;  
        this.view.addSceneListener(cmdManager.addSceneCmd.bind(cmdManager));
    }

    getView() {
        return this.view;
    }

}