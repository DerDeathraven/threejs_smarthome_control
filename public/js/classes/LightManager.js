import {Light} from 'light'

export class LightManager{
    constructor(lightJSON) {
        this.lightJSON = lightJSON
        this.lights = [];
        this.findWord = "light"
        this.fillLights();
        this.idCounter = 0
    }
    fillLights(){
        this.lightJSON.forEach((light)=>{ 
            this.lights.push(new Light(this.idCounter++, light.id,light.state,light.color,light.position))
        })
    }
    render(object){
        this.scene = object
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
    getLightbyID(id){
        var buff
        this.lights.forEach(e=>{
            if(e.id === id){
                buff = e
            }
        })
        return buff
    }
    addLight(light){
        var id = this.idCounter++
        light.name = light.name || `light#${id}`
        var newLight = new Light(id,light.name,light.state,light.color,light.position)
        this.lights.push(newLight)
        this.scene.add(newLight.object)
        console.log(light.position)
        newLight.object.position.copy(light.position)
        return newLight
    }
    deleteLight(lID){
        var pos
        this.lights.forEach((l,i)=>{
            if(l.id == lID){
                this.scene.remove(l.object)
            }
        })
        this.lights.splice(pos,1)
    }
}