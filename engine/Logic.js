class Logic {

    constructor(game, engine) {

        this.engine = engine;

        this.actorList      = {};   /** */

        this.nodeList       = [];   /** Lista auxiliar de todos los nuevos nodos cargados en memoria (para compilarlos) */

        this.timerList      = {};   /** */

        this.currentTime    = 0.0;  /** */
        this.previousTime   = 0.0;  /** */
    }

    run() {

        for(var i in this.actorList) {

            for(var j in this.actorList[i].scriptList) {

                this.runScript(this.actorList[i], this.actorList[i].scriptList[j]);
            }

            //this.compileTexts(this.actorList);
        }
    }

    runScript(actor, script) {

        for(var i in script) {

            script[i].run(actor.localScope);
        }
    }

    setActorLogic(actor) {

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

        //console.log(node.type)

        var _node = this[node.type](actor, node.parameters);

        switch(node.type) {

            case "Collision": case "Keyboard": case "Touch": case "Compare": case "Check": case "Timer":
                _node.nodeListTrue  = this.setScripts(actor, node.nodeListTrue);
                _node.nodeListFalse = this.setScripts(actor, node.nodeListFalse);
                break;

            default:
                break;
        }

        this.nodeList.push(_node);

        return _node;
    }

    compileExpressions() {

        for(var i = 0; i < this.nodeList.length; i++) {

            this.nodeList[i].compileExpression(this.scope);
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
        Util.deepDestroy(actor.localScope);

        /** Eliminamos todos los scripts junto con sus nodos
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
        this.engine.game.deltaTime   = Util.clamp(this.currentTime - this.previousTime, 0, 0.025); // El clamp es para evitar picos indeseados.
        this.previousTime           = this.currentTime;
        this.engine.game.elapsedTime += this.engine.game.deltaTime; 

        /** Contabilizar los timers */
        for(var i in this.timerList) {

            this.timerList[i].timer += this.engine.game.deltaTime;
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
        timerProperty.previousTime  = condition ? this.engine.game.elapsedTime : timerProperty.previousTime;
        timerProperty.timer = (timerProperty.previousTime > (this.engine.game.elapsedTime - this.engine.game.deltaTime * 1.07)) ? 0 : timerProperty.timer;
    }

    animateActor(actor, animation, timerCondition) {

        actor.image = actor[animation].list[actor[animation].index];
        actor.sprite.texture = actor.texture;
        actor[animation].index = timerCondition ? ((actor[animation].index == actor[animation].maxIndex - 1) ? 0 : actor[animation].index + 1) : actor[animation].index;
    }










    /** ###############################################################################
     *  Construccion de las expresiones para todas las acciones y condiciones 
     *  ############################################################################### */

    Compare(actor, parameters) {

        /** TODO: Cambiar en el editor los operadores en texto por sus simbolos. */
        var operation = "";

        switch(parameters.operation) {

            case "Less": operation = "<"; break;
            case "Less_Equal": operation = "<="; break;
            case "Equal": operation = "=="; break;
            case "Greater_Equal": operation = ">="; break;
            case "Greater": operation = ">"; break;
            case "Different": operation = "!="; break;
        }
        
        /** Definimos la expresion */
        var expression = parameters.value_1 + "" + operation + "" + parameters.value_2 + "\n"; /** value_1 == left && value_2 == right */

        /** Actualizamos las referencias al scope en la expresion. */
        expression = Util.addElementsToLocalScope(expression, actor, this.engine.actorList);

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression); 
    }

    Check(actor, parameters) {
        
        /** Definimos la expresion */
        var expression = parameters.element + "." + parameters.property + "\n";

        /** Actualizamos las referencias al scope en la expresion. */
        expression = Util.addElementsToLocalScope(expression, actor, this.engine.actorList);

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression); 
    }

    Timer(actor, parameters) {

        /* Si las reglas del actor cuentan con alguna condicion de timer,
        se ha de crear una variable booleana de ejecucion con la nomenclatura
        "timer + ID" en este actor. */
        var timerProperty = "timer" + Util.random(); 

        /* Añadimos la varible de control al engine. */
        this.timerList[timerProperty] = {timer: 0.00, previousTime: 0.00};

        /** Definimos el nombre de la condicion de timer unica (para el compilado de la expresion en el scope) */
        var timerCondition = "timerCondition" + Util.random();
        
        /** Definimos la expresion */
        var expression = "" + timerCondition + " = engine.logic.timerList." + timerProperty + ".timer > " + parameters.seconds + "\n" +
                         "engine.logic.updateTimer(" + timerCondition + ", engine.logic.timerList." + timerProperty + ")" + "\n";

        /** Actualizamos las referencias al scope en la expresion. */
        expression = Util.addElementsToLocalScope(expression, actor, this.engine.actorList);

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression); 
    }

    Collision(actor, parameters) {

        /** Activamos la bandera de colisiones para el actor. */
        actor.collisionOn = true;

        /** Comprobamos si hay mas de un tag. */
        var tagList = parameters.tags.split(",");

        /** Creamos la variable de la expresion. */
        var expression = "";

        /** Recorremos la lista y creamos los elementos de control. */
        for(var i = 0; i < tagList.length; i++) {

            /* Añadimos la varible de control del tag a la lista de colisiones del actor. */
            actor.collisionList[tagList[i]] = true;

            /* Si las reglas del actor cuentan con alguna condicion de colision,
            se ha de crear una variable booleana de ejecucion con la nomenclatura
            "collidingWith + TagName + Tag" en este actor. */
            var collisionVariable = "collidingWith" + tagList[i] + "Tag";

            /* Añadimos la varible de control al actor. */
            actor[collisionVariable] = false;

            /** Actualizamos la expresion */
            expression += "Me." + collisionVariable;

            /** Comprobamos si es final de linea. */
            if(i < tagList.length - 1) {

                expression += " or ";
            }
            else {

                expression += " \n ";
            }
        }

        /** Actualizamos las referencias al scope en la expresion. */
        expression = Util.addElementsToLocalScope(expression, actor, this.engine.actorList);

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression); 
    }

    Keyboard(actor, parameters) {

        /* Registramos la propiedad en el motor de Input para el control
        de este evento de teclado. */
        actor.localScope.engine.input.keyList[parameters.key] = {down: false, up: true, pressed: false};

        /** Definimos la expresion */
        var expression = "engine.input.keyList." + parameters.key + "." + parameters.key_Mode.toLowerCase() + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression);
    }

    Touch(actor, parameters) {

        var expression;

        /** Si el evento es sobre el actor, utilizamos la propiedad en el actor. 
         *  Si no, utilizaremos los parametros del motor de Input. */
        if(parameters.on_Actor) {

            /** Definimos la expresion */
            expression = "Me.pointer." + parameters.mode.toLowerCase() + "\n";

            /** Actualizamos las referencias al scope en la expresion. */
            expression = Util.addElementsToLocalScope(expression, actor, this.engine.actorList);

            /** Activamos la variable de control de interaccion. */
            actor.interactiveOn = true;
        }
        else {

            /** Definimos la expresion */
            expression = "engine.input.pointer." + parameters.mode.toLowerCase() + "\n";
        }

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression);
    }

    Edit(actor, parameters) {

        /** Comprobamos si se pretende mofidicar un color. */
        if(parameters.value.includes("#")) {

            parameters.value = Util.colorString(parameters.value);
            //console.log(parameters.value);
        }

        /** Definimos la expresion */
        var expression = parameters.property + " = " + parameters.value + "\n";
        //console.log(expression, parameters.value);

        /** Actualizamos las referencias al scope en la expresion. */
        expression = Util.addElementsToLocalScope(expression, actor, this.engine.actorList);

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression);
    }

    Spawn(actor, parameters) {

        /** Definimos la expresion */
        var expression = "engine.addSpawnedActor('" + parameters.actor + "', Me.x" + "+" + parameters.x + ", Me.y" + "+" + parameters.y + ", " + actor.angle + ")" + "\n";

        expression = Util.addElementsToLocalScope(expression, actor, this.engine.actorList);

        /* Creamos el nuevo nodo con su expresion correspondiente.*/
        return new Do(expression);
    }

    Delete(actor, parameters) {

        /** Definimos la expresion */
        var expression = "engine.addDestroyedActor(Me)" + "\n";

        expression = Util.addElementsToLocalScope(expression, actor, this.engine.actorList);

        /* Creamos el nuevo nodo con su expresion correspondiente.*/
        return new Do(expression);
    }

    Move(actor, parameters) {

        /** Definimos la expresion */
        var expression = "Me.x = Me.x + " + parameters.speed + " * cos(" + parameters.angle + " * -PI / 180.0) * engine.game.deltaTime" + "\n" + 
                         "Me.y = Me.y + " + parameters.speed + " * sin(" + parameters.angle + " * -PI / 180.0) * engine.game.deltaTime \n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression);
    }

    Move_To(actor, parameters) {

        /** Definimos el nombre de la variable distancia unica (para el compilado de la expresion en el scope) */
        var distance = "distance" + Util.random();

        /** Definimos la expresion */
        var expression = "" + distance + " = distance([" + actor.name + ".x , " + actor.name + ".y], [" + parameters.targetX + ", " + parameters.targetY + "])" + " \n" +
                         "" + distance + " = (" + distance + " < 1) ? Infinity : " + distance + "\n" + 
                         actor.name + ".x = " + actor.name + ".x + (" + parameters.speed + " * (" + parameters.targetX + " - " + actor.name + ".x) / " + distance + ") * engine.game.deltaTime" + "\n" + 
                         actor.name + ".y = " + actor.name + ".y + (" + parameters.speed + " * (" + parameters.targetY + " - " + actor.name + ".y) / " + distance + ") * engine.game.deltaTime" + "\n";

        /** Determinamos si en la expresion aparece "Me."" y lo sustituimos */
        expression = Util.replaceActorSelfReference(actor, expression);

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression);
    }

    Rotate(actor, parameters) {

        /** Definimos la expresion */
        var expression = actor.name + ".x = " + actor.name + ".x + " + parameters.speed + " * cos(" + parameters.angle + " * PI / 180.0) * engine.game.deltaTime" + "\n" + 
                         actor.name + ".y = " + actor.name + ".y + " + parameters.speed + " * sin(" + parameters.angle + " * PI / 180.0) * engine.game.deltaTime \n";

        /** Determinamos si en la expresion aparece "Me."" y lo sustituimos */
        expression = Util.replaceActorSelfReference(actor, expression);

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression);
    }

    Rotate_To(actor, parameters) {

        /** Definimos el nombre de la variable distancia unica (para el compilado de la expresion en el scope) */
        var distance = "distance" + Util.random();

        /** Definimos la expresion */
        var expression = "" + distance + " = distance([" + actor.name + ".x , " + actor.name + ".y], [" + parameters.targetX + ", " + parameters.targetY + "])" + " \n" +
                         "" + distance + " = (" + distance + " < 1) ? Infinity : " + distance + "\n" + 
                         actor.name + ".x = " + actor.name + ".x + (" + parameters.speed + " * (" + parameters.targetX + " - " + actor.name + ".x) / " + distance + ") * engine.game.deltaTime" + "\n" + 
                         actor.name + ".y = " + actor.name + ".y + (" + parameters.speed + " * (" + parameters.targetY + " - " + actor.name + ".y) / " + distance + ") * engine.game.deltaTime" + "\n";

        /** Determinamos si en la expresion aparece "Me."" y lo sustituimos */
        expression = Util.replaceActorSelfReference(actor, expression);

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression);
    }

    Push(actor, parameters) {

        /** Configuramos la expresion para que llame al motor de fisicas, y que este ejecute la funcion que aplica la fuerza sobre el actor. */
        var expression = "engine.physics.ApplyForce(" + actor.name + ", " + parameters.strength + ", (" + parameters.angle + ") * PI / 180)" + "\n";

        /** Determinamos si en la expresion aparece "Me."" y lo sustituimos */
        expression = Util.replaceActorSelfReference(actor, expression);
        
        /* Creamos el nuevo nodo con su expresion correspondiente.*/
        return new Do(expression);
    }

    Push_To(actor, parameters) {

        /** Definimos el nombre de la variable distancia unica (para el compilado de la expresion en el scope) */
        var distance = "distance" + Util.random();

        /** Configuramos la expresion para que llame al motor de fisicas, y que este ejecute la funcion que aplica la fuerza sobre el actor. */
        var expression = "" + distance + " = distance([" + actor.name + ".x , " + actor.name + ".y], [" + parameters.targetX + ", " + parameters.targetY + "])" + " \n" +
                         "engine.physics.ApplyForce(" + actor.name + ", " + parameters.strength + ", (" + parameters.angle + ") * PI / 180)" + "\n";

        /** Determinamos si en la expresion aparece "Me."" y lo sustituimos */
        expression = Util.replaceActorSelfReference(actor, expression);
        
        /* Creamos el nuevo nodo con su expresion correspondiente.*/
        return new Do(expression);
    }
    
    Torque(actor, parameters) {

        /** Definimos el nombre de la variable distancia unica (para el compilado de la expresion en el scope) */
        var distance = "distance" + Util.random();

        /** Configuramos la expresion para que llame al motor de fisicas, y que este ejecute la funcion que aplica la fuerza sobre el actor. */
        var expression = "" + distance + " = distance([" + actor.name + ".x , " + actor.name + ".y], [" + parameters.targetX + ", " + parameters.targetY + "])" + " \n" +
                         "engine.physics.ApplyForce(" + actor.name + ", " + parameters.strength + ", (" + parameters.angle + ") * PI / 180)" + "\n";

        /** Determinamos si en la expresion aparece "Me."" y lo sustituimos */
        expression = Util.replaceActorSelfReference(actor, expression);
        
        /* Creamos el nuevo nodo con su expresion correspondiente.*/
        return new Do(expression);
    }

    Animate(actor, parameters) {

        /** Creamos el vector de imagenes en el actor siguiendo la nomenclatura "animationList + ID". */
        var animationProperty = "animation" + Util.random();

        /** Convertimos el string con la lista de imagenes en un vector. */
        var animationList = parameters.animation.split(',');

        /** Añadimos la variable de control al actor como un objeto con la lista de images, con una propiedad de control de la imagen activa y con el valor maximo de index. */
        actor[animationProperty] = { list: animationList, index: 0, maxIndex: animationList.length};

        /** Creamos una propiedad de control de tipo timer con la nomenclatura "timer + ID" en el motor de logica, para este actor. */
        var timerProperty = "timer" + Util.random(); 

        /** Añadimos la varible de control al engine. */
        this.timerList[timerProperty] = {timer: 0.00, previousTime: 0.00};

        /** Creamos la variable que interpreta los FPSs como segundos por frame (SPF). */
        var SPF = 1.00 / parameters.fps;

        /** Definimos el nombre de la condicion de timer unica (para el compilado de la expresion en el scope) */
        var timerCondition = "timerCondition" + Util.random();
        
        /** Definimos la expresion */
        var expression = "" + timerCondition + " = engine.logic.timerList." + timerProperty + ".timer > " + SPF + "\n" + 
                         "engine.logic.updateTimer(" + timerCondition + ", engine.logic.timerList." + timerProperty + ")" + "\n" +
                         "engine.logic.animateActor(Me, '" + animationProperty + "', " + timerCondition + ")" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression);
    }

    Play(actor, parameters) {

        /** Configuramos la expresion para que llame al motor de fisicas, y que este ejecute la funcion que aplica la fuerza sobre el actor. */
        var expression = "engine.audio.PlaySound('" + parameters.soundFile + "', " + parameters.play + ", " + parameters.volume + ", " + parameters.pan + ")" + "\n";

        /** Determinamos si en la expresion aparece "Me."" y lo sustituimos */
        expression = Util.replaceActorSelfReference(actor, expression);
        
        /* Creamos el nuevo nodo con su expresion correspondiente.*/
        return new Do(expression);
    }

    Go_To(actor, parameters) {

        /** Definimos la expresion */
        var expression = "engine.changeSceneHandler('" + parameters.scene + "')" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression);
    }

    Add(actor, parameters) {

        /** Definimos la expresion */
        var expression = "engine.addSceneHandler('" + parameters.scene + "', " + parameters.stop + ")" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression);
    }

    Remove(actor, parameters) {

        /** Definimos la expresion */
        var expression = "engine.removeSceneHandler()" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression);
    }
}