
class Do {

    constructor(node) {
        Object.assign(this,node);
        this.expression = new Expression (node.expression);
    }

}