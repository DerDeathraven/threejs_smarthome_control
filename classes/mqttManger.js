const mqtt = require('mqtt');
const yargs = require('yargs');
const filesystemManager = require("./fileSystemManager")
//Arguments for this Module
yargs.option("mqttHost",{
    alias: "h",
    description: "mqtt Host adress",
    type: "string"
})
.option("mqttPort",{
    description: "mqtt Port number",
    alias: "p",
    type: "number"
})

class MqttManager{
    constructor(){
        this.hostname = yargs.argv.mqttHost || "localhost";
        this.port = yargs.argv.mqttPort || 1883;
        
        this.client = mqtt.connect(`mqtt://${this.hostname}:${this.port}`)
        this.lights = filesystemManager.getLights()
        this.client.on("connect",e=>{
            console.log("Connected to MQTT")
        })
        this.subscribe()
        this.handleMessages()
        
    }

    subscribe(){
        
        this.client.subscribe("light/#")
    }
    unsubscribe(){
        
        
            this.client.unsubscribe(`light/#`)
        
    }
    resubscribe(){
       this.unsubscribe()
       this.subscribe()
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
