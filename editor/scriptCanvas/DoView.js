class DoView extends NodeView {

  constructor() {   
			super();
			this.html.classList.add("element");
			this.html.innerHTML=
				'<div class="mdc-chip"></div>'+
				'<div style="display:none" class="mdc-card"></div>';
	}
}