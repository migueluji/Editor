class SideSheetView {

    constructor() {   
		 this._html = document.createElement("aside");
		 this._html.className +="side-sheet";
		 this._html.innerHTML =
				 '<div class="game-properties"></div>'+
				 '<div class="scene-properties"></div>'+
				 '<div class="cast"></div>';
    }
	
	get html() {  
        return this._html;
	}

	set html(html){
		var children=this._html.querySelector("."+html.className);
		children.parentNode.replaceChild(html,children);
	}

	closeSheetHandler(){
		this._html.style.display="none";
	}

	static openSheetHandler(name){
		document.querySelector(".scene-properties").style.display="none";
		document.querySelector(".game-properties").style.display="none";
		document.querySelector(".side-sheet").style.display="block";
		document.querySelector(name).style.display="block";
	}

}
