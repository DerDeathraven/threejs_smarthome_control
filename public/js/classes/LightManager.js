import {Light} from 'light'

export class LightManager{
    constructor(lightJSON) {
        this.lightJSON = lightJSON
        this.lights = [];
        this.findWord = "light"
        this.fillLights();
    }
    fillLights(){
        this.lightJSON.forEach((light)=>{ 
            this.lights.push(new Light(light.id,light.state,light.color,light.position))
        })
    }
    render(object){
        this.object = object
        this.lights.forEach(e=>{
            object.add(e.object)
            e.object.position.x = e.position
        })
    }
    switchStates(id,state){
        this.lights.find(x=>x.id === id).changeState(state)
    }
    getIDs(){
        var buff = []
        this.lights.forEach(e=>{
            buff.push(e.id)
        })
        return buff
    }
    addLight(light){
        var newLight = new Light(light.id,light.state,light.color,light.position)
        this.lights.push(newLight)
        this.object.add(newLight.object)
        console.log(light.position)
        newLight.object.position.copy(light.position)
        return newLight
    }
}