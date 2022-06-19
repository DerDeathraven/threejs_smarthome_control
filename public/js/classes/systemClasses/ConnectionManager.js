

export class ConnectionManager{
    /**
     * Handle the comunication between the server and the  client
     * @param {Array} managers Array of ObjectManagers 
     */
    constructor(managers){
        this.socket = io()
        this.managers = managers
    }

    /**
     * Import settings for all Managers
     * @returns {Promise} Promise of importing Settings
     */
     init() {
        var me = this
         var ret = new Promise(function(resolve, reject){ 
            me.socket.emit("getSettings",true,e=>{ 
                Object.keys(e).forEach(k=>{
                    me.managers.forEach(m=>{
                        if(m.findWord==k){
                       
                            m.import(e[k])
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
    /**
     * Initate Listners to switch states of Objects 
     */
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
    /**
     * Get Manager out of the Array
     * @param {String} findWord 
     * @returns Manager
     */
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
    /**
     * Build the export json file
     */
    exportSettings(){
        var exportJSON = {}

        this.managers.forEach(m=>{
            exportJSON[m.findWord] = m.export()
        })
        this.socket.emit("saveSettings", exportJSON)
    }
    /**
     * When the user adds a new Device. set up listner for this one
     * @param {String} deviceID 
     */
    registerDevice(deviceID){
        console.log(deviceID)
        this.socket.emit("newDevice", deviceID)
    }

    /**
     * Send request to server to switch the state of a lamp
     * @param {String} deviceID ID of Device
     */
    switchStateOfDevice(deviceID){
        this.socket.emit("switchStateOfDevice", deviceID)
        
    }
    update(){
        this.managers.forEach(f=>{

            if(f.update != undefined){
                f.update()
            }
            
        })
    }
}