class DrawerHeaderView {

    constructor(gameName) {   
		this.html = document.createElement("div");
		this.html.className +="mdc-drawer__header";
		this.html.innerHTML =
            '<img style="width:100%; padding-top:24px; margin-bottom:-16px" src="./images/gamesonomy.png"></img>'+
            '<h6 class="mdc-drawer__subtitle"></h6>'+
            '<div class="mdc-text-field mdc-text-field--with-trailing-icon mdc-ripple-upgraded text-field--full">'+
            '<input id="name" type="text" value="value" class="mdc-text-field__input">'+ //sound file
                '<label class="mdc-floating-label" for="text-field-filled">Game Name</label>'+
                '<button id="gameProperties" class="mdc-button mdc-button-upgraded upload-button" style="top:10px">'+
                    '<i class="material-icons mdc-button_icon">settings</i>'+
                '</button>'+
            '<div class="mdc-line-ripple" style="transform-ori	gin: 50.5px center 0px;"></div>'+
            '</div>'+
            '<h6 class="mdc-drawer__subtitle"></h6>';
        var element=this.html.querySelector('.mdc-text-field');
        mdc.textField.MDCTextField.attachTo(element);

        var input =this.html.querySelector("#name");
        input.value=gameName;
		input.addEventListener("keypress",this.keyPressHandler.bind(this));
        input.addEventListener("change",this.onChangeInputHandler.bind(this,input));
        
        this.html.querySelector("#gameProperties").addEventListener("click",this.gamePropertiesHandler.bind(this));
    }

    updateGameName(name){
        this.html.querySelector("#name").value=name;
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

