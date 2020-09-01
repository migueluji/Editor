class SideSheetView {

    constructor() {   
		 this.html = document.createElement("aside");
		 this.html.className +="side-sheet mdc-elevation--z1";
		 this.html.style.display="none";
		 this.html.innerHTML =
				 '<div class="game-properties"></div>'+
				 '<div class="cast"></div>'+
				 '<div class="actor-properties"></div>'+
				 '<div class="actor-scripts"></div>';	
    }

	addView(html){
		var children=this.html.querySelector("."+html.classList[0]);
		children.parentNode.replaceChild(html,children);
	}

	static isOpenGameProperties(){
		return(document.querySelector(".game-properties").style.display!="none");
	}

	static isOpenCast(){
		return(document.querySelector(".cast").style.display!="none");
	}

	static isOpenActorProperties(){
		return(document.querySelector(".actor-properties").style.display!="none");
	}

	static isOpenActorScripts(){
		return(document.querySelector(".actor-scripts").style.display!="none");
	}

	static closeSheetHandler(){
		document.querySelector(".side-sheet").style.display="none";
		document.querySelector(".game-properties").style.display="none";
		document.querySelector(".cast").style.display="none";
		document.querySelector(".actor-properties").style.display="none";
		document.querySelector(".actor-scripts").style.display="none";
	}

	static openSheetHandler(name){
		this.closeSheetHandler();
		document.querySelector(".side-sheet").style.display="block";
		document.querySelector("."+name).style.display="flex";
	}

}
