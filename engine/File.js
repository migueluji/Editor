class File {

    constructor(file) {
        
        this.source = file.source || "";    /** */
        this.data   = {};                   /** */
    }

    load() {
        
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = this.ready.bind(xhr, event, this);
        xhr.open("GET", this.source, true);
        xhr.send(); 
    }

    ready(xhr, file, event) {

        if(this.readyState === this.DONE) {

            file.data = JSON.parse(String(this.response)); /** Parse JSON file game data to a JS Object */

            player.onFileLoaded();
        }
    }
}