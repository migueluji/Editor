class If {

    constructor(expression, scope) {

        this.expression     = expression || ""; /** */
        this.code           = null;             /** */
        this.value          = null;             /** */
        this.scope          = scope || null;    /** */

        this.nodeListTrue     = {};             /** */
        this.nodeListFalse    = {};             /** */
    }

    run() {

        this.value = this.code.eval(this.scope).entries[0];

        if(this.expression.includes("onstart")) console.log(this.expression, this.value);

        if(this.value) {

            for(var t in this.nodeListTrue) {

                this.nodeListTrue[t].run();
            }
        }
        else {

            for(var f in this.nodeListFalse) {

                this.nodeListFalse[f].run();
            }
        }
    }

    compileExpression() {

        this.expression = Util.checkScope(this.expression, this.scope); /** Comprobamos si hay que actualizar la expresion y el scope. */
        this.code       = math.compile(this.expression);                /** Compilamos la expresion con Math.js. */
    }

    destroy() {

        this.destroyBranch(this.nodeListTrue);
        this.destroyBranch(this.nodeListFalse);

        Util.deepDestroy(this);
    }

    destroyBranch(branch) {

        Util.deepDestroy(branch);
    }
}