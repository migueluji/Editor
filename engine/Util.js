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

        return text.replace(/Me./g, actor.name + ".").replace(/{/g, "{this.scope['");
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
            
            if((temp.search(scope[i].name) != -1) && (scope[i].scene == scope.Game.activeScene) && (scope[i].ID != undefined)) {

                temp = temp.replace(new RegExp(scope[i].name,"g"), scope[i].ID);
            }
        }

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
            Util.destroy(sceneList[container.sceneList[i].name], "name");
        }

        container.sceneList = sceneList;

        console.log(container);

        return container;
    }
}
