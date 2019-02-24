class Scene {
    constructor(scene) {
        Object.assign(this,scene);
        if (this.actorList) this.actorList.forEach((actor,i) => this.actorList[i]=new Actor(actor));
    }

    addActor(actor,pos){
        if (pos == 0) this.actorList=[]; // si la lista de actores no existe hay que crearla
        this.actorList.splice(pos,0,actor);
    }

    removeActor(actorID){
        this.actorList.splice(this.actorList.findIndex(i=>i.id==actorID),1);
    }
}