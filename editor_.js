class Editor_ {
    
    constructor(view,model) {
        this._view = view;
        this._model = model;
                
        this.appBar_ =new AppBar_(new AppBarView(),this._model);
        this._view.html=this.appBar_.view.html;
  
        this.sideSheet_ =new SideSheet_(new SideSheetView(),this._model);
        this._view.html=this.sideSheet_.view.html;
  
        this.sceneList_ = new SceneList_(new SceneListView(),this._model);
        this._view.html=this.sceneList_.view.html;
    }
    
    get view() {
        return this._view;
    }
    
    get model(){
        return this._model;
    }

    addScene(scene,pos) {  
        var scene_=new Scene_ (new SceneView(),this._model,this.cmdManager);
        scene_.create(scene,pos);
        this.sceneList_.view.addScene(scene_.view,pos); //actualiza la vista de la lista de escenas
    }

    removeScene(sceneID){
        this.sceneList_.model.removeScene(sceneID);
        this.sceneList_.view.removeScene(sceneID);
    }
 
}