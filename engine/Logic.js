class Logic {

    constructor(engine) {

        this.engine         = engine;   /** */

        this.actorList      = [];       /** */
        this.nodeList       = [];       /** Lista auxiliar de todos los nuevos nodos cargados en memoria (para compilarlos) */
        this.timerList      = {};       /** */
        this.currentTime    = 0.0;      /** */
        this.previousTime   = 0.0;      /** */
    }

    run() {

        for(var i = 0; i < this.actorList.length; i++) {

            for(var j = 0; j < this.actorList[i].scriptList.length; j++) {

                this.runScript(this.actorList[i], this.actorList[i].scriptList[j]);
            }
        }
    }

    runScript(actor, script) {

        for(var i = 0; i < script.length; i++) {

            script[i].run(actor.scope);
        }
    }

    setActorLogic(actor, data) {

        if(data.scriptList != undefined && data.scriptList.length > 0) {
            
            actor.scriptList = [];      /** Inicializamos la lista de scripts del actor. */
            actor.scope      = {};      /** Inicializamos el scope del actor. */
            this.actorList.push(actor); /** Añadimos el actor a la lista del motor de logica. */

            for(var i = 0; i < data.scriptList.length; i++) {

                actor.scriptList.push(this.setScripts(actor, data.scriptList[i]));
            }
        }
    }

    setScripts(actor, scripts) {

        var script = [];

        for(var i = 0; i < scripts.length; i++) {

            script.push(this.expandNode(actor, scripts[i]));
        }

        return script;
    }

    expandNode(actor, node) {

        var _node = this[node.type](actor, node.parameters);

        if(node.type == "Collision" ||
           node.type == "Touch"     ||
           node.type == "Keyboard"  ||
           node.type == "Compare"   ||
           node.type == "Check"     ||
           node.type == "Timer") {
            
            _node.nodeListTrue  = this.setScripts(actor, node.nodeListTrue);
            _node.nodeListFalse = this.setScripts(actor, node.nodeListFalse);
        }

        this.nodeList.push(_node);

        return _node;
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
        Util.deepDestroy(actor.scope);

        /** Eliminamos todos los scripts junto con sus nodos
         * ----------------------------------------------------------------------- */
        for(var i in actor.scriptList) {

            this.destroyScript(actor.scriptList[i]);
            Util.destroy(actor.scriptList, i);
        }
        
        actor.scriptList = null;

        this.actorList = Util.removeByID(this.actorList, actor.ID); /** Eliminamos el actor de la lista de actores del motor de logica. */
    }

    destroyScript(script) {

        for(var i in script) {

            script[i].destroy();
        }
    }

    reset() {

        /** Actualizar las propiedades de elapsedTime y deltaTime. */
        this.currentTime                = Util.getDate();
        this.engine.game.deltaTime      = Util.clamp(this.currentTime - this.previousTime, 0, 0.025); // El clamp es para evitar picos indeseados.
        this.previousTime               = this.currentTime;
        this.engine.game.elapsedTime    += this.engine.game.deltaTime; 

        /** Contabilizar los timers */
        for(var i in this.timerList) {

            this.timerList[i].timer += this.engine.game.deltaTime;
        }

        // TODO: ¿Resetear las variables TAG de colision?
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

    

    sleep(actor) {

        // TODO
    }

    awake(actor) {

        // TODO
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

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression, actor.scope);
    }

    Check(actor, parameters) {
        
        /** Definimos la expresion */
        var expression = parameters.element + "." + parameters.property + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression, actor.scope);
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

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression, actor.scope);
    }

    Collision(actor, parameters) {

        /** Activamos la bandera de colisiones para el actor. */
        actor.triggerOn = true;

        /** Creamos la lista de colisiones, si no existiera previamente. */
        actor.collisionList = (actor.collisionList == undefined) ? [] : actor.collisionList;

        /** Comprobamos si hay mas de un tag. */
        var tagList = parameters.tags.split(",");

        /** Creamos la variable de la expresion. */
        var expression = "";    

        /** Recorremos la lista y creamos los elementos de control. */
        for(var i = 0; i < tagList.length; i++) {

            /* Si las reglas del actor cuentan con alguna condicion de colision,
            se ha de crear una variable booleana de ejecucion con la nomenclatura
            "collidingWith + TagName + Tag" en este actor. */
            var collisionVariable = "collidingWith" + tagList[i] + "Tag";

            /* Añadimos la varible de control del tag a la lista de colisiones del actor. */
            actor.collisionList.push(collisionVariable);

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

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression, actor.scope);
    }

    Keyboard(actor, parameters) {

        /* Registramos la propiedad en el motor de Input para el control
        de este evento de teclado. */
        actor.scope.engine.input.keyList[parameters.key] = {down: false, up: true, pressed: false};

        /** Definimos la expresion */
        var expression = "engine.input.keyList." + parameters.key + "." + parameters.key_Mode.toLowerCase() + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression, actor.scope);
    }

    Touch(actor, parameters) {

        var expression;

        /** Si el evento es sobre el actor, utilizamos la propiedad en el actor. 
         *  Si no, utilizaremos los parametros del motor de Input. */
        if(parameters.on_Actor) {

            /** Definimos la expresion */
            expression = "Me.pointer." + parameters.mode.toLowerCase() + "\n";

            /** Activamos la variable de control de interaccion. */
            actor.interactiveOn = true;
        }
        else {

            /** Definimos la expresion */
            expression = "engine.input.pointer." + parameters.mode.toLowerCase() + "\n";
        }

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression, actor.scope);
    }

    Edit(actor, parameters) {

        /** Comprobamos si se pretende mofidicar un color. */
        if(typeof parameters.value == "string" && parameters.value.includes("#")) {

            parameters.value = Util.colorString(parameters.value);
        }

        /** Definimos la expresion */
        var expression = parameters.property + " = " + parameters.value + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression, actor.scope);
    }

    Spawn(actor, parameters) {

        /** Definimos la expresion */
        var expression = "engine.addSpawnedActor('" + parameters.actor + "', Me.x" + "+" + parameters.x + ", Me.y" + "+" + parameters.y + ", " + parameters.angle + ")" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente.*/
        return new Do(expression, actor.scope);
    }

    Delete(actor, parameters) {

        /** Definimos la expresion */
        var expression = "engine.addDestroyedActor(Me)" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente.*/
        return new Do(expression, actor.scope);
    }

    Move(actor, parameters) {

        /** Para optimizar utilizamos 0.01745329251 como sustituto de PI / 180.0. */

        /** Definimos la expresion */
        var expression = "Me.x = Me.x + " + parameters.speed + " * cos(" + parameters.angle + " * 0.01745329251) * engine.game.deltaTime" + "\n" + 
                         "Me.y = Me.y + " + parameters.speed + " * sin(" + parameters.angle + " * 0.01745329251) * engine.game.deltaTime \n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression, actor.scope);
    }

    Move_To(actor, parameters) {

        /** Definimos el nombre de la variable distancia unica (para el compilado de la expresion en el scope) */
        var distance = "distance" + Util.random();

        /** Definimos la expresion */
        var expression = "" + distance + " = distance([" + actor.name + ".x , " + actor.name + ".y], [" + parameters.targetX + ", " + parameters.targetY + "])" + " \n" +
                         "" + distance + " = (" + distance + " < 1) ? Infinity : " + distance + "\n" + 
                         actor.name + ".x = " + actor.name + ".x + (" + parameters.speed + " * (" + parameters.targetX + " - " + actor.name + ".x) / " + distance + ") * engine.game.deltaTime" + "\n" + 
                         actor.name + ".y = " + actor.name + ".y + (" + parameters.speed + " * (" + parameters.targetY + " - " + actor.name + ".y) / " + distance + ") * engine.game.deltaTime" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression, actor.scope);
    }

    Rotate(actor, parameters) {

        /** Definimos la expresion */
        /*var expression = "a = Me.angle * PI / 180 \n" +
                         "px = " + parameters.pivot_X + " \n" + 
                         "py = " + parameters.pivot_Y + " \n" + 
                         "rx = cos(a) * (px - Me.x) - sin(a) * (py - Me.y) + Me.x \n" +
                         "ry = sin(a) * (px - Me.x) + sin(a) * (py - Me.y) + Me.y \n" +
                         "Me.x = Me.x + (rx - Me.x) * engine.game.deltaTime * " + parameters.speed + " \n" + 
                         "Me.y = Me.y + (ry - Me.y) * engine.game.deltaTime * " + parameters.speed + " \n" + 
                         "Me.angle = Me.angle + atan2(ry, rx) * 180 / PI * engine.game.deltaTime * " + parameters.speed + " \n";*/

        /** Definimos la expresion */
        var expression = "a = Me.angle * PI / 180 \n" +
                         "Me.x = Me.x - " + parameters.pivot_X + " \n" + 
                         "Me.y = Me.y - " + parameters.pivot_Y + " \n" + 
                         "newX = Me.x * cos(a) - Me.y * sin(a) \n" +
                         "newY = Me.x * sin(a) + Me.y * cos(a) \n" +
                         "Me.x = newX + " + parameters.pivot_X + " \n" + 
                         "Me.y = newY + " + parameters.pivot_Y + " \n" + 
                         "Me.angle = Me.angle + atan2(newY, newX) * 180 / PI * engine.game.deltaTime * " + parameters.speed + " \n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression, actor.scope);
    }

    Rotate_To(actor, parameters) {

        /** Definimos el nombre de la variable distancia unica (para el compilado de la expresion en el scope) */
        var distance = "distance" + Util.random();

        /** Definimos la expresion */
        var expression = "" + distance + " = distance([" + actor.name + ".x , " + actor.name + ".y], [" + parameters.targetX + ", " + parameters.targetY + "])" + " \n" +
                         "" + distance + " = (" + distance + " < 1) ? Infinity : " + distance + "\n" + 
                         actor.name + ".x = " + actor.name + ".x + (" + parameters.speed + " * (" + parameters.targetX + " - " + actor.name + ".x) / " + distance + ") * engine.game.deltaTime" + "\n" + 
                         actor.name + ".y = " + actor.name + ".y + (" + parameters.speed + " * (" + parameters.targetY + " - " + actor.name + ".y) / " + distance + ") * engine.game.deltaTime" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression, actor.scope);
    }

    Push(actor, parameters) {

        /** Configuramos la expresion para que llame al motor de fisicas, y que este ejecute la funcion que aplica la fuerza sobre el actor. */
        var expression = "engine.physics.ApplyForce(Me, " + parameters.force + ", (" + parameters.angle + ") * PI / 180)" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente.*/
        return new Do(expression, actor.scope);
    }

    Push_To(actor, parameters) {

        /** Configuramos la expresion para que llame al motor de fisicas, y que este ejecute la funcion que aplica la fuerza sobre el actor. */
        var expression = "engine.physics.ApplyForceTo(Me, " + parameters.force + ", " + parameters.x + ", " + parameters.y + ")" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente.*/
        return new Do(expression, actor.scope);
    }
    
    Torque(actor, parameters) {

        /** Configuramos la expresion para que llame al motor de fisicas, y que este ejecute la funcion que aplica la fuerza sobre el actor. */
        var expression = "engine.physics.ApplyTorque(Me, " + parameters.angle + " * PI / 180)" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente.*/
        return new Do(expression, actor.scope);
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
        return new Do(expression, actor.scope);
    }

    Play(actor, parameters) {

        /** Configuramos la expresion para que llame al motor de fisicas, y que este ejecute la funcion que aplica la fuerza sobre el actor. */
        var expression = "engine.audio.PlaySound('" + parameters.soundFile + "', " + parameters.play + ", " + parameters.volume + ", " + parameters.pan + ")" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente.*/
        return new Do(expression, actor.scope);
    }

    Go_To(actor, parameters) {

        /** Definimos la expresion */
        var expression = "engine.changeSceneHandler('" + parameters.scene + "')" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression, actor.scope);
    }

    Add(actor, parameters) {

        /** Definimos la expresion */
        var expression = "engine.addSceneHandler('" + parameters.scene + "', " + parameters.stop + ")" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression, actor.scope);
    }

    Remove(actor, parameters) {

        /** Definimos la expresion */
        var expression = "engine.removeSceneHandler()" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression, actor.scope);
    }
}