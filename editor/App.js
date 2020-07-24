class App {
    constructor(userId, gameId, gameFolder, serverGamesFolder){		
		this.userId=userId;
		this.gameId=gameId;
		this.gameFolder=gameFolder;
		this.serverGamesFolder=serverGamesFolder;
        new File().load(this.serverGamesFolder+"/loadJson.php?gameFolder="+this.gameFolder);
    }
    onFileLoaded(file){
        var editor = new Editor(new EditorView(),new Game(file));
        new CmdManager(editor);
        document.body.appendChild(editor.view.html);
    }
}