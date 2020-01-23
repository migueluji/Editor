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

        this.code = math.compile(this.expression);
    }

    destroy() {

        Util.deepDestroy(this);
    }
}