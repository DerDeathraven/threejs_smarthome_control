import * as THREE from "three"
import {Object} from "object";

export class Room extends Object{
    /**
     * Wrapper für Three.js Object
     * @param {Object} roomData 
     */
    constructor(roomData){
        super(roomData.name,roomData.id,roomData.position,"")
        this.type = "Room";
       
        
       
        this.lights  = roomData.lights || [];
        this.scaleX = roomData.scaleX
        this.scaleZ = roomData.scaleZ
        this.object = this.createObject();
    }

    mouseEnter(){
        this.object.material.color.setHex(0xADD8E6);
    }
    mouseLeave(){
        this.object.material.color.setHex(0xFFDBAC);
    }
    /**
     *  
     * @returns {THREE.Object3D}
     */
    createObject(){
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        geometry.translate( 0.5, 0.5, 0.5 );
        const material = new THREE.MeshBasicMaterial( {color: 0xFFDBAC} );
        var cube = new THREE.Mesh( geometry, material );
        cube.userData.id =this.id
        cube.userData.isRoom = true;
        cube.position.copy(this.position)
        cube.scale.x = this.scaleX
        cube.scale.z = this.scaleZ
        return cube;
    }
    createDomElement(lightsList){
        var container = document.createElement("div")
        var name = document.createElement("div")
        var dataContainer = document.createElement("div")
        var button = document.createElement("div")
        var lights = document.createElement("div")
        
        lightsList.forEach(f=>{
            $(lights).append(f.domElement)
        })
        $(lights).addClass("devices")
        //display the name
        $(name).text(this.name).addClass("roomName")
        
        
        //display the deleteButton
        var deleteButton = document.createElement("div")
        $(deleteButton).addClass("roomDeleteButton").text("X").data("id",this.id)
        $(button).append(deleteButton).addClass("roomButtons")
        //container append 

        $(dataContainer).append(name).append(button).addClass("roomHeader")
        $(container).append(dataContainer).append(lights).attr("id",this.name).addClass("room")

        return container

    }
}