class DoView extends NodeView {

  constructor() {   
			super();
			this.html.classList.add("element");
			this.html.innerHTML=
				'<div class="mdc-chip"></div>'+
				'<div class="mdc-card"></div>';
	}
}