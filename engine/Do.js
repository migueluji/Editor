class Do {

    constructor(expression) {

        this.expression     = expression || ""; /** */
        this.code           = null;             /** */
        this.value          = null;             /** */
    }

    run(scope) {

        this.value = this.code.eval(scope).entries[0];
    }

    compileExpression(scope) {

        /** Actualizamos las referencias al scope en la expresion.
         *  Es necesario hacerlo aqui, para que el scope este completamente cargado y la
         *  expresion sea coherente.*/
        this.expression = Util.updateExpressionNames(this.expression, scope);

        /** Compilamos la expresion con Math.js. */
        this.code = math.compile(this.expression);
    }

    destroy() {

        Util.deepDestroy(this);
    }
}