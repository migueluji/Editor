class File {
    
    load(URL,app) {		
        var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
            if(this.readyState == this.DONE && this.status == 200){
                var json=JSON.parse(this.responseText);  	   
                app.onFileLoaded(json);
           }
        }
        xhr.open("GET", URL, true);
        xhr.send();
    }

    loadAssets(URL,imageList,app) {
        this.loader = new PIXI.Loader(URL);
        this.loader.add(imageList);
        this.loader.onLoad.add((loader, resource) => { 
            console.log(resource.name," loaded");
        });
        this.loader.load(()=>{
            console.log("Load finished!");
            app.onAssetLoaded();
        });
    }
  
    static save(json) {
        var url=app.serverGamesFolder+"/saveJson.php?gameId="+app.gameId+"&gameFolder="+app.gameFolder;
		var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {		
            if (xhr.readyState == 4) 
                if (xhr.status == 200) alert(xhr.responseText);
                else   alert("Server Error! "+xhr.responseText);
        }		
        xhr.send(json);
    }

	static uploadFile(gameFolder, fileName, formData, type){
        console.log("file",formData);
	 	var destination;
	    if(type=="Image" || type=="Animation") 	destination="images";
		if(type=="Sound")   destination="sounds";
		var url=app.serverGamesFolder+"/uploadAsset.php?gameFolder="+gameFolder+"&assetFolder="+destination;
		
		var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
		xhr.type=type;
		xhr.fileName=fileName;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4)		
                if (xhr.status == 200)  Command.addAssetCmd(this.fileName, this.type);
                else  alert("Server Error! "+xhr.responseText);	
        }	
        xhr.send(formData);		
    }
    
	static deleteFile(gameFolder, assetID, fileName, type){
		var assetFolder="";
		if(type=="Image" || type=="Animation")	assetFolder="images";
		else if(type=="Sound") assetFolder="sounds";
		// console.log("Delete asset: "+fileName+" in "+assetFolder);
		var url=app.serverGamesFolder+"/deleteAsset.php?gameFolder="+gameFolder+"&assetFolder="+assetFolder+"&filename="+fileName;
		var xhr = new XMLHttpRequest();
		xhr.assetID=assetID;
		xhr.fileName=fileName;
		xhr.type=type;
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
           if (xhr.readyState == 4)
                if (xhr.status == 200)  Command.removeAssetCmd(this.assetID, this.type);	
                else alert("Server Error! "+xhr.responseText);				
        }		
        xhr.send();		
    }
    
}