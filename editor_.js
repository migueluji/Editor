class Editor_ {
    
    constructor(view,model) {
        this._view = view;
        this._model = model;  
        this.cmdManager = new CmdManager(this);

        this._view.undoListener(this.cmdManager.undo.bind(this.cmdManager));
        this._view.redoListener(this.cmdManager.redo.bind(this.cmdManager));

        // crea el presenter de la lista y lo añade al documento
        this.sceneList_ = new SceneList_(new SceneListDiv(),this._model,this.cmdManager);
        this._view.html.appendChild(this.sceneList_.view.html);
    }
    
    get view() {
        return this._view;
    }
    
    get model(){
        return this._model;
    }

    addScene(scene,pos) {  
        var scene_=new Scene_ (new SceneLi(),this._model,this.cmdManager);
        scene_.create(scene,pos);
        this.sceneList_.view.addScene(scene_.view,pos); //actualiza la vista de la lista de escenas
    }

    removeScene(sceneID){
        this.sceneList_.model.removeScene(sceneID);
        this.sceneList_.view.removeScene(sceneID);
    }
 
}