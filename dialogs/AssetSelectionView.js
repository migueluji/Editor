class AssetSelectionView {

    constructor(assetList,input) {  
		this.input=input;
		this.assetList=assetList;
		this.html = document.createElement("div");
		this.html.className +="dialog-full-screen";
		this.html.innerHTML =
		 		'<div class="mdc-card" style="padding:0px">'+
					'<header class="mdc-top-app-bar--dense">'+
						'<div class="mdc-top-app-bar__row">'+
							'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
								'<span class="mdc-toolbar__title">Choose Image</span>'+
							'</section>'+
							'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
								'<button id="uploadbutton" class="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" data-mdc-ripple-is-unbounded="true" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">cloud_upload</button>'+
								"<input id='files' accept='image/*' type='file' multiple hidden/>"+
								'<button id="deletebutton"class="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" data-mdc-ripple-is-unbounded="true" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">delete</button>'+						
							'</section>'+
						'<div>'+
					'</header>'+
					'<div id="filecanvas" style="max-height: 483px;overflow: auto;padding: 16px;border-bottom: 1px solid lightgray;border-top: 1px solid lightgray;">'+	
						'<ul class="mdc-image-list"></ul>'+// imageList
					'</div>'+
					'<div class="mdc-card__actions">'+
						'<div class="mdc-card__action-icons">'+
							'<button id="cancelbutton" class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded"><span class="mdc-button__ripple"></span>Cancel</button>'+
							'<button id="okbutton" class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded"><span class="mdc-button__ripple"></span>Ok</button>'+
						'</div>'+
					'</div>'+
				'</div>';
		this.init(assetList);
		this.html.querySelector("#okbutton").addEventListener("click",this.okButtonHandler.bind(this));
		this.html.addEventListener("click",this.cancelBackgroundHandler.bind(this));
		this.html.querySelector("#cancelbutton").addEventListener("click",this.cancelButtonHandler.bind(this));
		
		this.html.querySelector("#uploadbutton").addEventListener("click",this.uploadImageHandler.bind(this));
		this.html.querySelector("#deletebutton").addEventListener("click",this.removeImageHandler.bind(this));
		this.html.querySelector("#files").addEventListener("change",this.fileBrowserHandler.bind(this));
	}

	init(assetList){
		assetList.forEach(image=>{
			var imageView= new ImageView();
			imageView.addView(image);
			this.addImage(imageView);
		});
	}	as

	addImage(imageView){
		var list = this.html.querySelector(".mdc-image-list");
		var name = imageView.html.firstChild.nextSibling.textContent;
		var i=0;
		while (i<list.childNodes.length && name > list.childNodes[i].firstChild.nextSibling.textContent) i++;
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

// Handlers
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
		if (this.selectedImage){ 
			var text=document.querySelector("#"+this.selectedImage).firstChild.nextSibling.textContent;
			if (confirm('Are you sure you want to delete "'+text+'" image?')){
				CmdManager.removeImageCmd(this.selectedImage);
			}
		}
	}

	okButtonHandler(){		
		this.cancelButtonHandler();
		var id=this.assetList.findIndex(i=>i.id==this.selectedImage);
		this.input.value+=this.assetList[id].name;
		if ("createEvent" in document) {
		 	var event = document.createEvent("HTMLEvents");
		 	event.initEvent("input", false, true);
			 this.input.dispatchEvent(event);
			 this.input.focus();
		}
	}

	cancelBackgroundHandler(e){
		if (e.target===this.html) this.cancelButtonHandler();
	}

	cancelButtonHandler(){
		var node=document.querySelector(".dialog-full-screen");
		node.parentNode.removeChild(node);
	}

}
