class IfSelectionView {

    constructor(element,elementID) {   
		 this.html = document.createElement("div");
		 this.html.className +="dialog-full-screen";
		 this.html.innerHTML =
		 '<div class="mdc-card">'+
		 '<h2 id="title" class="demo-card__title mdc-typography--headline6">Select Condition</h2>'+
		 '<ul style="width:320px;margin-bottom: 8px;" class="mdc-image-list">'+
			 '<li id="compare" class="selection-item mdc-image-list__item">'+
				 '<div class="condition-circle mdc-image-list__image-aspect-container">'+
					 '<i class="selection-icon material-icons">code</i>'+ 
				 '</div>'+
				 '<div class="mdc-image-list__supporting">'+
					 '<span class="selection-label mdc-image-list__label">Compare</span>'+//compare
				 '</div>'+
			 '</li>'+
			 '<li class="selection-item mdc-image-list__item">'+
				 '<div class="condition-circle mdc-image-list__image-aspect-container">'+
					 '<i class="selection-icon material-icons">check</i>'+ 
				 '</div>'+
				 '<div class="mdc-image-list__supporting">'+
					 '<span class="selection-label mdc-image-list__label">Check</span>'+//check
				 '</div>'+
			 '</li>'+
			 '<li class="selection-item mdc-image-list__item">'+
				 '<div class="condition-circle mdc-image-list__image-aspect-container">'+
					 '<i class="selection-icon material-icons">hdr_weak</i>'+
				 '</div>'+
				 '<div class="mdc-image-list__supporting">'+
					 '<span class="selection-label mdc-image-list__label">Collision</span>'+//collision
				 '</div>'+
			 '</li>'+
			 '<li class="selection-item mdc-image-list__item">'+
				 '<div class="condition-circle mdc-image-list__image-aspect-container">'+
					 '<i class="selection-icon material-icons">timer</i>'+
				 '</div>'+
				 '<div class="mdc-image-list__supporting">'+
					 '<span class="selection-label mdc-image-list__label">Timer</span>'+//timer
				 '</div>'+
			 '</li>'+
			 '<li class="selection-item mdc-image-list__item">'+
				 '<div class="condition-circle mdc-image-list__image-aspect-container">'+
					 '<i class="selection-icon material-icons">touch_app</i>'+
				 '</div>'+
				 '<div class="mdc-image-list__supporting">'+
					 '<span class="selection-label mdc-image-list__label">Touch</span>'+//touch
				 '</div>'+
			 '</li>'+
			 '<li class="selection-item mdc-image-list__item">'+
				 '<div class="condition-circle mdc-image-list__image-aspect-container">'+
					 '<i class="selection-icon material-icons">keyboard</i>'+
				 '</div>'+
				 '<div class="mdc-image-list__supporting">'+
					 '<span class="selection-label mdc-image-list__label">Keyboard</span>'+//keyboard
				 '</div>'+
			 '</li>'+
		 '</ul>'+
	 '<div>';
		this.html.addEventListener("click",this.cancelBackgroundHandler.bind(this));
		this.html.querySelector("#compare").addEventListener("click",this.addConditionHandler.bind(this,"compare"));
		this.type="compare";
		this.nodeID=null;
  }

// Handlers
	addConditionHandler(type){
		var sceneID=document.querySelector(".sceneselected").id;
		var actorID=document.querySelector(".actorselected").id;
		var scriptID=document.querySelector(".scriptselected").id;
		var nodeListID = document.querySelector(".nodelistselected").id;

		var node=document.querySelector(".nodeselected");
		(node) ? this.nodeID=node.id: this.nodeID=null;
		var position=0;

		CmdManager.addConditionCmd(sceneID,actorID,scriptID,nodeListID,position,type,null);
		this.closeDialog();
	}

	cancelBackgroundHandler(e){
		if (e.target===this.html)	{
			this.closeDialog();
		}
	}

// Utils
	closeDialog(){
		var node=document.querySelector(".dialog-full-screen");
		node.parentNode.removeChild(node);
	}

}
