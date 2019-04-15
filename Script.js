class Script {
	
    constructor(script) {
        this.id = script.id;
        this.name = script.name;
        this.nodeList=[];
        Object.assign(this,script);
    }
}