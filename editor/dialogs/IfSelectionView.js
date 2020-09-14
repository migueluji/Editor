class IfSelectionView {

    constructor(insert) { 
			this.insert=insert;
			this.html = document.createElement("div");
			this.html.className +="dialog-full-screen";
			this.html.innerHTML =
				'<div class="mdc-elevation--z24 mdc-card">'+
				'<h2 id="title" class="demo-card__title mdc-typography--headline6">Select Condition</h2>'+
				'<ul style="width:320px;margin-bottom: 8px;" class="mdc-image-list">'+
					'<li id="compare" class="selection-item mdc-image-list__item">'+
						'<div class="condition-circle mdc-image-list__image-aspect-container">'+
							'<button class="selection-icon mdc-icon-button material-icons">code</button>'+
						'</div>'+
						'<div class="mdc-image-list__supporting">'+
							'<span class="selection-label mdc-image-list__label">Compare</span>'+//compare
						'</div>'+
					'</li>'+
					'<li class="selection-item mdc-image-list__item">'+
						'<div class="condition-circle mdc-image-list__image-aspect-container">'+
							'<button class="selection-icon mdc-icon-button material-icons">check</button>'+
						'</div>'+
						'<div class="mdc-image-list__supporting">'+
							'<span class="selection-label mdc-image-list__label">Check</span>'+//check
						'</div>'+
					'</li>'+
					'<li class="selection-item mdc-image-list__item">'+
						'<div class="condition-circle mdc-image-list__image-aspect-container">'+
							'<button class="selection-icon mdc-icon-button material-icons">hdr_weak</button>'+
						'</div>'+
						'<div class="mdc-image-list__supporting">'+
							'<span class="selection-label mdc-image-list__label">Collision</span>'+//collision
						'</div>'+
					'</li>'+
					'<li class="selection-item mdc-image-list__item">'+
						'<div class="condition-circle mdc-image-list__image-aspect-container">'+
							'<button class="selection-icon mdc-icon-button material-icons">timer</button>'+
						'</div>'+
						'<div class="mdc-image-list__supporting">'+
							'<span class="selection-label mdc-image-list__label">Timer</span>'+//timer
						'</div>'+
					'</li>'+
					'<li class="selection-item mdc-image-list__item">'+
						'<div class="condition-circle mdc-image-list__image-aspect-container">'+
							'<button class="selection-icon mdc-icon-button material-icons">touch_app</button>'+
						'</div>'+
						'<div class="mdc-image-list__supporting">'+
							'<span class="selection-label mdc-image-list__label">Touch</span>'+//touch
						'</div>'+
					'</li>'+
					'<li class="selection-item mdc-image-list__item">'+
						'<div class="condition-circle mdc-image-list__image-aspect-container">'+
							'<button class="selection-icon mdc-icon-button material-icons">keyboard</button>'+
						'</div>'+
						'<div class="mdc-image-list__supporting">'+
							'<span class="selection-label mdc-image-list__label">Keyboard</span>'+//keyboard
						'</div>'+
					'</li>'+
				'</ul>'+
			'<div>';
		this.html.addEventListener("click",this.cancelBackgroundHandler.bind(this));
		var elements= this.html.querySelectorAll("li");
		elements.forEach(element=> element.addEventListener("click",this.addNodeHandler.bind(this)));
  }

// Handlers
	addNodeHandler(e){
		if (e.target.tagName== "BUTTON"){
			var sceneID=document.querySelector(".sceneselected").id;
			var actorID=document.querySelector(".actorselected").id;
			var scriptID=document.querySelector(".scriptselected").id;
			var type = e.target.parentNode.nextSibling.firstChild.innerHTML;
			var parameters=null;
			switch(type){
				case "Compare":     parameters= new Object({"value_1":null,"operation":"Less","value_2":null});break;
				case "Check":       parameters= new Object({"property":null});break;
				case "Collision":   parameters= new Object({"tags":null});break;
				case "Timer":       parameters= new Object({"seconds":1});break;
				case "Touch":       parameters= new Object({"mode":"Down","on_Actor":true});break;
				case "Keyboard":    parameters= new Object({"key":null,"key_Mode":"Pressed"});break;
			}
			this.node= new Node({"id":Utils.id(),"type":type,"parameters":parameters,"nodeListTrue":[],"nodeListFalse":[]});
			CmdManager.addNodeCmd(sceneID,actorID,scriptID,this.insert,this.node);
			this.closeDialog();
		}
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
