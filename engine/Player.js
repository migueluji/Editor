class Player {

    constructor(player) {

        this.file   = new File(player); /** */
        this.engine = null;             /** */

        this.init();
    }

    init() {

        this.file.load();
    }

    onFileLoaded() {

        console.log(this.file.data)

        var debugParser = Util.parser({}, this.file.data);

        this.engine = new Engine(debugParser);   /** Sin el parser, el parametro es "this.file.data"*/
        //this.engine = new Engine(this.file.data);

        this.run();
    }

    run() {

        this.engine.gameLoop();
    }
}