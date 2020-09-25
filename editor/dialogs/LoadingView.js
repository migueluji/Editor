class LoadingView {

    constructor(color) { 
			this.html = document.createElement("div");
			this.html.className +="dialog-full-screen";
			this.html.style="background:"+color;
			this.html.innerHTML =
				'<div style="background:var(-mdc-them-primary);width:240px;height:240px;" class="mdc-elevation--z24 mdc-card">'+
					'<h2 id="title" style="margin:16px auto 0px;" class="demo-card__title mdc-typography--headline6">Loading...</h2>'+
					'<div class="mdc-circular-progress" style="width:64px;height: 64px;margin:auto;" role="progressbar" aria-label="Example Progress Bar" aria-valuemin="0" aria-valuemax="1">'+
						'<div class="mdc-circular-progress__determinate-container">'+
							'<svg class="mdc-circular-progress__determinate-circle-graphic" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'+
							'<circle class="mdc-circular-progress__determinate-track" cx="24" cy="24" r="18" stroke-width="4"/>'+
							'<circle class="mdc-circular-progress__determinate-circle" cx="24" cy="24" r="18" stroke-dasharray="113.097" stroke-dashoffset="113.097" stroke-width="4"/>'+
							'</svg>'+
						'</div>'+
						'<div class="mdc-circular-progress__indeterminate-container">'+
							'<div class="mdc-circular-progress__spinner-layer">'+
							'<div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">'+
								'<svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'+
								'<circle cx="24" cy="24" r="18" stroke-dasharray="113.097" stroke-dashoffset="56.549" stroke-width="4"/>'+
								'</svg>'+
							'</div><div class="mdc-circular-progress__gap-patch">'+
								'<svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'+
								'<circle cx="24" cy="24" r="18" stroke-dasharray="113.097" stroke-dashoffset="56.549" stroke-width="3.2"/>'+
								'</svg>'+
							'</div><div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">'+
								'<svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'+
								'<circle cx="24" cy="24" r="18" stroke-dasharray="113.097" stroke-dashoffset="56.549" stroke-width="4"/>'+
								'</svg>'+
							'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'<div>';
		this.progress= mdc.circularProgress.MDCCircularProgress.attachTo(this.html.querySelector('.mdc-circular-progress'));
		this.progress.open();
		this.progress.determinate=false;
	}

// Utils
	closeDialog(){
		var node=document.querySelector(".dialog-full-screen");
		node.parentNode.removeChild(node);
	}

}
