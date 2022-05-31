const socketio = require("socket.io");
const filesystemManager = require("./fileSystemManager")

class SocketManager{
    constructor(server,mqttManager){
        this.mqttManager = mqttManager;
        this.mqttManager.socketManager = this;
        this.io =  socketio(server)
        this.io.on("connection",socket=>{
            console.log("connection established")
        
            socket.on("getSettings",(e,callback)=>{
                callback(filesystemManager.getSettings())
            })
            socket.on("saveSettings",settings=>{
                filesystemManager.saveSettings(settings)
            })
        })
    }
    sendUpdate(group,id,message){
        this.io.emit("update",{group,id,message})
    }
}
module.exports = SocketManager;