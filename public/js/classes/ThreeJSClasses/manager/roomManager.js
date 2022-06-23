import {Room} from "room"

export class RoomManager{
    constructor(lightManager,scene) {
        this.lightManager = lightManager;
        this.scene = scene;
        this.rooms = [];
        this.findWord = "room"
        this.idCounter = 0;
        this.domElement = this.createDomElement()
    }
    import(data){
        var me = this
        data.forEach(d=>{
            d.id = me.idCounter++
            var newRoom = new Room(d)
            this.rooms.push(newRoom);
            this.scene.add(newRoom.object)
           
        })
    }
    addRoom(roomData){
        roomData.id = this.idCounter++;
        var room = new Room(roomData)
        this.rooms.push(room)
        this.scene.add(room.object)

    }
    addLightToRoom(rID,lID){
        this.rooms.forEach(r=>{
            if(r.id == rID){
                r.lights.push(lID);
            }
        })
    }
    deleteRoom(rID){
        var me = this;
        var pos
        this.rooms.forEach((r,i)=>{
            if(r.id == rID){
                r.lights.forEach(l=>{
                    me.lightManager.deleteLight(l)
                })
                me.scene.remove(r.object)
                pos = i
               
            }
            
        })

        this.rooms.splice(pos,1)
    }
    export(){
        var exportArr = []
        this.rooms.forEach((r,i)=>{
            var newRoom = {
                id:r.id,
                name:r.name,
                position:r.position,
                lights:r.lights,
                scaleX:r.scaleX,
                scaleZ:r.scaleZ,

            }
            exportArr.push(newRoom)
        })
        return exportArr
    }
    setInteractionManager(interactionManager) {
        this.interactionManager = interactionManager
        this.rooms.forEach(room =>{
            this.interactionManager.add("hover",room)
        })
    }
    createDomElement(){
        var me = this
        var container = document.createElement("div")
        $(container).addClass("rooms")
        this.rooms.forEach(r=>{
            var lights = []
            r.lights.forEach(l=>{
                lights.push(me.lightManager.getObjectbyID(l))
            })
            $(container).append(r.createDomElement(lights))
        })
        return container
    }
}