class Do {

    constructor(expression, scope) {

        this.expression     = expression || ""; /** */
        this.code           = null;             /** */
        this.value          = null;             /** */
        this.scope          = scope || null;    /** */
    }

    run() {

        try {

            this.value = this.code.eval(this.scope).entries[0];
        }
        catch(error) { console.error(error); }
    }

    compileExpression() {

        this.expression = Util.checkScope(this.expression, this.scope); /** Comprobamos si hay que actualizar la expresion y el scope. */
        this.code       = math.compile(this.expression);                /** Compilamos la expresion con Math.js. */
    }

    destroy() { Util.deepDestroy(this); }
}