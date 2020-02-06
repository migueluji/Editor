class File {

    constructor(file) {
        
        this.source = file.source || "";    /** */
        this.data   = file.data   || {};    /** */
    }
    load() {

        if(this.source == "local") {

            this.data = JSON.parse(String(this.data));
            this.loadAssets(this.data.imageList);
        }
        else {

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = this.ready.bind(xhr, event, this);
            xhr.open("GET", this.source, true);
            xhr.send(); 
        }
    }

    ready(xhr, file, event) {

        if(this.readyState === this.DONE) {

            file.data = JSON.parse(String(this.response)); /** Parse JSON file game data to a JS Object */
            file.loadAssets(file.data.imageList);
        }
    }

    loadAssets(imageList) {

        this.loader = new PIXI.Loader("./assets/images");
        this.loader.add(imageList);
        this.loader.onLoad.add((loader,resource) => {
            console.log(resource.name," loaded");
        });
        this.loader.load(()=>{
            console.log("Load finished!");
            player.onFileLoaded();
        });
    }
}