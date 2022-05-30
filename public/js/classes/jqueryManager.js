export class JqueryManager{
    constructor(ssm){
        this.ssm = ssm;
        this.setBasicTriggers();
        this.updateHud()
    }
    setBasicTriggers(){
        var me = this
        $(".changeMode").on("click",e=>{
            me.ssm.changeMode()
        })
    
    }
    updateHud(){
        if(this.ssm.isPlaceMode){
            $(".placeMode").show()
        }else{
            $(".placeMode").hide()
        }
    }
}


