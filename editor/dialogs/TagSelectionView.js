class TagSelectionView {

    constructor(tagList,input) {  
		this.html = document.createElement("div");
		this.html.className +="dialog-full-screen";
		this.html.innerHTML =
		 		'<div class="mdc-elevation--z24 mdc-card" style="padding:0px">'+
					'<header class="mdc-top-app-bar--dense">'+
						'<div class="mdc-top-app-bar__row">'+
							'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">'+
								'<span id="title" class="mdc-toolbar__title">Select Tags</span>'+
							'</section>'+
							'<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">'+
								'<button id="addbutton" class="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon mdc-ripple-upgraded--unbounded mdc-ripple-upgraded" data-mdc-ripple-is-unbounded="true" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">add_circle_outline</button>'+
							'</section>'+
						'<div>'+
					'</header>'+
					'<div id="filecanvas" style="height: 240px;overflow: auto;padding: 8px 0px;border-bottom: 1px solid lightgray;border-top: 1px solid lightgray;">'+	
						'<ul class="mdc-image-list" style="width:280px"></ul>'+// Tag List
					'</div>'+
					'<div class="mdc-card__actions">'+
						'<div class="mdc-card__action-icons">'+
							'<button id="cancelbutton" class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded"><span class="mdc-button__ripple"></span>Cancel</button>'+
							'<button id="okbutton" class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded"><span class="mdc-button__ripple"></span>Ok</button>'+
						'</div>'+
					'</div>'+
				'</div>';
		this.init(tagList,input.value);
		this.selectedAsset=[];
		this.input=input;

		this.html.querySelector("#addbutton").addEventListener("click",this.addTagHandler.bind(this));
		this.html.addEventListener("click",this.cancelBackgroundHandler.bind(this));
		this.html.querySelector("#cancelbutton").addEventListener("click",this.cancelButtonHandler.bind(this));
		this.html.querySelector("#okbutton").addEventListener("click",this.okButtonHandler.bind(this));
	}

	init(tagList,value){
		if (tagList){
			var myTags = value.split(",");
			var list = this.html.querySelector("ul");
			tagList.forEach(tag=>{
				var li =new TagView(tag);
				list.appendChild(li.html);
				var founded = myTags.findIndex(i=>i==tag);
				if (founded!=-1) li.html.querySelector("input").checked=true;
			})
		}
	}	

	add (tag){
		var li= new TagView(tag);
		var list = this.html.querySelector("ul");
		list.appendChild(li.html);
	}

// Handlers
	addTagHandler(){
		var newTag =new NewTagDialogView();
		var editorFrame=document.querySelector(".editor-frame-root");
		editorFrame.appendChild(newTag.html);
		newTag.html.querySelector("input").focus();
	}

	okButtonHandler(){		
		this.cancelButtonHandler();
		var list=this.html.querySelectorAll("li");
		this.tags="";
		list.forEach(i=>{
			if (i.querySelector("input").checked) 
				if (this.tags!="") this.tags += ","+i.querySelector("p").innerText;
				else this.tags = i.querySelector("p").innerText;
		})

		this.input.value=this.tags;
		if ("createEvent" in document) {
			var event = document.createEvent("HTMLEvents");
			if (this.input.name=="script") event.initEvent("input", false, true);
			else event.initEvent("change", false, true);
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
