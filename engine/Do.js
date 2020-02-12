class Do {

    constructor(expression) {

        this.expression     = expression || ""; /** */
        this.code           = null;             /** */
        this.value          = null;             /** */
    }

    run(scope) {

        
        this.value = this.code.eval(scope).entries[0];
    }

    compileExpression() {
        
        //console.log(this.expression);
        this.code = math.compile(this.expression); /** Compilamos la expresion con Math.js. */
    }

    destroy() {

        Util.deepDestroy(this);
    }
}