class EditorDiv {

    constructor() {   
		 this._html = document.createElement("div");
		 this._html.innerHTML =
				 "<input id='undo' type='submit' value='Undo'/>"+
				 "<input id='redo' type='submit' value='Redo'/>";
    }
	
	get html() {  
        return this._html;
	}

	undoListener(handler) {
		this._html.querySelector("#undo").addEventListener("click",handler);
	}

	redoListener(handler) {
		this._html.querySelector("#redo").addEventListener("click",handler);
	}
	
}
