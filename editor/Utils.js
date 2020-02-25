class Utils {
    
    static newName (name,list){
        var strings=name.split("_");
        if (!isNaN(strings[strings.length-1]) && strings[strings.length-2]=="copy"){
            name="";
            for (var i=0; i<strings.length-1; i++) name=name+strings[i]+"_";
            name=name.substring(0,name.length-1);
        }
        else if (strings[strings.length-1]!="copy") name=name+"_copy";
        var newName;
        var firstCopy=Boolean(list.findIndex(i=>i.name==name)==-1);
        if (firstCopy) newName=name;
        else {
            var copyCounter=2;
            newName=name+"_"+copyCounter;
            while (list && list.findIndex(i=>i.name==newName)!=-1){
                copyCounter++;
                newName=name+"_"+copyCounter;
            }
        }
        return newName;
    }
    
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

    static rotatePoint(p,angle){
      angle=angle*Math.PI/180;
      var newX= p.x*Math.cos(angle)-p.y*Math.sin(angle);
      var newY= p.x*Math.sin(angle)+p.y*Math.cos(angle);
      return {x:newX,y:newY}
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

    static keyPressHandler(input,e){
        var chr = String.fromCharCode(e.which);
        var name= input.value;
        var filter=" abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        if ((filter.indexOf(chr) < 0) || (name.length >= 20)){
          e.preventDefault();
        }	
        return true;
    }

    static scaleToWindow(canvas, backgroundColor) {
        var scaleX, scaleY, scale, center;
      
        //1. Scale the canvas to the correct size
        //Figure out the scale amount on each axis
        scaleX = window.innerWidth / canvas.offsetWidth;
        scaleY = window.innerHeight / canvas.offsetHeight;
      
        //Scale the canvas based on whichever value is less: `scaleX` or `scaleY`
        scale = Math.min(scaleX, scaleY);
        canvas.style.transformOrigin = "0 0";
        canvas.style.transform = "scale(" + scale + ")";
      
        //2. Center the canvas.
        //Decide whether to center the canvas vertically or horizontally.
        //Wide canvases should be centered vertically, and 
        //square or tall canvases should be centered horizontally
        if (canvas.offsetWidth > canvas.offsetHeight) {
          if (canvas.offsetWidth * scale < window.innerWidth) {
            center = "horizontally";
          } else {
            center = "vertically";
          }
        } else {
          if (canvas.offsetHeight * scale < window.innerHeight) {
            center = "vertically";
          } else {
            center = "horizontally";
          }
        }
      
        //Center horizontally (for square or tall canvases)
        var margin;
        if (center === "horizontally") {
          margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
          canvas.style.marginTop = 0 + "px";
          canvas.style.marginBottom = 0 + "px";
          canvas.style.marginLeft = margin + "px";
          canvas.style.marginRight = margin + "px";
        }
      
        //Center vertically (for wide canvases) 
        if (center === "vertically") {
          margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
          canvas.style.marginTop = margin + "px";
          canvas.style.marginBottom = margin + "px";
          canvas.style.marginLeft = 0 + "px";
          canvas.style.marginRight = 0 + "px";
        }
      
        //3. Remove any padding from the canvas  and body and set the canvas
        //display style to "block"
        canvas.style.paddingLeft = 0 + "px";
        canvas.style.paddingRight = 0 + "px";
        canvas.style.paddingTop = 0 + "px";
        canvas.style.paddingBottom = 0 + "px";
        canvas.style.display = "block";
      
        //4. Set the color of the HTML body background
        document.body.style.backgroundColor = backgroundColor;
      
        //Fix some quirkiness in scaling for Safari
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("safari") != -1) {
          if (ua.indexOf("chrome") > -1) {
            // Chrome
          } else {
            // Safari
            //canvas.style.maxHeight = "100%";
            //canvas.style.minHeight = "100%";
          }
        }
      
        //5. Return the `scale` value. This is important, because you'll nee this value 
        //for correct hit testing between the pointer and sprites
        return scale;
      }
}