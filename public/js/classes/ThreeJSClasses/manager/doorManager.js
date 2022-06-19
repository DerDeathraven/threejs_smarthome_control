import {Door} from "door"

export class DoorManager{
    constructor(scene){
        this.doors = [];
        this.findWord = "door"
        this.idCounter = 0
        this.scene = scene;


    }
    import(data){
        var  me = this
        data.forEach(d=>{
            
            d.id = me.idCounter++
            var door = new Door(d.id,d.name,d.state,d.position)
            me.doors.push(door)
            door.loadObject().then(f=>{
                console.log(door.object)
                this.scene.add(door.object)
                this.interactionManager.add("hover",door)
            })
        })
        
    }
    export(){
        var exportArr = []
        this.doors.forEach((l,i)=>{
            var newLight = {
                id:l.id,
                name:l.name,
                position:l.position,
                state:l.state,
                

            }
            exportArr.push(newLight)
        })
        return exportArr
    }
    add(door){
        var id = this.idCounter++
        door.name = door.name || `door-${id}`
        var newdoor = new door(id,door.name,door.state,door.color,door.position)
        this.doors.push(newdoor)
        newdoor.loadObject().then(f=>{
            console.log("loaded")
            this.scene.add(newdoor.object)
        })
        
        
        newdoor.object.position.copy(door.position)
        return newdoor
    }

    delete(lID){
        var pos
        this.doors.forEach((l,i)=>{
            if(l.id == lID){
                this.scene.remove(l.object)
            }
        })
        this.doors.splice(pos,1)
    }
    switchStates(id,state){
       
        this.doors.find(x=>x.name === id).changeState(state)
    }
    setInteractionManager(interactionManager) {
        this.interactionManager = interactionManager
        
    }
    getIDs(){
        var buff = []
        this.doors.forEach(e=>{
            buff.push(e.id)
        })
        return buff
    }
    getObjectbyID(id){
        var buff
        
        this.doors.forEach(e=>{
            if(e.id === id){
                buff = e
            }
        })

        
        return buff
    }
    update(){
        this.doors.forEach(e=>{
            e.update()
        })
    }
}