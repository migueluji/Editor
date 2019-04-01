class Script {
	
    constructor(script) {
        this.id = script.id || "id"+Utils.id();
        this.name = script.name || "";
    }
}