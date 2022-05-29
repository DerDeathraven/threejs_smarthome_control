import {Light} from 'light'

export class LightManager{
    constructor(lightJSON){
        this.lightJSON = lightJSON
        this.lights = [];
        this.fillLights();
    }
    fillLights(){
        this.lightJSON.forEach((light)=>{ 
            this.lights.push(new Light(light.id,light.state,light.color,light.position))
        })
    }
    render(object){
        this.lights.forEach(e=>{
            object.add(e.object)
            e.object.position.x = e.position
        })
        console.log(object)
    }
    switchStates(id){
        this.lights.find(x=>x.id === id).changeState()
    }
    getIDs(){
        var buff = []
        this.lights.forEach(e=>{
            buff.push(e.id)
        })
        return buff
    }
}