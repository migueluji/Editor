class FontSelectionView {

    constructor(fontList) {   
		 this.html = document.createElement("div");
		 this.html.className +="font-selection side-sheet-content";
		 this.html.style.display="none";
		 this.html.innerHTML =
			'<header class="mdc-top-app-bar--dense properties-bar">'+
				'<div class="mdc-top-app-bar__row">'+
					'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
						'<button id="exitbutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="exit" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">arrow_back</button>'+
						'<span style="margin:0px" class="mdc-toolbar__title">Fonts</span>'+
					'</section>'+
					'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
						'<button id="uploadbutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="exit" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">cloud_upload</button>'+
						"<input id='files' accept='font/*' type='file' multiple hidden/>"+
						'<button id="deletebutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="exit" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">delete</button>'+
					'</section>'+
				'</div>'+
			'</header>'+
			'<ul class="mdc-image-list">'+
					// aqui van las fuentes
			'</ul>';
		this.html.querySelector("#exitbutton").addEventListener("click",this.exitSheetHandler.bind(this));
		this.html.querySelector("#uploadbutton").addEventListener("click",this.uploadFontHandler.bind(this));
		this.html.querySelector("#deletebutton").addEventListener("click",this.removeFontHandler.bind(this));
		this.html.querySelector("#files").addEventListener("change",this.fileBrowserHandler.bind(this));
		this.selectedFont=null;
		this.elementFont=null; // fuente que tiene el actor o el juego antes de abrir el selector
		this.actorID=null;
		this.init(fontList);
	}

	addFont(fontView){
		var list = this.html.querySelector(".mdc-image-list");
		var name = fontView.html.firstChild.nextSibling.textContent;
		var i=0;
		while (i<list.childNodes.length && name > list.childNodes[i].firstChild.nextSibling.textContent) {
			i++;
		}
		list.insertBefore(fontView.html,list.childNodes[i]);
	}

	removeFont(fontID){
		this.html.querySelector("#"+fontID).remove();
	}

	updateSelectedFont(fontID){
		(this.selectedFont === fontID) ? this.selectedFont=null : this.selectedFont=fontID;
		var selectedFonts=this.html.querySelectorAll(".image-list--selected");
		selectedFonts.forEach(element=>{
			element.classList.remove("image-list--selected");
		});			
		if (this.selectedFont !== null) {
			var listItem=this.html.querySelector("#"+fontID).firstChild;
			listItem.className+= " image-list--selected";
		}
	}

//Handlers
	exitSheetHandler(){
		var element=this.html.querySelector("#"+this.selectedFont);
		var name=null;
		(element==null) ? name="Undefined" : name=element.firstChild.nextSibling.firstChild.textContent
		if (this.elementFont != name){
			var sceneID=document.querySelector(".sceneselected").id;
			var actorID=document.querySelector(".actorselected").id;
			CmdManager.changeActorPropertyCmd(sceneID,actorID,"font",name);
		}
		SideSheetView.openSheetHandler("actor-properties");
		this.html.style.display="none";
	}

	uploadFontHandler(e){
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
				CmdManager.addFontCmd(files[i].name);
			}
			else {
				if(confirm('The file "'+files[i].name+'" already exist. Do you want to replace it?')){
				CmdManager.removeFontCmd(list[j].parentNode.parentNode.id);
				CmdManager.addFontCmd(files[i].name);
				}
			}
		}
	}

	removeFontHandler(){
		if (this.selectedFont){ // si hay sonido seleccionado
			var text=document.querySelector("#"+this.selectedFont).firstChild.nextSibling.textContent;
			if (confirm('Are you sure you want to delete "'+text+'" font?')){
				CmdManager.removeFontCmd(this.selectedFont);
			}
		}
	}

//Utilities
	init(fontList){
		fontList.forEach(font=>{
			var fontView= new FontView();
			fontView.addView(font);
			this.addFont(fontView);
		});
	}
}
