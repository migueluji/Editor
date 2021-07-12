class History {

    constructor (editor){
        this.undos=[];
        this.redos=[];
        new Command(editor);
    }
    
    execute(cmd){
        this.undos.push(cmd);
        cmd.execute();
        this.redos=[];
//        console.log("history.execute: ",cmd);
    }
    
    undo(){
        var cmd=undefined;
        if(this.undos.length>0){
            cmd=this.undos.pop();
            cmd.undo();
            this.redos.push(cmd);
  //          console.log("history.undo [",this.undos.length,"] ",cmd);
        }
        return cmd;
    }
    
    redo(){
        var cmd=undefined;
        if(this.redos.length>0){
            cmd=this.redos.pop();
            cmd.execute();
            this.undos.push(cmd);
   //         console.log("history.redo [",this.redos.length,"] ",cmd);
        }
        return cmd;
    }

}