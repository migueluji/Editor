class SideSheetView {

    constructor() {   
		 this.html = document.createElement("aside");
		 this.html.className +="side-sheet";
		 this.html.style.display="none";
		 this.html.innerHTML =
				 '<div class="game-properties"></div>'+
				 '<div class="sound-selection"></div>'+
				 '<div class="cast"></div>'+
				 '<div class="actor-properties"></div>';
		this.displayed=null;	
    }

	addView(html){
		var children=this.html.querySelector("."+html.classList[0]);
		children.parentNode.replaceChild(html,children);
	}

	static closeSheetHandler(){
		document.querySelector(".side-sheet").style.display="none";
		this.displayed=null;	
	}

	static openSheetHandler(name){
		document.querySelector(".game-properties").style.display="none";
		document.querySelector(".sound-selection").style.display="none";
		document.querySelector(".cast").style.display="none";
		document.querySelector(".actor-properties").style.display="none";
		document.querySelector(".side-sheet").style.display="block";
		document.querySelector("."+name).style.display="block";
		this.displayed=name;
		console.log(this.displayed);
	}

}
