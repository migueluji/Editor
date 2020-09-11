class TagView {

    constructor(tag) {
			this.html = document.createElement("li");
			this.html.className ="mdc-list-item mdc-ripple-upgraded";
			this.html.style="width:100%";
			this.html.innerHTML =
				'<div class="mdc-checkbox mdc-list-item__meta mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded" style="margin-left:-4px;--mdc-ripple-fg-size:24px; --mdc-ripple-fg-scale:1.66667; --mdc-ripple-left:8px; --mdc-ripple-top:8px;">'+
					'<input type="checkbox" class="mdc-checkbox__native-control" tabindex="-1">'+
					'<div class="mdc-checkbox__background">'+
						'<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">'+
							'<path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>'+
						'</svg>'+
						'<div class="mdc-checkbox__mixedmark"></div>'+
					'</div>'+
					'<div class="mdc-checkbox__ripple"></div>'+
				'</div>'+
				'<p style="font-family: var(--mdc-typography-font-family);">'+tag+'</p>'+
				'<span id="removebutton" class="mdc-list-item__meta material-icons" aria-hidden="true">cancel</span>';
			
			this.html.querySelector("#removebutton").addEventListener("click",this.removeTagHandler.bind(this));
			this.tag=tag;
	}

// Handlers
	removeTagHandler(){
		this.html.remove();
		CmdManager.removeTagCmd(this.tag);
	}
}
