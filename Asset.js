class Asset {
	
    constructor(asset) {
        this.id = asset.id || "id"+(new Date()).valueOf();
        this.name = asset.name || "";
    }
}