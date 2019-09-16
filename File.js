class File {

    load(URL) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = this.ready.bind(xhr);
        xhr.open("GET", URL, true);
        xhr.send();
    }

    ready() {
       if(this.readyState == this.DONE && this.status == 200){
           var json=JSON.parse(this.responseText);
            app.onFileLoaded(json);   
        }
    }

    static save(url,json) {
        var a = document.createElement("a");
        var blob = new Blob([json], {type: 'text/plain'});
        a.href = URL.createObjectURL(blob);
        a.download = url;
        a.click();
     }
}