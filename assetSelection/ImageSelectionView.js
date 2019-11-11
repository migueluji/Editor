class ImageSelectionView {

    constructor(imageList) {   
		 this.html = document.createElement("div");
		 this.html.className +="image-selection side-sheet-content";
		 this.html.style.display="none";
		 this.html.innerHTML =
			'<header class="mdc-top-app-bar--dense properties-bar">'+
				'<div class="mdc-top-app-bar__row">'+
					'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
						'<button id="exitbutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="exit" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">arrow_back</button>'+
						'<span style="margin:0px" class="mdc-toolbar__title">Images</span>'+
					'</section>'+
					'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
						'<button id="uploadbutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="exit" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">cloud_upload</button>'+
						"<input id='files' accept='image/*' type='file' multiple hidden/>"+
						'<button id="deletebutton" class="material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" aria-label="exit" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">delete</button>'+
					'</section>'+
				'</div>'+
			'</header>'+
			'<ul class="mdc-image-list">'+
					// aqui van las imagenes
			'</ul>';
		this.html.querySelector("#exitbutton").addEventListener("click",this.exitSheetHandler.bind(this));
		this.html.querySelector("#uploadbutton").addEventListener("click",this.uploadImageHandler.bind(this));
		this.html.querySelector("#deletebutton").addEventListener("click",this.removeImageHandler.bind(this));
		this.html.querySelector("#files").addEventListener("change",this.fileBrowserHandler.bind(this));
		this.actorImage=null;
		this.selectedImage=null;
		this.actorID=null;
		this.init(imageList);
	}

	addImage(imageView){
		var list = this.html.querySelector(".mdc-image-list");
		var name = imageView.html.firstChild.nextSibling.textContent;
		var i=0;
		while (i<list.childNodes.length && name > list.childNodes[i].firstChild.nextSibling.textContent) {
			i++;
		}
		list.insertBefore(imageView.html,list.childNodes[i]);
	}

	removeImage(imageID){
		this.html.querySelector("#"+imageID).remove();
	}

	updateSelectedImage(imageID){
		(this.selectedImage === imageID) ? this.selectedImage=null : this.selectedImage=imageID;
		var selectedImages=this.html.querySelectorAll(".image-list--selected");
		selectedImages.forEach(element=>{
			element.classList.remove("image-list--selected");
		});			
		if (this.selectedImage !== null) {
			var listItem=this.html.querySelector("#"+imageID).firstChild;
			listItem.className+= " image-list--selected";
		}
	}

//Handlers
	exitSheetHandler(){		
		var element=this.html.querySelector("#"+this.selectedImage);
		var name;
		(element==null) ? name="Undefined" : name=element.firstChild.nextSibling.firstChild.textContent;
		this.html.style.display="none";
		SideSheetView.openSheetHandler("actor-properties");
		console.log(this.actorImage,name);
		if (this.actorImage !== name){
			var sceneID=document.querySelector(".sceneselected").id;
			var actorID=document.querySelector(".actorselected").id;
			if (name!="Undefined") {
				var image=element.firstChild.firstChild;
				CmdManager.changeActorPropertyCmd(sceneID,actorID,"imageSize",{image:name,width:image.naturalWidth,height:image.naturalHeight});
			}
			else CmdManager.changeActorPropertyCmd(sceneID,actorID,"imageSize",{image:null,width:50,height:50});
		}
	}

	uploadImageHandler(e){
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
				CmdManager.addImageCmd(files[i].name);
			}
			else {
				if(confirm('The file "'+files[i].name+'" already exist. Do you want to replace it?')){
				CmdManager.removeImageCmd(list[j].parentNode.parentNode.id);
				CmdManager.addImageCmd(files[i].name);
				}
			}
		}
	}

	removeImageHandler(){
		if (this.selectedImage){ // si hay sonido seleccionado
			var text=document.querySelector("#"+this.selectedImage).firstChild.nextSibling.textContent;
			if (confirm('Are you sure you want to delete "'+text+'" image?')){
				CmdManager.removeImageCmd(this.selectedImage);
			}
		}
	}

//Utilities
	init(imageList){
		imageList.forEach(image=>{
			var imageView= new ImageView();
			imageView.addView(image);
			this.addImage(imageView);
		});
	}
}
