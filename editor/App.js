class App {
    constructor(/*userId, gameId,*/ serverGamesFolder,gameFolder){		
	//	this.userId=userId;
    //	this.gameId=gameId;
        this.file=new File();
        this.serverGamesFolder=serverGamesFolder;
        this.gameFolder=gameFolder;
        this.file.load(this.serverGamesFolder+"/loadJson.php?gameFolder="+this.gameFolder,this);
    }
    onFileLoaded(json){
        this.data=json;
        (Object.keys(json).length) ?  this.file.loadAssets(this.serverGamesFolder+"/"+this.gameFolder+"/images",json.imageList,this) :
                                      this.onAssetLoaded();
    }

    onAssetLoaded(){
        var editor = new Editor(new EditorView(),new Game(this.data));
        new CmdManager(editor);
        document.body.appendChild(editor.view.html);
    }
}