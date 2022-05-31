import {Room} from "room"

export class RoomManager{
    constructor(lightManager,scene,roomJSON = {}) {
        this.lightManager = lightManager;
        this.scene = scene;
        this.roomJSON = roomJSON;
        this.rooms = [];
        this.idCounter = 0;
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
               
            }
            me.scene.remove(r.object)
            pos = i
        })
        this.rooms.splice(pos,1)
    }
}