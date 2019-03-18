class Utils {
    

    static randomColor(opacity) {

        return "rgba(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + (opacity || 1) + ")"
    }

    static getHexColor(number) {

        return "#"+((number)>>>0).toString(16).slice(-6);
    }

    static radians(degrees) {

        return degrees * Math.PI / 180;
    }

    static degrees(radians) {

        return radians * 180 / Math.PI;
    }

    static angleBetweenTwoPoints(p1, p2) {

        return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    }

    static distanceBetweenTwoPoints(p1, p2) {

        return Math.hypot(p2.x-p1.x, p2.y-p1.y);
    }

    static id (){
        return "_" + new Date().valueOf() + Math.random().toFixed(16).substring(2);
    }

    static UUID() {

        function s4()
        {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
}