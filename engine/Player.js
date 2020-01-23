class Player {

    constructor(player) {

        this.file   = new File({source: player.source});    /** */
        this.engine = null;                                 /** */

        this.init();
    }

    init() {

        this.file.load();
    }

    onFileLoaded() {

        //this.engine = new Engine(Util.parser({}, this.file.data));   /** Sin el parser, el parametro es "this.file.data"*/
        this.engine = new Engine(this.file.data);

        this.run();
    }

    run() {

        this.engine.gameLoop();
    }
}