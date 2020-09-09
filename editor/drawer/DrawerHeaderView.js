class DrawerHeaderView {

    constructor(gameName) {   
		this.html = document.createElement("div");
        this.html.className +="mdc-drawer__header";
        this.html.style="padding-bottom: 12px;"
		this.html.innerHTML =
            '<img style="width:100%; padding:24px 0px 8px" src="./images/gamesonomy.png"></img>'+
            '<div class="two-properties">'+	
                   ' <label class="mdc-text-field mdc-text-field--filled">'+
                        '<span class="mdc-text-field__ripple"></span>'+
                        '<input id="gamename" value="'+gameName+'" class="mdc-text-field__input" type="text" aria-labelledby="my-label-id">'+
                        '<span class="mdc-floating-label" >Game Name</span>'+
                        '<span class="mdc-line-ripple"></span>'+
                    '</label>'+
            '</div>'+
            '<button style="margin: 24px 18%;" id="addscene" class="mdc-button mdc-button--raised">'+
                '<div class="mdc-button__ripple"></div>'+
                '<i class="material-icons mdc-button__icon" aria-hidden="true">add</i>'+
                '<span class="mdc-button__label">add scene</span>'+
            '</button>';

        this.html.querySelector("#addscene").addEventListener("click",this.addSceneHandler.bind(this));    
        mdc.ripple.MDCRipple.attachTo(this.html.querySelector("#addscene"));
        
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
    addSceneHandler() {
        CmdManager.addSceneCmd(this.html.parentNode.querySelector("#scenes").querySelectorAll("li").length);
    }    

    onChangeInputHandler(input){
        this.value=String(input.value).trim();
		if (this.value==="") this.value="Untitled Game";
   		CmdManager.changeGamePropertyCmd("name",this.value);
    }
}

