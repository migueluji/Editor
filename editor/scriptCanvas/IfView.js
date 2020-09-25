class IfView extends NodeView {

    constructor() {   
		super();
		this.html.innerHTML =
			'<div  class="condition">'+
					'<div  class="frame" ></div>'+
							'<div  class="element">'+
										'<span  class="notext">no</span>'+
										'<span  class="yestext">yes</span>'+
										'<div  class="mdc-chip"></div>'+
										'<div style="display:none" class="mdc-card"></div>'+
							'</div>'+
					'<div class="nodelist no"></div>'+
					'<div class="nodelist yes"></div>'+
			'</div>';
	}
}