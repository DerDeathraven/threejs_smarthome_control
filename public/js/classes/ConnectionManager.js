import {LightManager} from "lightManager"

export class ConnectionManager{
    constructor(object){
        this.socket = io()
    }
     init() {
        var me = this
         var ret = new Promise(function(resolve, reject){
            
            me.socket.emit("getLights",true,e=>{ 
                me.lightManager =  new LightManager(e)
                resolve()
           
            })
         }).then(e=>{
             me.subscribe()
         })

         return ret
       
    }
    subscribe() {
        var me = this
        var idArr = this.lightManager.getIDs()
        idArr.forEach(e=>{
            this.socket.on(`light_${e}`,f=>{
                this.lightManager.lights.find(x=>x.id === e).switchStates()
            })
        })
    }

}