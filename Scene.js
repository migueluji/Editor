class Scene {
    constructor(scene) {
        Object.assign(this,scene);
        this.actorList.forEach((actor,i) => this.actorList[i]=new Actor(actor));
    }

    addActor(actor,pos){
        this.actorList.splice(pos,0,actor);
    }

    removeActor(actorID){
        this.actorList.splice(this.actorList.findIndex(i=>i.id==actorID),1);
    }
}