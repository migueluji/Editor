class App {

    constructor(url){
        new File().load(url);
    }
    
    onFileLoaded(file){
        var editor = new Editor(new EditorView(),new Game(file));
        new CmdManager(editor);
        document.body.appendChild(editor.view.html);
    }
}