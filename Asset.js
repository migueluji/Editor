class Asset {
	
    constructor(asset) {
        this.id = asset.id || "id"+Utils.id();
        this.name = asset.name || "";
    }
}