class AppBar_ {
    
    constructor(view,model) {
        this._view = view;
        this._model = model;  
        this._view.drawerListener();
        this._view.undoListener(CmdManager.undo.bind(CmdManager));
        this._view.redoListener(CmdManager.redo.bind(CmdManager));
    }

    get view() {
        return this._view;
    }

    get model(){
        return this._model;
    }

}