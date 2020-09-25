class DrawerScenesView {

	constructor(sceneList,canvas) {   
		this.html = document.createElement("div");
		this.html.className +="mdc-drawer__content";
		this.html.innerHTML =
			'<div id="mymenu" style="position:fixed" class="mdc-menu mdc-menu-surface">'+
				'<ul id="mylist" class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">'+
					'<li id="rename" class="mdc-list-item" role="menuitem">'+
						'<span class="mdc-list-item__ripple"></span>'+
						'<span class="mdc-list-item__text">Rename</span>'+
					'</li>'+
					'<li id="duplicate" class="mdc-list-item" role="menuitem">'+
						'<span class="mdc-list-item__ripple"></span>'+
						'<span class="mdc-list-item__text">Duplicate</span>'+
					'</li>'+
					'<li id="delete" class="mdc-list-item" role="menuitem">'+
					'<span class="mdc-list-item__ripple"></span>'+
					'<span class="mdc-list-item__text">Delete</span>'+
				'</li>'+
				'</ul>'+
			'</div>'+
			'<ul id="scenes" style="padding:0px" class="mdc-list mdc-list--image-list" role="listbox">';
		this.html.querySelector("#rename").addEventListener("click",this.renameSceneHandler.bind(this));
		this.html.querySelector("#duplicate").addEventListener("click",this.duplicateSceneHandler.bind(this));
		this.html.querySelector("#delete").addEventListener("click",this.removeSceneHandler.bind(this));

		this.init(sceneList,canvas);
		this.menu=mdc.menu.MDCMenu.attachTo(this.html.querySelector("#mymenu"));
	}

	openSceneMenu(sceneID,x,y){
		this.id=sceneID;
		this.menu.open = true;
		this.menu.setAbsolutePosition(x, y);
	}

	init(sceneList,canvas){
		var scenePos=0;
		sceneList.forEach(scene => {
			scenePos++;
			var sceneView = new SceneView();
			sceneView.addView(scene);
			var d=64;
			// var w=canvas.gameProperties.displayWidth;
			// var h=canvas.gameProperties.displayHeight;
			// (w>h) ? d=h : d=w ;
			canvas.takeScreenshot(d,d,scene.id,scene.actorList,false);
			this.addScene(sceneView,scenePos);
		});	
		if (sceneList[0]) this.updateSelectedScene(sceneList[0].id);
	}

  	addScene(sceneView,scenePos) {
		//var element = this.html.querySelector(".mdc-list");
		var element = this.html.querySelector("#scenes");
		element.insertBefore(sceneView.html,element.childNodes[scenePos]);
	}

	removeScene(sceneID){
		this.html.querySelector("#"+sceneID).remove();
	}

	renameScene(sceneID,sceneName)	{
		this.html.querySelector("#"+sceneID).querySelector(".mdc-list-item__text").innerText=sceneName.split("_").join(" ");
	}

	updateSelectedScene(sceneID){
		var sceneSelected=this.html.querySelector(".sceneselected");
		if (sceneSelected) {
			sceneSelected.classList.remove("sceneselected");
			sceneSelected.classList.remove("mdc-list-item--selected");
		}
		this.html.querySelector('#'+sceneID).classList.add("sceneselected");
		this.html.querySelector('#'+sceneID).classList.add("mdc-list-item--selected");
	}

// Handlers
	renameSceneHandler(){
		var dialog = new RenameDialogView("scene",this.id);
		var editorFrame=document.querySelector(".editor-frame-root");
		editorFrame.appendChild(dialog.html);
		dialog.html.querySelector("#input").focus();
	}

	duplicateSceneHandler(){
		CmdManager.duplicateSceneCmd(this.id);
	}

	removeSceneHandler (){
		var ul =document.querySelector("#"+this.id).parentNode;
		if (ul.children.length==1) alert ("This scene cannot be deleted!");
		else {
			var element =document.querySelector("#"+this.id);
			var text=element.querySelector(".mdc-list-item__text").innerText;
			if (confirm('Are you sure you want to delete "'+text+'" scene?')) CmdManager.removeSceneCmd(this.id);
		}
	}

}
