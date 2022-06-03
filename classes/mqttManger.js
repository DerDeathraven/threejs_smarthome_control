const mqtt = require('mqtt');
const filesystemManager = require("./fileSystemManager")


class MqttManager{
    constructor(){
        this.client = mqtt.connect("mqtt://localhost:1883")
        this.lights = filesystemManager.getLights()
        this.client.on("connect",e=>{
            console.log("Connected to MQTT")
        })
        this.subscribe()
        this.handleMessages()
        
    }

    subscribe(){
        var me = this
        this.lights.forEach(e=>{
            me.client.subscribe(`light/${e.name}`)
        })
    }
    unsubscribe(){
        var me = this
        this.lights.forEach(e=>{
            me.client.unsubscribe(`light/${e.name}`)
        })
    }
    resubscribe(){
        var me = this
        this.lights.forEach(e=>{
            me.client.unsubscribe(`light/${e.name}`)
        })
        this.lights.forEach(e=>{
            me.client.subscribe(`light/${e.name}`)
        })
    }
    handleMessages(){
        this.client.on("message",(t,m)=>{
            if(t.includes("/")){
            m = JSON.parse(m.toString())

            var splitedArr = t.split("/")

            this.socketManager.sendUpdate(splitedArr[0], splitedArr[1],m)
            }
        })
    }
    registerDevice(deviceID){
        var device = {id:deviceID}
        this.lights.push(device)
        this.resubscribe()
    }
    switchStateOfDevice(deviceID){
        this.client.publish(`switch/${deviceID}`)
        console.log(`Switching ${deviceID}`)
    }
}
module.exports = MqttManager
