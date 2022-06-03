import * as THREE from "three"

export class UserInputManager{
    constructor(){
        this.mousePosition = new THREE.Vector2();

        this.leftClick = []
        this.startListner()
    }
    startListner(){
        var me = this;
        $(document).on("mousemove",e=>{
            this.mousePosition.x = ( e.clientX / window.innerWidth ) * 2 - 1;
            this.mousePosition.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

            
        })
        $(document).on("mousedown",e=>{
            switch(e.button) {
                case 0:
                    me.executeLeftClick(e)
                    break;
            }
        })
    }
    addClick(button,object){
        switch(button) {
            case "left":
                this.leftClick.push(object)
                break;
        }
    }
    removeClick(button,object){
        switch(button) {
            case "left":
                var pos = this.leftClick.indexOf(object)
                if(pos !== -1){
                    this.leftClick.splice(pos, 1);
                }

                break;
        }
    }
    executeLeftClick(e) {
        this.leftClick.forEach(f=>{
            if(typeof f.leftClick === "function"){
                f.leftClick(e)
            }else{
                throw new Error(`${f.findword} has no left click function defined`)
            }
            
        })
    }
}