class Scene {
    constructor(scene) {
        this.id=Utils.id();
        this.name=scene.name;
        this.actorList=[];
        Object.assign(this,scene);
        if (this.actorList) this.actorList.forEach((actor,i) => this.actorList[i]=new Actor(actor));
    }

    addActor(actor,pos){
        this.actorList.splice(pos,0,actor);
    }

    removeActor(actorID){
        this.actorList.splice(this.actorList.findIndex(i=>i.id==actorID),1);
    }
}