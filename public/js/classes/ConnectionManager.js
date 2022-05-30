import {LightManager} from "lightManager"

export class ConnectionManager{
    constructor(object){
        this.socket = io()
        this.managers = []
    }
     init() {
        var me = this
         var ret = new Promise(function(resolve, reject){
            
            me.socket.emit("getLights",true,e=>{ 
                me.managers.push(new LightManager(e))
                resolve()
           
            })
         }).then(e=>{
             me.subscribe()
         })

         return ret
       
    }
    subscribe() {
        var me = this;
        this.socket.on("update", e=>{
            me.managers.forEach(m=>{
                if(m.findWord == e.group){
                    console.log("test")
                    m.switchStates(e.id,e.message)
                }
            })
        })
    }
    getManager(findWord) {
        var buff
        this.managers.forEach(m=>{
            if(m.findWord==findWord){
                console.log("ping")
                buff = m
            }
            
        })
        return buff
    }

}