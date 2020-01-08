class Logic {

    constructor(game) {

        this.actorList      = {};   /** */
        this.scope          = {};   /** */

        this.nodeList       = [];   /** Lista auxiliar de todos los nuevos nodos cargados en memoria (para compilarlos) */

        this.timerList      = {};   /** */

        this.currentTime    = 0.0;  /** */
        this.previousTime   = 0.0;  /** */
    }

    run() {

        for(var i in this.actorList) {

            for(var j in this.actorList[i].scriptList) {

                this.runScript(this.actorList[i].scriptList[j]);
            }
        }

        this.compileTexts();
    }

    runScript(script) {

        for(var i in script) {

            script[i].run(this.scope);
        }
    }

    setActorLogic(actor) {

        /** Añadimos el actor al scope (independientemente de que tenga reglas de comportamiento o no) */
        this.scope[actor.ID] = actor; 

        /** Configuramos sus reglas de comportamiento (si fuera necesario) */
        var scriptList = {};
        var empty = true;

        for(var i in actor.scriptList) {

            empty = false;
            scriptList[i] = this.setScripts(actor, actor.scriptList[i]);
        }

        actor.scriptList = scriptList;

        if(!empty) { 

            /** Añadimos el actor a la lista del motor de logica */
            this.actorList[actor.ID] = actor;
        }
    }

    setScripts(actor, scripts) {

        var script = {};

        for(var i in scripts) {

            script[i] = this.expandNode(actor, scripts[i]);
        }

        return script;
    }

    expandNode(actor, node) {

        var _node = this[node.type](actor, node);

        switch(node.type) {

            case "Collide": case "Keyboard": case "Pointer": case "Compare": case "Check": case "Timer":
                _node.branchTrue  = this.setScripts(actor, node.branchTrue);
                _node.branchFalse = this.setScripts(actor, node.branchFalse);
                break;

            default:
                break;
        }

        this.nodeList.push(_node);

        return _node;
    }

    setScope(engine) {

        this.scope          = {};               /** Resetemos el scope (por el cambio de escena) */

        this.scope.Game     = engine.game;      /** Añadimos las propiedades del game al scope de logica */

        this.scope.Physics  = engine.physics;   /** Añadimos las propiedades de fisicas al scope de logica */
        this.scope.Input    = engine.input;     /** Añadimos las propiedades de input al scope de logica */
        this.scope.Logic    = engine.logic;     /** Añadimos las propiedades de logica al scope de logica */
        this.scope.Audio    = engine.audio;     /** Añadimos las propiedades de audio al scope de logica */
        this.scope.Render   = engine.render;    /** Añadimos las propiedades de render al scope de logica */
        this.scope.Engine   = engine;           /** Añadimos las propiedades del engine al scope de logica */

        /** Los actores se añaden automaticamente al añadir un actor nuevo al motor (ver this.setActorLogic()) */

        //console.log(this.scope);
    }

    compileExpressions() {

        for(var i = 0; i < this.nodeList.length; i++) {

            this.nodeList[i].compileExpression();
        }

        this.nodeList = [];
    }

    disableActor(actor) {

        actor.__scriptListData  = Object.assign({}, actor.scriptList);
        actor.scriptList        = {};
    }

    enableActor(actor) {

        actor.scriptList        = Object.assign({}, actor.__scriptListData);
        actor.__scriptListData  = {};
        delete actor.__scriptListData;
    }

    destroyActor(actor) {

        /** Eliminamos el actor del scope
         * ----------------------------------------------------------------------- */
        Util.destroy(this.scope, actor.name);

        /** Eliminamos tosos los scripts junto con sus nodos
         * ----------------------------------------------------------------------- */
        for(var i in actor.scriptList) {

            this.destroyScript(actor.scriptList[i]);
            Util.destroy(actor.scriptList, i);
        }
        
        actor.scriptList = null;

        /** Eliminamos el actor de la lista de actores del motor de logica 
         * ----------------------------------------------------------------------- */
        delete this.actorList[actor.ID];
    }

    destroyScript(script) {

        for(var i in script) {

            script[i].destroy();
        }
    }

    reset() {

        /** Actualizar las propiedades de elapsedTime y deltaTime. */
        this.currentTime            = Util.getDate();
        this.scope.Game.deltaTime   = Util.clamp(this.currentTime - this.previousTime, 0, 0.025); // El clamp es para evitar picos indeseados.
        this.previousTime           = this.currentTime;
        this.scope.Game.elapsedTime += this.scope.Game.deltaTime; 

        /** Contabilizar los timers */
        for(var i in this.timerList) {

            this.timerList[i].timer += this.scope.Game.deltaTime;
        }

        // TODO: ¿Resetear las variables TAG de colision?
    }

    compileTexts() {

        for(var i in this.scope) {

            if(this.scope[i].text != undefined) {

                this.scope[i].compiledText = eval("` " + this.scope[i].text + "`");
            }
        }
    }

    updateTimer(condition, timerProperty) {

        timerProperty.timer         = condition ? 0 : timerProperty.timer;
        timerProperty.previousTime  = condition ? this.scope.Game.elapsedTime : timerProperty.previousTime;
        timerProperty.timer = (timerProperty.previousTime > (this.scope.Game.elapsedTime - this.scope.Game.deltaTime * 1.07)) ? 0 : timerProperty.timer;
    }

    animateActor(actor, animation, timerCondition) {

        actor.spriteName = actor[animation].list[actor[animation].index];
        actor[animation].index = timerCondition ? ((actor[animation].index == actor[animation].maxIndex - 1) ? 0 : actor[animation].index + 1) : actor[animation].index;
    }










    /** ###############################################################################
     *  Construccion de las expresiones para todas las acciones y condiciones 
     *  ############################################################################### */

    Compare(actor, node) {
        
        /** Definimos la expresion */
        var expression = node.leftExpression + "" + node.relationalOperator + "" + node.rightExpression + "\n";

        /** Determinamos si en la expresion aparece "Me."" y lo sustituimos */
        expression = Util.replaceActorSelfReference(actor, expression);

        /** Actualizamos las referencias al scope en la expresion. */
        expression = Util.updateExpressionNames(expression, this.scope);

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression); 
    }

    Check(actor, node) {
        
        /** Determinamos si el nodo se refiere al actor padre */
        var element = (node.element == "Me") ? actor.name : node.element;

        /** Definimos la expresion */
        var expression = element + "." + node.property + "\n";

        /** Determinamos si en la expresion aparece "Me."" y lo sustituimos */
        expression = Util.replaceActorSelfReference(actor, expression);

        /** Actualizamos las referencias al scope en la expresion. */
        expression = Util.updateExpressionNames(expression, this.scope);

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression); 
    }

    Timer(actor, node) {

        /* Si las reglas del actor cuentan con alguna condicion de timer,
        se ha de crear una variable booleana de ejecucion con la nomenclatura
        "timer + ID" en este actor. */
        var timerProperty = "timer" + Util.random(); 

        /* Añadimos la varible de control al engine. */
        this.timerList[timerProperty] = {timer: 0.00, previousTime: 0.00};

        /** Definimos el nombre de la condicion de timer unica (para el compilado de la expresion en el scope) */
        var timerCondition = "timerCondition" + Util.random();
        
        /** Definimos la expresion */
        var expression = "" + timerCondition + " = Logic.timerList." + timerProperty + ".timer > " + node.value + "\n" +
                         "Logic.updateTimer(" + timerCondition + ", Logic.timerList." + timerProperty + ")" + "\n";

        /** Determinamos si en la expresion aparece "Me."" y lo sustituimos */
        expression = Util.replaceActorSelfReference(actor, expression);

        /** Actualizamos las referencias al scope en la expresion. */
        expression = Util.updateExpressionNames(expression, this.scope);

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression); 
    }

    Collide(actor, node) {

        /* Si las reglas del actor cuentan con alguna condicion de colision,
        se ha de crear una variable booleana de ejecucion con la nomenclatura
        "collidingWith + TagName + Tag" en este actor. */
        var collisionVariable = "collidingWith" + node.tag + "Tag";

        /* Añadimos la varible de control al actor. */
        actor[collisionVariable] = false;

        /** Definimos la expresion */
        var expression = actor.name + "." + collisionVariable + "\n";

        /** Actualizamos las referencias al scope en la expresion. */
        expression = Util.updateExpressionNames(expression, this.scope);

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression); 
    }

    Keyboard(actor, node) {

        /* Registramos la propiedad en el motor de Input para el control
        de este evento de teclado. */
        this.scope.Input.keyList[node.key] = {down: false, up: true, pressed: false};

        /** Definimos la expresion */
        var expression = "Input.keyList." + node.key + "." + node.mode + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression);
    }

    Pointer(actor, node) {

        /** Si el evento es sobre el actor, utilizamos la propiedad en el actor. 
         *  Si no, utilizaremos los parametros del motor de Input. */
        if(node.onActor) {

            /** Definimos la expresion */
            var expression = "" + actor.name + ".pointer." + node.mode + "\n";

            /** Actualizamos las referencias al scope en la expresion. */
            expression = Util.updateExpressionNames(expression, this.scope);
        }
        else {

            /** Definimos la expresion */
            var expression = "Input.pointer." + node.mode + "\n";
        }

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression);
    }

    Edit(actor, node) {

        /** Determinamos si el nodo se refiere al actor padre */
        var element = (node.element == "Me") ? actor.name : node.element;

        /** Definimos la expresion */
        var expression = element + "." + node.property + " = " + node.value + "\n";

        /** Determinamos si en la expresion aparece "Me."" y lo sustituimos */
        expression = Util.replaceActorSelfReference(actor, expression);

        /** Actualizamos las referencias al scope en la expresion. */
        expression = Util.updateExpressionNames(expression, this.scope);

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression);
    }

    Spawn(actor, node) {

        /** Definimos la expresion */
        var expression = "Engine.addSpawnedActor('" + node.actor + "'," + actor.name + ".x" + "+" + node.x + ", " + actor.name + ".y" + "+" + node.y + ", " + actor.angle + ")" + "\n";

        /** Actualizamos las referencias al scope en la expresion. */
        expression = Util.updateExpressionNames(expression, this.scope);

        /* Creamos el nuevo nodo con su expresion correspondiente.*/
        return new Do(expression);
    }

    Destroy(actor, node) {

        /** Definimos la expresion */
        var expression = "Engine.addDestroyedActor(" + actor.name + ")" + "\n";

        /** Actualizamos las referencias al scope en la expresion. */
        expression = Util.updateExpressionNames(expression, this.scope);

        /* Creamos el nuevo nodo con su expresion correspondiente.*/
        return new Do(expression);
    }

    Move(actor, node) {

        /** Definimos la expresion */
        var expression = actor.name + ".x = " + actor.name + ".x + " + node.speed + " * cos(" + node.angle + " * PI / 180.0) * Game.deltaTime" + "\n" + 
                         actor.name + ".y = " + actor.name + ".y + " + node.speed + " * sin(" + node.angle + " * PI / 180.0) * Game.deltaTime \n";

        /** Determinamos si en la expresion aparece "Me."" y lo sustituimos */
        expression = Util.replaceActorSelfReference(actor, expression);

        /** Actualizamos las referencias al scope en la expresion. */
        expression = Util.updateExpressionNames(expression, this.scope);

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression);
    }

    MoveTo(actor, node) {

        /** Definimos el nombre de la variable distancia unica (para el compilado de la expresion en el scope) */
        var distance = "distance" + Util.random();

        /** Definimos la expresion */
        var expression = "" + distance + " = distance([" + actor.name + ".x , " + actor.name + ".y], [" + node.targetX + ", " + node.targetY + "])" + " \n" +
                         "" + distance + " = (" + distance + " < 1) ? Infinity : " + distance + "\n" + 
                         actor.name + ".x = " + actor.name + ".x + (" + node.speed + " * (" + node.targetX + " - " + actor.name + ".x) / " + distance + ") * Game.deltaTime" + "\n" + 
                         actor.name + ".y = " + actor.name + ".y + (" + node.speed + " * (" + node.targetY + " - " + actor.name + ".y) / " + distance + ") * Game.deltaTime" + "\n";

        /** Determinamos si en la expresion aparece "Me."" y lo sustituimos */
        expression = Util.replaceActorSelfReference(actor, expression);

        /** Actualizamos las referencias al scope en la expresion. */
        expression = Util.updateExpressionNames(expression, this.scope);

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression);
    }

    Push(actor, node) {

        /** Configuramos la expresion para que llame al motor de fisicas, y que este ejecute la funcion que aplica la fuerza sobre el actor. */
        var expression = "Physics.ApplyForce(" + actor.name + ", " + node.strength + ", (" + node.angle + ") * PI / 180)" + "\n";

        /** Determinamos si en la expresion aparece "Me."" y lo sustituimos */
        expression = Util.replaceActorSelfReference(actor, expression);

        /** Actualizamos las referencias al scope en la expresion. */
        expression = Util.updateExpressionNames(expression, this.scope);
        
        /* Creamos el nuevo nodo con su expresion correspondiente.*/
        return new Do(expression);
    }

    PushTo(actor, node) {

        /** Definimos el nombre de la variable distancia unica (para el compilado de la expresion en el scope) */
        var distance = "distance" + Util.random();

        /** Configuramos la expresion para que llame al motor de fisicas, y que este ejecute la funcion que aplica la fuerza sobre el actor. */
        var expression = "" + distance + " = distance([" + actor.name + ".x , " + actor.name + ".y], [" + node.targetX + ", " + node.targetY + "])" + " \n" +
                         "Physics.ApplyForce(" + actor.name + ", " + node.strength + ", (" + node.angle + ") * PI / 180)" + "\n";

        /** Determinamos si en la expresion aparece "Me."" y lo sustituimos */
        expression = Util.replaceActorSelfReference(actor, expression);

        /** Actualizamos las referencias al scope en la expresion. */
        expression = Util.updateExpressionNames(expression, this.scope);
        
        /* Creamos el nuevo nodo con su expresion correspondiente.*/
        return new Do(expression);
    }

    Animate(actor, node) {

        /** Creamos el vector de imagenes en el actor siguiendo la nomenclatura "animationList + ID". */
        var animationProperty = "animation" + Util.random();

        /** Añadimos la variable de control al actor como un objeto con la lista de images, con una propiedad de control de la imagen activa y con el valor maximo de index. */
        actor[animationProperty] = { list: node.animationList, index: 0, maxIndex: node.animationList.length};

        /** Creamos una propiedad de control de tipo timer con la nomenclatura "timer + ID" en el motor de logica, para este actor. */
        var timerProperty = "timer" + Util.random(); 

        /** Añadimos la varible de control al engine. */
        this.timerList[timerProperty] = {timer: 0.00, previousTime: 0.00};

        /** Creamos la variable que interpreta los FPSs como segundos por frame (SPF). */
        var SPF = 1.00 / node.FPS;

        /** Definimos el nombre de la condicion de timer unica (para el compilado de la expresion en el scope) */
        var timerCondition = "timerCondition" + Util.random();
        
        /** Definimos la expresion */
        var expression = "" + timerCondition + " = Logic.timerList." + timerProperty + ".timer > " + SPF + "\n" + 
                         "Logic.updateTimer(" + timerCondition + ", Logic.timerList." + timerProperty + ")" + "\n" +
                         "Logic.animateActor(" + actor.name + ", '" + animationProperty + "', " + timerCondition + ")" + "\n";

        /** Determinamos si en la expresion aparece "Me."" y lo sustituimos */
        expression = Util.replaceActorSelfReference(actor, expression);

        /** Actualizamos las referencias al scope en la expresion. */
        expression = Util.updateExpressionNames(expression, this.scope);

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression);
    }

    PlaySound(actor, node) {

        /** Configuramos la expresion para que llame al motor de fisicas, y que este ejecute la funcion que aplica la fuerza sobre el actor. */
        var expression = "Audio.PlaySound('" + node.soundFile + "', " + node.play + ", " + node.volume + ", " + node.pan + ")" + "\n";

        /** Determinamos si en la expresion aparece "Me."" y lo sustituimos */
        expression = Util.replaceActorSelfReference(actor, expression);

        /** Actualizamos las referencias al scope en la expresion. */
        expression = Util.updateExpressionNames(expression, this.scope);
        
        /* Creamos el nuevo nodo con su expresion correspondiente.*/
        return new Do(expression);
    }

    // TODO: Rotate

    // TODO: Rotate To

    // TODO: Torque

   

    

    ChangeScene(actor, node) {

        /** Definimos la expresion */
        var expression = "Engine.changeSceneHandler('" + node.scene + "')" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression);
    }

    AddScene(actor, node) {

        /** Definimos la expresion */
        var expression = "Engine.addSceneHandler('" + node.scene + "', " + node.stop + ")" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression);
    }

    RemoveScene(actor, node) {

        /** Definimos la expresion */
        var expression = "Engine.removeSceneHandler()" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression);
    }
}