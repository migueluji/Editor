class SideSheet_ {
    
    constructor(view,model) {
        this._view = view;
        this._model = model;  

        this.sceneProperties_= new SceneProperties_(this._view,this._model);
        this._view.html=this.sceneProperties_.view.html;

        this.gameProperties_= new GameProperties_(this._view,this._model);
        this._view.html=this.gameProperties_.view.html;
    }

    get view() {
        return this._view;
    }

    get model(){
        return this._model;
    }

}