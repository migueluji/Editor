class FieldView  {

    constructor(key,value) {  
		this.html = document.createElement("div");
		this.html.className +="mdc-text-field mdc-ripple-upgraded text-field--full";
		this.html.innerHTML =
			'<input id="" type="text" value="" class="mdc-text-field__input">'+
			'<label class="mdc-floating-label">Key</label>'+
			'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>';
		this.html.querySelector("input").value=value;
		this.html.querySelector("label").textContent=key.replace("_"," ");	
		this.html.querySelector("input").id=key;		
	}
}
