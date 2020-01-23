class If {

    constructor(expression) {

        this.expression     = expression            || "";  /** */
        this.code           = null;                         /** */
        this.value          = null;                         /** */

        this.branchTrue     = {};                           /** */
        this.branchFalse    = {};                           /** */
    }

    run(scope) {

        this.value = this.code.eval(scope).entries[0];

        if(this.value) {

            for(var t in this.branchTrue) {

                this.branchTrue[t].run(scope);
            }
        }
        else {

            for(var f in this.branchFalse) {

                this.branchFalse[f].run(scope);
            }
        }
    }

    compileExpression() {

        this.code = math.compile(this.expression);
    }

    destroy() {

        this.destroyBranch(this.branchTrue);
        this.destroyBranch(this.branchFalse);

        Util.deepDestroy(this);
    }

    destroyBranch(branch) {

        Util.deepDestroy(branch);
    }
}