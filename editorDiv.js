class EditorDiv {

    constructor() {   
		 this.div = document.createElement("div");
		 this.div.innerHTML =
				 "<input id='undo' type='submit' value='Undo'/>"+
				 "<input id='redo' type='submit' value='Redo'/>";
    }
	
	undoListener(handler) {
		this.div.querySelector("#undo").addEventListener("click",handler);
	}

	redoListener(handler) {
		this.div.querySelector("#redo").addEventListener("click",handler);
	}

	get() {  
        return this.div;
	}
	
}
