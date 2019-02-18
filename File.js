class File {
    
    constructor(URL) {
        this.URL=URL;
    }

    load() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = this.ready.bind(xhr, event, this.model);
        xhr.open("GET", this.URL, true);
        xhr.send(); 
    }

    ready(xhr, fileModel, event) {

     //   if(this.readyState === this.DONE) {
        if(this.readyState==4 && this.status==200){
            var myObj =JSON.parse(this.repsonseText);
            console.log("Json parsed data is: " + JSON.stringify(myObj));
       }
            //fileModel.JSON = JSON.parse(String(this.response));
            //fileModel.loaded = true;
            //player.onFileLoaded();
    }

}