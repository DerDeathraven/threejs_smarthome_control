import {Light} from 'light'

export class LightManager{
    constructor(scene) {
        this.lights = [];
        this.findWord = "light"
        this.idCounter = 0
        this.scene = scene;
    }

    import(data){
        var  me = this
        data.forEach(d=>{
            d.id = me.idCounter++
            var light = new Light(d.id,d.name,d.state,d.color,d.position)
            me.lights.push(light)
            light.loadObject().then(f=>{
                
                this.scene.add(light.object)
                this.interactionManager.add("hover",light)
            })
        })
        
    }
    
    switchStates(id,state){
       
        this.lights.find(x=>x.name === id).changeState(state)
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
        light.name = light.name || `light-${id}`
        var newLight = new Light(id,light.name,light.state,light.color,light.position)
        this.lights.push(newLight)
        newLight.loadObject().then(f=>{
            console.log("loaded")
            this.scene.add(newLight.object)
        })
        
        console.log(light.position)
        newLight.object.position.copy(light.position)
        return newLight
    }
    placeObject(position){
        var id = this.counter++
        var  name = `light-${id}`
        var newLight = new Light(id,name,false,0xFFFFFF,position)
        this.lights.push(newLight)
        newLight.loadObject().then(f=>{
            this.scene.add(newLight.object)
        })
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
    export(){
        var exportArr = []
        this.lights.forEach((l,i)=>{
            var newLight = {
                id:l.id,
                name:l.name,
                position:l.position,
                state:l.state,
                color:l.color

            }
            exportArr.push(newLight)
        })
        return exportArr
    }
    setInteractionManager(interactionManager) {
        this.interactionManager = interactionManager
        
    }
}