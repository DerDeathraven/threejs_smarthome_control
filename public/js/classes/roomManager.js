import {Room} from "room"

export class RoomManager{
    constructor(lightManager,scene,roomJSON = {}) {
        this.lightManager = lightManager;
        this.scene = scene;
        this.roomJSON = roomJSON;
        this.rooms = [];
        this.idCounter = -1;
    }
    addRoom(roomData){
        roomData.id = this.idCounter++;
        var room = new Room(roomData)
        this.rooms.push(room)
        this.scene.add(room.object)
        console.log(this.scene)

    }
    addLightToRoom(rID,lID){
        this.rooms.forEach(r=>{
            if(r.id == rID){
                r.lights.push(lID);
            }
        })
    }
}