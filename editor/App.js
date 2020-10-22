class App {
    constructor(serverGamesFolder,gameFolder,gameId){		
        this.file = new File();
        this.serverGamesFolder=serverGamesFolder;
        this.gameFolder = gameFolder;
        this.gameId = gameId;

        this.load = new LoadingView("var(--mdc-theme-primary)");
        document.body.appendChild(this.load.html);

        this.file.load(this.serverGamesFolder+"/loadJson.php?gameFolder="+this.gameFolder,this);
    }
    
    onFileLoaded(json){
        this.data=json;
        this.file.loadAssets(this.serverGamesFolder+"/"+this.gameFolder+"/images",json.imageList,this);
    }

    onAssetLoaded(){
        var editor = new Editor(new EditorView(),new Game(this.data));
        new CmdManager(editor);
        document.body.appendChild(editor.view.html);
        this.load.closeDialog();
    }
}