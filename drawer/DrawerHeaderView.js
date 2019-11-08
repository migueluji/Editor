class DrawerHeaderView {

    constructor(gameName) {   
		this.html = document.createElement("div");
		this.html.className +="mdc-drawer__header";
		this.html.innerHTML =
            '<img style="width:100%; padding-top:24px" src="./images/gamesonomy.png"></img>'+
            '<div class="two-properties">'+	
					'<div style="width:75%;position:relative;left:-8px"class="mdc-text-field mdc-ripple-upgraded text-field--start">'+
						'<input id="name"  type="text" value="Untitled Game" style="border-bottom:0px" class="mdc-text-field__input">'+
						'<label class="mdc-floating-label" for="text-field-filled">Game Name</label>'+
						'<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
					'</div>'+	
					'<div style="width:25%;position:relative">'+
	                    '<button id="gameProperties" class="mdc-button mdc-button-upgraded upload-button" style="right:-16px;top:16px">'+
                            '<i class="material-icons mdc-button_icon">settings</i>'+
                        '</button>'+					
                    '</div>'+	
			'</div>';
        var element=this.html.querySelector('.mdc-text-field');
        mdc.textField.MDCTextField.attachTo(element);

        var input =this.html.querySelector("#name");
        input.value=gameName;
		input.addEventListener("keypress",this.keyPressHandler.bind(this));
        input.addEventListener("change",this.onChangeInputHandler.bind(this,input));
        
        this.html.querySelector("#gameProperties").addEventListener("click",this.gamePropertiesHandler.bind(this));
    }

    updateGameName(name){
        var element=this.html.querySelector("#name")
        element.value=name;
        element.focus();
    }

// Handlers
    gamePropertiesHandler(){
        Command.openGamePropertiesCmd();
    }

    keyPressHandler(e){
		var chr = String.fromCharCode(e.which);
		var name=this.html.querySelector("#name").value;
		var filter=" abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		if ((filter.indexOf(chr) < 0) || (name.length >= 15)){
			e.preventDefault();
		}	
		return true;
    }

	onChangeInputHandler(input){
        this.value=String(input.value).trim();
		if (this.value==="") {
            this.value="Untitled Game";
            this.html.querySelector("#name").value=name;
        }
		CmdManager.changeGamePropertyCmd("name",this.value);
    }
}

