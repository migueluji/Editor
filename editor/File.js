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
        if(imageList) this.loader.add(imageList);
        else this.loader.add("Loader","https://gamesonomy.com/editor/images/gamesonomy.png");// trick to initialize the loader when there is not /image folder
        this.loader.onLoad.add((loader, resource) => { 
            // console.log(resource.name," loaded");
        });
        this.loader.load(()=>{
           // console.log("Load finished!");
            if(app.file.loader.resources.hasOwnProperty("Loader")) {
                app.file.loader.resources["Loader"].texture.destroy(true);
                delete app.file.loader.resources["Loader"];
            }
            app.onAssetLoaded();
        });
    }
  
    static save(json) {
        var url=app.serverGamesFolder+"/saveJson.php?gameId="+app.gameId+"&gameFolder="+app.gameFolder;
		var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        var upload=false;
        xhr.onreadystatechange = function () {	
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    alert(xhr.responseText); 
                    Command.takeScreenshot();
                }  
                else  if (xhr.status == 404) alert ("DEMO VERSION - The Game cannot be saved")
                      else alert("Server Error! "+xhr.responseText);
                return upload;
            }   
        }		
        xhr.send(json);
    }

    static uploadFile(file, formData, type){
        var destination;
        switch (true) {
            case (type=="Image") || (type=="Animation") : destination="images"; break;
            case (type=="Sound") : destination="sounds"; break;
            case (type=="ScreenShoot") : destination=""; break;
        }
		var url=app.serverGamesFolder+"/uploadFile.php?gameFolder="+app.gameFolder+"&assetFolder="+destination;
		var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
		xhr.type=type;
        xhr.fileName=file.name;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4){		
                if (xhr.status == 200) {if (destination!="") Command.addAssetCmd(this.fileName, this.type);}
                else  if (xhr.status == 404) alert("DEMO VERSION - It was not possible to upload asset files");	
                      else alert("Server Error! "+xhr.responseText);
            }
        }	
        xhr.send(formData);		
    }
    
	static deleteFile(gameFolder, assetID, fileName, type){
		var assetFolder="";
		if(type=="Image" || type=="Animation")	assetFolder="images";
		else if(type=="Sound") assetFolder="sounds";
		var url=app.serverGamesFolder+"/deleteAsset.php?gameFolder="+gameFolder+"&assetFolder="+assetFolder+"&filename="+fileName;
		var xhr = new XMLHttpRequest();
		xhr.assetID=assetID;
		xhr.fileName=fileName;
		xhr.type=type;
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
           if (xhr.readyState == 4)
                if (xhr.status == 200) Command.removeAssetCmd(assetID,type);	
                else if ( xhr.status == 404) alert("DEMO VERSION - It was not possible to delete asset files");	
                     else alert("Server Error! "+xhr.responseText);				
        }		
        xhr.send();		
    }
    
}