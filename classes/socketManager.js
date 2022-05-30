const socketio = require("socket.io");

class SocketManager{
    constructor(server,mqttManager){
        this.mqttManager = mqttManager;
        this.mqttManager.socketManager = this;
        this.io =  socketio(server)
        this.io.on("connection",socket=>{
            console.log("connection established")
        
            socket.on("getLights",(e,callback)=>{
                callback(this.mqttManager.lights)
            })
        })
    }
    sendUpdate(group,id,message){
        this.io.emit("update",{group,id,message})
    }
}
module.exports = SocketManager;