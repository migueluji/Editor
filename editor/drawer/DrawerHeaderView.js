class DrawerHeaderView {

    constructor(gameName) {   
		this.html = document.createElement("div");
		this.html.className +="mdc-drawer__header";
		this.html.innerHTML =
            '<img style="width:100%; padding:24px 0px 8px" src="./images/gamesonomy.png"></img>'+
            '<div class="two-properties">'+	
                   ' <label class="mdc-text-field mdc-text-field--filled">'+
                        '<span class="mdc-text-field__ripple"></span>'+
                        '<input id="gamename" value="'+gameName+'" class="mdc-text-field__input" type="text" aria-labelledby="my-label-id">'+
                        '<span class="mdc-floating-label" id="my-label-id">Game Name</span>'+
                        '<span class="mdc-line-ripple"></span>'+
                    '</label>'+
            '</div>';
            
        var element=this.html.querySelector('.mdc-text-field');
        mdc.textField.MDCTextField.attachTo(element);

        var input =this.html.querySelector("#gamename");
		input.addEventListener("keypress",Utils.keyPressHandler.bind(this,input));
        input.addEventListener("change",this.onChangeInputHandler.bind(this,input));
        
    }

    updateGameName(name){
        var element=this.html.querySelector("#gamename")
        element.value=name;
        element.focus();
    }

// Handlers
	onChangeInputHandler(input){
        this.value=String(input.value).trim();
		if (this.value==="") this.value="Untitled Game";
   		CmdManager.changeGamePropertyCmd("name",this.value);
    }
}

