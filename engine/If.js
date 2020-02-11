class If {

    constructor(expression) {

        this.expression     = expression || ""; /** */
        this.code           = null;             /** */
        this.value          = null;             /** */

        this.nodeListTrue     = {};             /** */
        this.nodeListFalse    = {};             /** */
    }

    run(scope) {

        this.value = this.code.eval(scope).entries[0];

        if(this.value) {

            for(var t in this.nodeListTrue) {

                this.nodeListTrue[t].run(scope);
            }
        }
        else {

            for(var f in this.nodeListFalse) {

                this.nodeListFalse[f].run(scope);
            }
        }
    }

    compileExpression() {

        this.code = math.compile(this.expression);
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