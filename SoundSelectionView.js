class SoundSelectionView {

    constructor(soundList,soundID) {   
		 this.html = document.createElement("div");
		 this.html.className +="sound-selection side-sheet-content";
		 this.html.style.display="none";
		 this.html.innerHTML =
			'<header class="mdc-top-app-bar--dense properties-bar">'+
				'<div class="mdc-top-app-bar__row">'+
					'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
						'<button id="exitbutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="exit" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">arrow_back</button>'+
						'<span style="margin:0px" class="mdc-toolbar__title">Sounds</span>'+
					'</section>'+
					'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
						'<button id="uploadbutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="exit" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">cloud_upload</button>'+
						"<input id='files' accept='audio/*' type='file' multiple hidden/>"+
						'<button id="deletebutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="exit" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">delete</button>'+
					'</section>'+
				'</div>'+
			'</header>'+
			'<ul class="mdc-image-list">'+
					// aqui van los sonidos
			'</ul>';
		this.html.querySelector("#exitbutton").addEventListener("click",this.exitSheetHandler.bind(this));
		this.html.querySelector("#uploadbutton").addEventListener("click",this.uploadSoundHandler.bind(this));
		this.html.querySelector("#deletebutton").addEventListener("click",this.removeSoundHandler.bind(this));
		this.html.querySelector("#files").addEventListener("change",this.fileBrowserHandler.bind(this));
		this.selectedSound=null;
		this.init(soundList,soundID);
	}

	addSound(soundView){
		var list = this.html.querySelector(".mdc-image-list");
		var name = soundView.html.firstChild.nextSibling.textContent;
		var i=0;
		while (i<list.childNodes.length && name > list.childNodes[i].firstChild.nextSibling.textContent) {
			i++;
		}
		list.insertBefore(soundView.html,list.childNodes[i]);
	}

	removeSound(soundID){
		this.html.querySelector("#"+soundID).remove();
	}

	updateSelectedSound(soundID){
		(this.selectedSound === soundID) ? this.selectedSound=null : this.selectedSound=soundID;
		var selectedSounds=this.html.querySelectorAll(".image-list--selected");
		selectedSounds.forEach(element=>{
			element.classList.remove("image-list--selected");
		});			
		if (this.selectedSound !== null) {
			var listItem=this.html.querySelector("#"+soundID).firstChild;
			listItem.className+= " image-list--selected";
		}
	}

//Handlers
	exitSheetHandler(){
		this.html.style.display="none";
		SideSheetView.openSheetHandler("game-properties");
	}

	uploadSoundHandler(e){
		var element = this.html.querySelector("#files")
		element.value="";
		element.click();
	}

	fileBrowserHandler(evt){
		var files = evt.target.files;
		var list =this.html.querySelectorAll(".mdc-image-list__label");
		for( var i=0; i<files.length;i++){
			var j=0;
			while((j<list.length) && (files[i].name!=list[j].innerText)){
				j++;
			};
			if (j==list.length) {
				CmdManager.addSoundCmd(files[i].name);
			}
			else {
				if(confirm('The file "'+files[i].name+'" already exist. Do you want to replace it?')){
				CmdManager.removeSoundCmd(list[j].parentNode.parentNode.id);
				CmdManager.addSoundCmd(files[i].name);
				}
			}
		}
	}

	removeSoundHandler(){
		if (this.selectedSound){ // si hay sonido seleccionado
			var text=document.querySelector("#"+this.selectedSound).firstChild.nextSibling.textContent;
			if (confirm('Are you sure you want to delete "'+text+'" sound?')){
				CmdManager.removeSoundCmd(this.selectedSound);
			}
		}
	}

//Utilities
	init(soundList,soundID){
		soundList.forEach(sound=>{
			var soundView= new SoundView();
			soundView.addView(sound);
			this.addSound(soundView);
		});
		this.updateSelectedSound(soundID);
	}
}
