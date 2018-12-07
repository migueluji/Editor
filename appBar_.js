class AppBar_ {
    
    constructor(view,model,cmdManager) {
        this._view = new AppBarView();
        this._model = model;  
        this._view.drawerListener(view.drawerHandler.bind(view));
        this._view.undoListener(cmdManager.undo.bind(cmdManager));
        this._view.redoListener(cmdManager.redo.bind(cmdManager));
    }

    get view() {
        return this._view;
    }

    get model(){
        return this._model;
    }

}