class DoSelectionView {

    constructor(insert) {  
		 this.insert=insert;
		 this.html = document.createElement("div");
		 this.html.className +="dialog-full-screen";
		 this.html.innerHTML =
				'<div class="mdc-card">'+
					'<h2 id="title" class="demo-card__title mdc-typography--headline6">Select Action</h2>'+
					'<ul style="width:320px;margin-bottom: 8px;" class="mdc-image-list">'+
						'<li id="edit" class="selection-item mdc-image-list__item">'+
							'<div class="action-circle mdc-image-list__image-aspect-container">'+
								'<i class="selection-icon material-icons">edit</i>'+ 
							'</div>'+
							'<div class="mdc-image-list__supporting">'+
								'<span class="selection-label mdc-image-list__label">Edit</span>'+//edit
							'</div>'+
						'</li>'+
						'<li id="spawn" class="selection-item mdc-image-list__item">'+
							'<div class="action-circle mdc-image-list__image-aspect-container">'+
								'<i class="selection-icon material-icons">person_add</i>'+ 
							'</div>'+
							'<div class="mdc-image-list__supporting">'+
								'<span class="selection-label mdc-image-list__label">Spawn</span>'+//spawn
							'</div>'+
						'</li>'+
						'<li class="selection-item mdc-image-list__item">'+
							'<div class="action-circle mdc-image-list__image-aspect-container">'+
								'<i class="selection-icon material-icons">delete</i>'+
							'</div>'+
							'<div class="mdc-image-list__supporting">'+
								'<span class="selection-label mdc-image-list__label">Delete</span>'+//delete
							'</div>'+
						'</li>'+
						'<li class="selection-item mdc-image-list__item">'+
							'<div class="action-circle mdc-image-list__image-aspect-container">'+
								'<i class="selection-icon material-icons">movie_creation</i>'+
							'</div>'+
							'<div class="mdc-image-list__supporting">'+
								'<span class="selection-label mdc-image-list__label">Animate</span>'+//animate
							'</div>'+
						'</li>'+
						'<li class="selection-item mdc-image-list__item">'+
							'<div class="action-circle mdc-image-list__image-aspect-container">'+
								'<i class="selection-icon material-icons">volume_up</i>'+
							'</div>'+
							'<div class="mdc-image-list__supporting">'+
								'<span class="selection-label mdc-image-list__label">Play</span>'+//play sound
							'</div>'+
						'</li>'+
						'<li class="selection-item mdc-image-list__item">'+
							'<div class="action-circle mdc-image-list__image-aspect-container">'+
								'<i class="selection-icon material-icons">navigation</i>'+
							'</div>'+
							'<div class="mdc-image-list__supporting">'+
								'<span class="selection-label mdc-image-list__label">Move</span>'+//move
							'</div>'+
						'</li>'+
						'<li class="selection-item mdc-image-list__item">'+
							'<div class="action-circle mdc-image-list__image-aspect-container">'+
								'<i class="selection-icon material-icons">place</i>'+
							'</div>'+
							'<div class="mdc-image-list__supporting">'+
								'<span class="selection-label mdc-image-list__label">Move To</span>'+//move to
							'</div>'+
						'</li>'+
						'<li class="selection-item mdc-image-list__item">'+
							'<div class="action-circle mdc-image-list__image-aspect-container">'+
								'<i class="selection-icon material-icons">rotate_left</i>'+
							'</div>'+
							'<div class="mdc-image-list__supporting">'+
								'<span class="selection-label mdc-image-list__label">Rotate</span>'+//rotate
							'</div>'+
						'</li>'+
						'<li class="selection-item mdc-image-list__item">'+
							'<div class="action-circle mdc-image-list__image-aspect-container">'+
								'<i class="selection-icon material-icons">rotate_90_degrees_ccw</i>'+
							'</div>'+
							'<div class="mdc-image-list__supporting">'+
								'<span class="selection-label mdc-image-list__label">Rotate To</span>'+//rotate to
							'</div>'+
						'</li>'+
						'<li class="selection-item mdc-image-list__item">'+
							'<div class="action-circle mdc-image-list__image-aspect-container">'+
								'<i class="selection-icon material-icons">call_made</i>'+
							'</div>'+
							'<div class="mdc-image-list__supporting">'+
								'<span class="selection-label mdc-image-list__label">Push</span>'+//push
							'</div>'+
						'</li>'+
						'<li class="selection-item mdc-image-list__item">'+
							'<div class="action-circle mdc-image-list__image-aspect-container">'+
								'<i class="selection-icon material-icons">keyboard_tab</i>'+
							'</div>'+
							'<div class="mdc-image-list__supporting">'+
								'<span class="selection-label mdc-image-list__label">Push To</span>'+//push to
							'</div>'+
						'</li>'+
						'<li class="selection-item mdc-image-list__item">'+
							'<div class="action-circle mdc-image-list__image-aspect-container">'+
								'<i class="selection-icon material-icons">sync</i>'+
							'</div>'+
							'<div class="mdc-image-list__supporting">'+
								'<span class="selection-label mdc-image-list__label">Torque</span>'+//torque
							'</div>'+
						'</li>'+
						'<li class="selection-item mdc-image-list__item">'+
							'<div class="action-circle mdc-image-list__image-aspect-container">'+
								'<i class="selection-icon material-icons">input</i>'+
							'</div>'+
							'<div class="mdc-image-list__supporting">'+
								'<span class="selection-label mdc-image-list__label">Go To</span>'+//go to
							'</div>'+
						'</li>'+
						'<li class="selection-item mdc-image-list__item">'+
							'<div class="action-circle mdc-image-list__image-aspect-container">'+
								'<i class="selection-icon material-icons">present_to_all</i>'+
							'</div>'+
							'<div class="mdc-image-list__supporting">'+
								'<span class="selection-label mdc-image-list__label">Add</span>'+//add scene
							'</div>'+
						'</li>'+
						'<li class="selection-item mdc-image-list__item">'+
							'<div class="action-circle mdc-image-list__image-aspect-container">'+
								'<i class="selection-icon material-icons">cancel_presentation</i>'+
							'</div>'+
							'<div class="mdc-image-list__supporting">'+
								'<span class="selection-label mdc-image-list__label">Remove</span>'+//remove scene
							'</div>'+
						'</li>'+
					'</ul>'+
				'<div>';
		this.html.addEventListener("click",this.cancelBackgroundHandler.bind(this));
		var elements= this.html.querySelectorAll("li");
		elements.forEach(element=> element.addEventListener("click",this.addActionHandler.bind(this)));
	}
	
// Handlers
	addActionHandler(e){
		if (e.target.tagName== "I"){
			var sceneID=document.querySelector(".sceneselected").id;
			var actorID=document.querySelector(".actorselected").id;
			var scriptID=document.querySelector(".scriptselected").id;
			var type= e.target.parentNode.nextSibling.firstChild.innerHTML;
			type=type.replace(" ","_");
			var parameters=null;
			switch(type){
				case "Edit" :       parameters= new Object({"property":"","value":null});break;
				case "Spawn" :      parameters= new Object({"actor":null,"x":0,"y":0,"angle":0});break;
				case "Delete" :     parameters= new Object({});break;
				case "Animate" :    parameters= new Object({"animation":null,"fps":24});break;
				case "Play" :       parameters= new Object({"sound_File":null});break;
				case "Move" :       parameters= new Object({"speed":0,"angle":0});break;
				case "Move_To" :    parameters= new Object({"speed":0,"x":0,"y":0});break;
				case "Rotate" :     parameters= new Object({"speed":0,"pivot_X":0,"pivot_Y":0});break;
				case "Rotate_To" :  parameters= new Object({"speed":0,"x":0,"y":0,"pivot_X":0,"pivot_Y":0});break;
				case "Push" :       parameters= new Object({"force":0,"angle":0});break;
				case "Push_To" :    parameters= new Object({"force":0,"x":0,"y":0});break;
				case "Torque" :     parameters= new Object({"angle":0});break;
				case "Go_To" :      parameters= new Object({"scene":null});break;
				case "Add" :        parameters= new Object({"scene":null,"stop":false});break;
				case "Remove" :     parameters= new Object({});break;
			}
			this.node=new Node({"id":Utils.id(),"type":type,"parameters":parameters});
			// change do this.node=new Do({"id":Utils.id(),"type":type,"parameters":parameters});
			console.log("addNodeCmd",sceneID,actorID,scriptID,this.insert,this.node);
			CmdManager.addNodeCmd(sceneID,actorID,scriptID,this.insert,this.node);
			this.closeDialog();
		}
	}	

	cancelBackgroundHandler(e){
		if (e.target===this.html)	{
			var node=document.querySelector(".dialog-full-screen");
			node.parentNode.removeChild(node);
		}
	}

	// Utils
	closeDialog(){
		var node=document.querySelector(".dialog-full-screen");
		node.parentNode.removeChild(node);
	}
}
