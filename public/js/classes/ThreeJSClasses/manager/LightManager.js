import {Light} from 'light'
import { ObjectManager } from 'objectManager';

export class LightManager extends ObjectManager{
    constructor(scene) {
        super(scene)
        this.findWord = "light"
       
      
    }

    import(data){
        var  me = this
        data.forEach(d=>{
            d.id = me.idCounter++
            var light = new Light(d.id,d.name,d.state,d.color,d.position)
            me.objects.push(light)
            light.loadObject().then(f=>{
                
                this.scene.add(light.object)
                this.interactionManager.add("hover",light)
            })
        })
        
    }

    /**
     * @override
     * @returns {Array.<Object>}
     */
    export(){
        var exportArr = []
        this.objects.forEach((l,i)=>{
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
    
    
    getIDs(){
        var buff = []
        this.objects.forEach(e=>{
            buff.push(e.id)
        })
        return buff
    }
   
   
    placeObject(position){
        var id = this.counter++
        var  name = `light-${id}`
        var newLight = new Light(id,name,false,0xFFFFFF,position)
        this.objects.push(newLight)
        newLight.loadObject().then(f=>{
            this.scene.add(newLight.object)
        })
        return newLight
        
    }
   
    
}