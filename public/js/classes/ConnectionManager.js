import {LightManager} from "lightManager"

export class ConnectionManager{
    constructor(managers){
        this.socket = io()
        this.managers = managers
    }
     init() {
        var me = this
         var ret = new Promise(function(resolve, reject){ 
            me.socket.emit("getSettings",true,e=>{ 
                Object.keys(e).forEach(k=>{
                    this.managers.forEach(m=>{
                        if(m.findWord==k){
                            m.update(e[k])
                        }
                    })
                })
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
    exportSettings(){
        var exportJSON = {}

        this.managers.forEach(m=>{
            exportJSON[m.findWord] = m.export()
        })
        this.socket.emit("saveSettings", exportJSON)
    }
}