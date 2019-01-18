class SideSheetView {

    constructor() {   
		 this._html = document.createElement("aside");
		 this._html.className +="side-sheet";
		 this._html.style.display="none";
		 this._html.innerHTML =
				 '<div class="game-properties"></div>'+
				 '<div class="sound-selection"></div>'+
				 '<div class="cast"></div>';
    }
	
	get html() {  
        return this._html;
	}

	addView(html){
		var children=this._html.querySelector("."+html.classList[0]);
		children.parentNode.replaceChild(html,children);
	}

	static closeSheetHandler(){
		document.querySelector(".side-sheet").style.display="none";
	}

	static openSheetHandler(name){
		console.log(name);
		document.querySelector(".game-properties").style.display="none";
		document.querySelector(".sound-selection").style.display="none";
		document.querySelector(".side-sheet").style.display="block";
		document.querySelector("."+name).style.display="block";
	}

}
