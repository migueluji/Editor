class Util {

    /**
     * 
     * @param {*} element 
     * @param {*} property 
     */
    static destroy(element, property) {

        element[property] = null;
        delete element[property];
    }

    /**
     * 
     * @param {*} element 
     */
    static deepDestroy(element) {

        for(var i in element) {

            Util.destroy(element, i);
        }
    }

    /**
     * 
     */
    static random() {

        return Math.floor(1000000 * Math.random());
    }

    /**
     * 
     */
    
    static clamp(number, min,  max) { 

        return Math.min(Math.max(number, min), max);
    }

    /**
     * 
     */
    static replaceActorSelfReference(actor, expression) {

        return expression.replace(/Me./g, actor.name + "."); // El flag /-/g es para eliminar todas las ocurrencias, por defecto "replace" solo se carga la primera.
    }

    /**
     * 
     */
    static replaceScopeReference(actor, text) {

        var ocurrencies = text.split(".");
        var aux = "";
        
        for(var i = 0; i < ocurrencies.length; i++) {

            aux = aux.concat(ocurrencies[i] + ((i == ocurrencies.length - 1) ? "" : "']."));
        }

        text = aux;

        var test = text.replace(/Me./g, actor.ID + "'").replace(/{/g, "{this.scope['");

        return test;
    }

    /**
     * 
     */
    static getDate() {

        return new Date() / 1000; // Se escala para tenerlo en milisegundos
    }

    /**
     * 
     */
    static degToRad(value) {

        return value * Math.PI / 180.0;
    }

    /**
     * 
     */
    static radToDeg(value) {

        return value * 180.0 / Math.PI;
    }

    static colorString(value) {

        return "'" + Util.colorFormat(value) + "'"; 
    }

    /**
     * 
     */
    static colorFormat(value) {

        return value.replace("#", "0x");
    }

    /**
     * 
     */
    static addElement(object, key, value, index) {

        if(index == undefined) {

            object[key] = value;
        }
        else {

            var aux = 0;
            var temp = {};

            for(var i in object) {

                if(aux != index) {

                    temp[i] = object[i];
                }
                else {

                    temp[key] = value;
                }

                aux++;
            }

            object = temp;
        }
    }
    

    static updateExpressionNames(expression, scope) {

        var temp = expression;

        for(var i in scope) {

            if((temp.search(scope[i].name) != -1) /* && (scope[i].scene == scope.Game.activeScene)*/ && (scope[i].ID != undefined)) {

                temp = temp.replace(new RegExp(scope[i].name, "g"), scope[i].ID);
            }
        }

        //console.log(temp, scope);

        return temp;
    }

    static checkScope(expression, scope) {

        for(var i in scope.engine.sceneList[scope.engine.game.activeScene]) {

            if(expression.search(scope.engine.sceneList[scope.engine.game.activeScene][i].name) != -1) {

                /** Añadimos el elemento al scope. */
                scope[scope.engine.sceneList[scope.engine.game.activeScene][i].name] = scope.engine.actorList[scope.engine.sceneList[scope.engine.game.activeScene][i].ID];

                /** Comprobamos si hay que actualizar el indentificador del actor a spawnear. */
                if(expression.search("addSpawnedActor") != -1) {

                    expression = expression.replace(new RegExp(scope.engine.sceneList[scope.engine.game.activeScene][i].name, "g"), scope.engine.sceneList[scope.engine.game.activeScene][i].ID);
                }
            }
        }

        /** Comprobamos si hay que actualizar el indentificador del Game. */
        if(expression.search("Game") != -1) {

            expression = expression.replace(new RegExp("Game", "g"), "engine.game");
        }

        return expression;
    }

    static updateTextToscope(text, actor) {

        var temp = text;

        if((temp.search("Me") != -1)) {

            temp = temp.replace(new RegExp("Me", "g"), "player.engine.actorList." + actor.ID + ".scope.Me");
        }

        // TODO: Actores que no sean "Me".
        
        return temp;
    }

    static getLastKey(object) {

        return Object.keys(object)[Object.keys(object).length - 1];
    }

    static getLastElement(object) {

        return object[Util.getLastKey(object)];
    }

    static getLocation() {

        if(navigator.geolocation) {

          navigator.geolocation.getCurrentPosition(Util.showPosition);
        } 
        else { 

          console.log("Geolocation is not supported by this browser.");
        }
    }
      
    static showPosition(position) {

        console.log(position.coords);

        return {latitude: position.coords.latitude, longitude: position.coords.longitude};
    }

    static getAccelerometer() {

			let accelerometer = new Accelerometer({frequency: 60});

            accelerometer.addEventListener('reading', e => {
                console.log("Acceleration along the X-axis " + accelerometer.x);
                console.log("Acceleration along the Y-axis " + accelerometer.y);
                console.log("Acceleration along the Z-axis " + accelerometer.z);
            });
            accelerometer.start();
    }

    static parser(container, data) {

        Object.assign(container, data);

        var sceneList = {};

        for(var i = 0; i < container.sceneList.length; i++) {

            sceneList[container.sceneList[i].name] = container.sceneList[i];

            var actorList = {};

            for(var j = 0; j < container.sceneList[i].actorList.length; j++) {

                container.sceneList[i].actorList[j].ID = container.sceneList[i].name.replace(/ /g, "_") + "_" + container.sceneList[i].actorList[j].name + "_" + Util.random();

                actorList[container.sceneList[i].actorList[j].ID] = container.sceneList[i].actorList[j];

                var scriptList = [];

                for(var k = 0; k < container.sceneList[i].actorList[j].scriptList.length; k++) {

                    scriptList.push(container.sceneList[i].actorList[j].scriptList[k].nodeList);
                    //Util.destroy(scriptList[container.sceneList[i].actorList[j].scriptList[k].name], "name");
                }

                actorList[container.sceneList[i].actorList[j].ID].scriptList = scriptList;

                

                //console.log("-----", container.sceneList[i].actorList[j].name);

               // Util.destroy(actorList[container.sceneList[i].actorList[j].name], "name");
            }

            sceneList[container.sceneList[i].name].actorList = actorList;

            //Util.destroy(sceneList[container.sceneList[i].name], "name");
        }

        container.sceneList = sceneList;

        //console.log(container);

        return container;
    }
}

