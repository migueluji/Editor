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
            
            actor.scriptList        = [];   /** Inicializamos la lista de scripts del actor. */
            actor.scope             = {};   /** Inicializamos el scope del actor. */
            actor.localTimerList    = [];   /** Inicializamos la lista de control de los timers. */
            this.actorList.push(actor);     /** Añadimos el actor a la lista del motor de logica. */

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

        for(var i = 0; i < this.nodeList.length; i++) { this.nodeList[i].compileExpression(); }

        this.nodeList = [];
    }

    sleep(actor) {

        actor.__scriptListData  = actor.scriptList;
        actor.scriptList        = [];
    }

    awake(actor) {

        if(actor.__scriptListData != undefined) { 

            actor.scriptList        = actor.__scriptListData;
            actor.__scriptListData  = [];
            delete actor.__scriptListData;
        }
    }

    destroyActor(actor) {

        if(actor.scriptList != undefined && actor.scriptList.length > 0) {

            /** Eliminamos el actor del scope.
             * ----------------------------------------------------------------------- */
            Util.deepDestroy(actor.scope);

            /** Eliminamos sus timers y sus referencias.
             * ----------------------------------------------------------------------- */
            for(var i = 0; i < actor.localTimerList.length; i++) {

                Util.destroy(this.timerList, actor.localTimerList[i].timerProperty);
                actor.localTimerList[i] = null;
            }

            actor.localTimerList = null;

            /** Eliminamos todos los scripts junto con sus nodos.
             * ----------------------------------------------------------------------- */
            for(var i in actor.scriptList) {

                this.destroyScript(actor.scriptList[i]);
                Util.destroy(actor.scriptList, i);
            }
        }
        
        actor.scriptList = null;

        this.actorList = Util.removeByID(this.actorList, actor.ID); /** Eliminamos el actor de la lista de actores del motor de logica. */
    }

    destroyScript(script) {

        for(var i in script) { script[i].destroy(); }
    }

    reset() {

        /** Actualizar las propiedades de elapsedTime y deltaTime. */
        this.currentTime                = Util.getDate();
        this.engine.game.deltaTime      = Util.clamp(this.currentTime - this.previousTime, 0, 0.025); // El clamp es para evitar picos indeseados.
        this.engine.game.FPS            = Math.floor(1 / this.engine.game.deltaTime);
        this.previousTime               = this.currentTime;
        this.engine.game.elapsedTime    += this.engine.game.deltaTime; 
    }
    
    updateTimer(condition, timerProperty) {

        timerProperty.timer += this.engine.game.deltaTime;
        timerProperty.timer = condition ? 0 : timerProperty.timer;
        timerProperty.timer = (timerProperty.iteration + 1 != this.engine.iteration) ? 0 : timerProperty.timer;
        timerProperty.iteration = this.engine.iteration;
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
            case "Less Equal": operation = "<="; break;
            case "Equal": operation = "=="; break;
            case "Greater Equal": operation = ">="; break;
            case "Greater": operation = ">"; break;
            case "Different": operation = "!="; break;
            default: console.log("ERROR. Compare undefined.", parameters.operation);
        }
        
        /** Definimos la expresion */
        var expression = parameters.value_1 + "" + operation + "" + parameters.value_2 + "\n"; /** value_1 == left && value_2 == right */

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression, actor.scope);
    }

    Check(actor, parameters) {

        /** Definimos la expresion */
        var expression = parameters.property + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression, actor.scope);
    }

    Timer(actor, parameters) {

        /* Si las reglas del actor cuentan con alguna condicion de timer,
        se ha de crear una variable booleana de ejecucion con la nomenclatura
        "timer + ID" en este actor. */
        var timerProperty = "timer" + Util.random(); 

        /** Definimos el nombre de la condicion de timer unica (para el compilado de la expresion en el scope). */
        var timerCondition = "timerCondition" + Util.random();

        /** Definimos e inicializamos (a Infinity para que la primera vez sea false) la propiedad de segundos (para las funciones como random). */
        var secondsProperty = "secondsProperty" + Util.random();
        actor.scope[secondsProperty] = Infinity;

        /** Definimos e inicializamos a true la propiedad de control de la evaluacion de segundos (para las funciones como random). */
        var secondsCondition = "secondsCondition" + Util.random();
        actor.scope[secondsCondition] = true;

        /* Añadimos la varible de control al engine. */
        this.timerList[timerProperty] = {timer: 0.00, timerProperty: timerProperty, timerCondition: timerCondition, iteration: -1};

        /** Añadimos las variables de control a las listas locales (si no existen, se crean), para gestionar su eliminacion. */
        actor.localTimerList = (actor.localTimerList == undefined) ? [] : actor.localTimerList;
        actor.localTimerList.push(this.timerList[timerProperty]);
        
        /** Definimos la expresion. */
        var expression = "" + timerCondition +   " = engine.logic.timerList." + timerProperty + ".timer > " + secondsProperty + "\n" +
                         "" + secondsProperty +  " = " + secondsCondition + " ? " + parameters.seconds + " : " + secondsProperty  + "\n" + 
                         "" + secondsCondition + " = " + timerCondition + "\n" +
                         "engine.logic.updateTimer(" + timerCondition + ", engine.logic.timerList." + timerProperty + ")" + "\n";
                         
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
            actor[collisionVariable] = {value: false, end: false, iter: -1};

            /** Actualizamos la expresion */
            expression += "Me." + collisionVariable + ".value";

            /** Comprobamos si es final de linea. */
            if(i < tagList.length - 1) { expression += " or "; }
            else { expression += " \n "; }
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

        /** Adaptamos el modo de entrada. */
        parameters.mode = parameters.mode == "Tap" ? "tap" : parameters.mode.toLowerCase();
        parameters.mode = parameters.mode == "is over" ? "over" : parameters.mode;

        /** Si el evento es sobre el actor, utilizamos la propiedad en el actor. 
         *  Si no, utilizaremos los parametros del motor de Input. */
        if(parameters.on_Actor) {

            /** Definimos la expresion */
            expression = "Me.pointer." + parameters.mode + "\n";

            /** Activamos la variable de control de interaccion. */
            actor.interactiveOn = true;
        }
        else {

            /** Definimos la expresion */
            expression = "engine.input.pointer." + parameters.mode + "\n";
        }

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new If(expression, actor.scope);
    }

    Edit(actor, parameters) {

        /** Comprobamos si se pretende mofidicar un color. */
        if(typeof parameters.value == "string" && parameters.value.includes("#")) {

            parameters.value = Util.colorString(parameters.value);
        }

        /** Comprobamos si se pretende mofidicar una imagen. */
        if(typeof parameters.value == "string" && (parameters.value.includes(".png") || parameters.value.includes(".jpg") || parameters.value.includes(".gif"))) {

            parameters.value = parameters.value.includes("'") ? parameters.value : "'" + parameters.value + "'"; /** Para los spawns (el value imagen viene sin comillas del editor y mathjs lo interpreta como variable). */
        }

        /** Comprobamos si se pretende mofidicar el texto. */
        if(parameters.property.includes(".text")) {

            parameters.value = "'" + parameters.value + "'"; /** Para que math lo interprete como string. */
        }

        /** Definimos la expresion */
        var expression = parameters.property + " = " + parameters.value + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression, actor.scope);
    }

    Spawn(actor, parameters) {

        /** Definimos la expresion */
        var expression = "engine.addSpawnedActor('" + parameters.actor + "', Me.x +" + parameters.x + ", Me.y +" + parameters.y + ", Me.angle + " + parameters.angle + ")" + "\n";

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
        var expression = "" + distance + " = distance([Me.x , Me.y], [" + parameters.x + ", " + parameters.y + "])" + " \n" +
                         "" + distance + " = (" + distance + " < 7) ? 0 : (1 / " + distance + "  * engine.game.deltaTime)" + " \n" + 
                         "Me.x = Me.x + (" + parameters.speed + " * (" + parameters.x + " - Me.x) * " + distance + ")" + "\n" + 
                         "Me.y = Me.y + (" + parameters.speed + " * (" + parameters.y + " - Me.y) * " + distance + ")" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression, actor.scope);
    }

    Rotate(actor, parameters) {

        /** Definimos el nombre de la variable distancia unica (para el compilado de la expresion en el scope). */
        var distance = "distance" + Util.random();

        /** Definimos la expresion */
        var expression = "" + distance + " = distance([" + parameters.pivot_X + ", " + parameters.pivot_Y + "], [Me.x, Me.y]) \n" + 
                         "Me.angle = Me.angle + " + parameters.speed + " * engine.game.deltaTime \n" + 
                         "Me.x = " + parameters.pivot_X + " + " + distance + " * cos(Me.angle * PI / 180) \n" + 
                         "Me.y = " + parameters.pivot_Y + " + " + distance + " * sin(Me.angle * PI / 180) \n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression, actor.scope);
    }

    Rotate_To(actor, parameters) {

        /** Definimos el nombre de la variable distancia unica (para el compilado de la expresion en el scope). */
        var distance = "distance" + Util.random();

        var expression = "" + distance + " = distance([" + parameters.pivot_X + ", " + parameters.pivot_Y + "], [Me.x, Me.y]) \n" + 
                         "actor_dx  = " + parameters.pivot_X + " - Me.x \n" + 
                         "actor_dy  = " + parameters.pivot_Y + " - Me.y \n" + 
                         "actor_a   = ((actor_dx == 0) and (actor_dy == 0)) ? Me.angle * PI / 180 : PI + atan2(actor_dy, actor_dx) \n" + 
                         "target_dx = " + parameters.pivot_X + " - " + parameters.x + "\n" + 
                         "target_dy = " + parameters.pivot_Y + " - " + parameters.y + "\n" + 
                         "target_a  = PI + atan2(target_dy, target_dx) \n" + 
                         "da        = target_a - actor_a \n" + 
                         "daa        = (abs(da) > PI) ? (da < -PI ? 2 * PI + da : -2 * PI + da) : da \n" +  
                         "Me.angle  = Me.angle + daa * 180 / PI * " + parameters.speed + " * engine.game.deltaTime \n" +
                         //"engine.printf(da, daa) \n" + 
                         "Me.x      = " + parameters.pivot_X + " + " + distance + " * cos(Me.angle * PI / 180) \n" + 
                         "Me.y      = " + parameters.pivot_Y + " + " + distance + " * sin(Me.angle * PI / 180) \n";

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

        /** Definimos el nombre de la condicion de timer unica (para el compilado de la expresion en el scope) */
        var timerCondition = "timerCondition" + Util.random();

        /** Definimos e inicializamos (a 0 para que la primera vez sea Infinity y por tanto false) la propiedad de FPS (para las funciones como random). */
        var fpsProperty = "fpsProperty" + Util.random();
        actor.scope[fpsProperty] = 0;

        /** Definimos e inicializamos a true la propiedad de control de la evaluacion de FPS (para las funciones como random). */
        var fpsCondition = "fpsCondition" + Util.random();
        actor.scope[fpsCondition] = true; 

        /* Añadimos la varible de control al engine. */
        this.timerList[timerProperty] = {timer: 0.00, previousTime: 0.00, timerProperty: timerProperty, timerCondition: timerCondition};

        /** Añadimos las variables de control a las listas locales (si no existen, se crean), para gestionar su eliminacion. */
        actor.localTimerList = (actor.localTimerList == undefined) ? [] : actor.localTimerList;
        actor.localTimerList.push(this.timerList[timerProperty]);

        /** Creamos la variable que interpreta los FPSs como segundos por frame (SPF). */
        var SPF = 1.00 / parameters.fps;

        /** Definimos la expresion */
        var expression = "" + timerCondition + " = engine.logic.timerList." + timerProperty + ".timer > 1 / " + fpsProperty + "\n" + 
                         "" + fpsProperty +  " = " + fpsCondition + " ? " + parameters.fps + " : " + fpsProperty  + "\n" + 
                         "" + fpsCondition + " = " + fpsCondition + "\n" +
                         "engine.logic.updateTimer(" + timerCondition + ", engine.logic.timerList." + timerProperty + ")" + "\n" +
                         "engine.logic.animateActor(Me, '" + animationProperty + "', " + timerCondition + ")" + "\n";

        /* Creamos el nuevo nodo con su expresion correspondiente. */
        return new Do(expression, actor.scope);
    }

    Play(actor, parameters) {

        /** Configuramos la expresion para que llame al motor de fisicas, y que este ejecute la funcion que aplica la fuerza sobre el actor. */
        var expression = "engine.audio.PlaySound('" + parameters.sound_File + "', true, Me.volume, Me.pan)" + "\n";

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