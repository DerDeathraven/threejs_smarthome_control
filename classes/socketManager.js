const socketio = require("socket.io");
const filesystemManager = require("./fileSystemManager")

class SocketManager{
    constructor(server,mqttManager){
        this.mqttManager = mqttManager;
        this.mqttManager.socketManager = this;
        this.io =  socketio(server)

        var me = this;
        this.io.on("connection",socket=>{
            console.log("Connected to Client")
        
            socket.on("getSettings",(e,callback)=>{
                callback(filesystemManager.getSettings())
            })
            socket.on("saveSettings",settings=>{
                filesystemManager.saveSettings(settings)
            })
            socket.on("newDevice",deviceID=>{
                me.mqttManager.registerDevice(deviceID)
            })
            socket.on("switchStateOfDevice",deviceID=>{
                me.mqttManager.switchStateOfDevice(deviceID)
            })
        })
    }
    sendUpdate(group,id,message){
        this.io.emit("update",{group,id,message})
    }

}
module.exports = SocketManager;