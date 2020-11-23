class AssetSelectionView {

    constructor(assetList,input,type,canvasView) {  
		this.input=input;
		this.canvasView=canvasView;
		this.assetList=assetList;
		this.html = document.createElement("div");
		this.html.className +="dialog-full-screen";
		this.html.innerHTML =
		 		'<div class="mdc-elevation--z24 mdc-card" style="padding:0px">'+
					'<header class="mdc-top-app-bar--dense">'+
						'<div class="mdc-top-app-bar__row">'+
							'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
								'<span id="title" class="mdc-toolbar__title">Select Asset</span>'+
							'</section>'+
							'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
								'<button id="uploadbutton" class="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" data-mdc-ripple-is-unbounded="true" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">cloud_upload</button>'+
									"<input id='files' accept='image/*' type='file' multiple hidden></input>"+
								'<button id="deletebutton" class="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" data-mdc-ripple-is-unbounded="true" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">delete</button>'+
							'</section>'+
						'<div>'+
					'</header>'+
					'<div id="filecanvas" style="height: 444px;overflow: auto;padding: 16px;border-bottom: 1px solid lightgray;border-top: 1px solid lightgray;">'+	
						'<ul class="mdc-image-list" style="width:500px"></ul>'+// Asset List
					'</div>'+
					'<div class="mdc-card__actions">'+
						'<div class="mdc-card__action-icons">'+
							'<button id="cancelbutton" class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded"><span class="mdc-button__ripple"></span>Cancel</button>'+
							'<button id="okbutton" class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded"><span class="mdc-button__ripple"></span>Ok</button>'+
						'</div>'+
					'</div>'+
				'</div>';
		this.html.querySelector("#title").textContent="Select "+type;
		this.init(assetList,type);
		this.html.querySelector("#okbutton").addEventListener("click",this.okButtonHandler.bind(this));
		this.html.addEventListener("click",this.cancelBackgroundHandler.bind(this));
		this.html.querySelector("#cancelbutton").addEventListener("click",this.cancelButtonHandler.bind(this));

		this.type=type;
		if (this.type=="Font") {
			this.html.querySelector("#deletebutton").style.display="none";
			this.html.querySelector("#uploadbutton").style.display="none";
		}
		else{
			this.html.querySelector("#uploadbutton").addEventListener("click",this.uploadAssetHandler.bind(this));
			this.html.querySelector("#deletebutton").addEventListener("click",this.removeAssetHandler.bind(this));
			this.html.querySelector("#files").addEventListener("change",this.fileBrowserHandler.bind(this));
		}
		this.selectedAsset=[];
	}

	init(assetList,type){
		assetList.forEach(asset=>{
			var assetView= new AssetView(asset,type);
			this.addAsset(assetView);
		});
	}	

	addAsset(assetView){
		var list = this.html.querySelector(".mdc-image-list");
		var name = assetView.html.firstChild.nextSibling.textContent;
		var i=0;
		while (i<list.childNodes.length && name.toUpperCase() > list.childNodes[i].firstChild.nextSibling.textContent.toUpperCase()) i++;
		list.insertBefore(assetView.html,list.childNodes[i]);
	}

	removeAsset(assetID){
		this.html.querySelector("#"+assetID).remove();
	}

	updateSelectedAsset(assetIDList){ // assetIDList
		assetIDList.forEach(assetID=>{
			var founded = this.selectedAsset.findIndex(i=>i==assetID);
			if (founded!=-1) 
				this.selectedAsset.splice(founded,1)
			else {
				if (this.type=="Animation") this.selectedAsset.push(assetID);
				else this.selectedAsset[0]=assetID;
			}
		})
		var selectedAssets=this.html.querySelectorAll(".image-list--selected");
		selectedAssets.forEach(element=>{
			 element.classList.remove("image-list--selected"); // all selected are deleted
		});			
		this.selectedAsset.forEach(i=>{
			var listItem=this.html.querySelector("#"+i);
			if (listItem) listItem.firstChild.classList.add("image-list--selected");   // new selected are marked
		})
	}

// Handlers
	uploadAssetHandler(e){
		var input = this.html.querySelector("#files")
		if (this.type=="Sound") {
			input.accept="audio/*";
		} 
		else {
			input.accept="image/*";
		}
		input.value="";
		input.click();
	}

	fileBrowserHandler(evt){
		var files = evt.target.files;
		var list =this.html.querySelectorAll(".mdc-image-list__label");
		for( var i=0; i<files.length;i++){
			var j=0;
			while((j<list.length) && (files[i].name.toUpperCase()!=list[j].innerText.toUpperCase())){
				j++;
			};
			if (j==list.length) {
				Command.uploadFileCmd(files[i],this.type);
			}
			else {
				if(confirm('The file "'+files[i].name+'" already exist. Do you want to replace it?')){
					Command.removeAssetCmd(list[j].parentNode.parentNode.id,this.type);									
					Command.uploadFileCmd(files[i],this.type);
				}
			}
		}
		this.updateLoader();
	}
	
	removeAssetHandler(){
		if (this.selectedAsset){
			var name=document.querySelector("#"+this.selectedAsset).firstChild.nextSibling.textContent;
			if (confirm('Are you sure you want to delete "'+name+'" asset?')){				
				Command.deleteFileCmd(this.selectedAsset[0], name, this.type);
				this.selectedAsset.shift();
			}
		}
		this.updateLoader();
	}

	okButtonHandler(){		
		this.cancelButtonHandler();
		if (this.input!=null) {
			this.input.value=null;
			this.selectedAsset.forEach((assetID,j)=>{
				var id=this.assetList.findIndex(i=>i.id==assetID);
				if (id!=-1) {
					(j==0) ?this.input.value=this.assetList[id].name: this.input.value +=","+this.assetList[id].name;
				}
			})
			this.assetList=[];
			if ("createEvent" in document) {
				var event = document.createEvent("HTMLEvents");
				if (this.input.name=="script") 	event.initEvent("input", false, true);
				else event.initEvent("change", false, true);
				//event.initEvent("input", false, true);
				this.input.dispatchEvent(event);
				this.input.focus();
			}
		}
	}

	cancelButtonHandler(){
		Command.closeAssetCmd();
	}

	cancelBackgroundHandler(e){
		if (e.target===this.html) this.cancelButtonHandler();
	}

// Utils
	updateLoader(){
		var buttons=this.html.querySelectorAll("button");
		buttons.forEach(i=>i.disabled=true); // disable cancel, ok, upload and delete buttons
		app.file.loader.load(()=>{ 
			buttons.forEach(i=>i.disabled=false); // enable all buttons when loaded asset
		});
	}
}
