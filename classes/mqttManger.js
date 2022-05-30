const mqtt = require('mqtt');


class MqttManager{
    constructor(){
        this.client = mqtt.connect("mqtt://localhost:1883")
        this.client.on("connect",e=>{
          this.client.publish("json","true")
          this.client.subscribe("json")
          
        })
        this.client.on("message",(t,m)=>{
            if(t == "json" && m!= "true"){
                this.lights = JSON.parse(m.toString())
                this.subscribe()
            }
            console.log(this.lights)
        })
    }
    subscribe(){
        var me = this
        console.log(me.lights)
        this.lights.forEach(e=>{
            me.client.subscribe(`light/${e.id}`)
        })
        this.handleMessages()
    }
    handleMessages(){
        this.client.on("message",(t,m)=>{
            if(t.includes("/")){
            m = JSON.parse(m.toString())
            console.log(m)
            var splitedArr = t.split("/")

            this.socketManager.sendUpdate(splitedArr[0], splitedArr[1],m)
            }
        })
    }
}
module.exports = MqttManager
