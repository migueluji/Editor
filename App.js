class App {
    constructor(userId, gameId, gameFolder, parentGamesFolder){		
		this.userId=userId;
		this.gameId=gameId;
		this.gameFolder=gameFolder;
		this.parentGamesFolder=parentGamesFolder;
        new File().load(this.parentGamesFolder+"/loadJson.php?gameFolder="+this.gameFolder);
    }
    onFileLoaded(file){
        var editor = new Editor(new EditorView(),new Game(file));
        new CmdManager(editor);
        document.body.appendChild(editor.view.html);
    }
}