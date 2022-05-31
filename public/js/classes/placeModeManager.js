import * as THREE from "three"
import {HoverManager} from "hoverManager"

export class PlaceModeManager{
    constructor(scene,camera,lightManager,roomManager){

        //Global Objects
        this.scene = scene;
        this.camera = camera
        this.lightManager = lightManager
        this.roomManager = roomManager
        this.hoverManager = new HoverManager(scene, camera, lightManager)

        //Managment Arrays
        this.placeModeObjects = []
        this.placedObjects = []
        this.placedRooms = []
        this.placedLamps = []

        //state machine booleans
        this.placing = false;
        this.placeLamp = false;
        this.isInDiv = false

        //various vectors
        this.mousePosition = new THREE.Vector2(); //Postion of cursor
        this.startingCords = new THREE.Vector3(0,0,0)//starting cords of the room
        this.lastCords = new THREE.Vector3(); //last know cords of the room

        //reusable raycaster
        this.raycaster = new THREE.Raycaster();

        


    }
    startPlaceMode(){
        this.setListners()
        
    }
    endPlaceMode(){
        this.endListners()
    }
    setListners(){
        var me = this;
        $(document).on('mousemove',e=>{
            this.mousePosition.x = ( e.clientX / window.innerWidth ) * 2 - 1;
            this.mousePosition.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
        })
        $(document).on("mousedown",e=>{
            
            if(!this.isInDiv && e.button === 0){
                if(!this.placeLamp){
                    this.placeRoomPreview()
                }else{
                    this.placeLampHere()
                }

        }
        })
        $(".menuItem").on("mouseenter",e=>{
            this.isInDiv = true
        })
        $(".menuItem").on("mouseleave",e=>{
            this.isInDiv = false
        })
        $(".selector").on("click",e=>{
            var data = $(e.target).data("id")
            switch(data){
                case 0:
                    me.placeLamp = false;
                    break;
                case 1:
                    me.placeLamp = true;
                    break;
                
            }
        })
    }
    endListners(){
        $(document).off("mousemove")
        $(document).off("mousedown")
        $(".placeMode").off()
        this.placing = false
    }
    update(){
        this.raycaster.setFromCamera( this.mousePosition, this.camera );
        
        var intersects = this.raycaster.intersectObjects( this.scene.children );
        this.hoverManager.update(intersects)
       if(this.placing){
        if(intersects[0].userData){
            intersects = intersects[1]
        }else{
            intersects = intersects[0]
        }

        var roundedX = Math.floor(intersects.point.x)
        var roundedY = Math.floor(intersects.point.z)

        if(roundedY!=this.lastCords.z || roundedX!=this.lastCords.x){
            this.previewCube.scale.x =roundedX - this.startingCords.x
            this.previewCube.scale.z = roundedY - this.startingCords.z

        }
        this.lastCords.x = roundedX
        this.lastCords.z = roundedY
        

       }
       


    }

    createPreviewCube(){
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        geometry.translate( 0.5, 0.5, 0.5 );
        const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        this.previewCube = new THREE.Mesh( geometry, material );

        this.previewCube.userData = true
        this.scene.add( this.previewCube );
        this.previewCube.position.x = this.startingCords.x
        this.previewCube.position.z = this.startingCords.z
    }
    addRoom(){
        var roomData = {
            name: `Room${this.roomManager.idCounter}`,
            position: new THREE.Vector3().copy(this.startingCords),
            scaleX: this.lastCords.x -this.startingCords.x,
            scaleZ: this.lastCords.z - this.startingCords.z
        }
        this.roomManager.addRoom(roomData)
    
    }
    updateList(){
        $(".objectDeleteButton").off()
        var me = this
        var container = document.createElement("div")
        this.roomManager.rooms.forEach(r=>{
            $(container).append(me.createDiv(r))
        })
        $(".objectList").html(" ")
        $(".objectList").append(container)
        $(".objectDeleteButton").on("click",e=>{
            var id = $(e.target).data("id")
            me.roomManager.deleteRoom(id)
            me.updateList()
        })
    }
    createDiv(o){
        var container = document.createElement("div")
        var name = document.createElement("div")
        var button = document.createElement("div")

        //name content
        $(name).text(o.name).addClass("objectName")
        
        
        //button content
        var deleteButton = document.createElement("div")
        $(deleteButton).addClass("objectDeleteButton").text("X").data("id",o.id)
        $(button).append(deleteButton).addClass("objectButtons")
        //container append 

        $(container).append(name).append(button).addClass("object")

        return container


    }
    placeRoomPreview(){
        this.placing = !this.placing
                if(this.placing){
                this.raycaster.setFromCamera( this.mousePosition, this.camera );
                const intersects = this.raycaster.intersectObjects( this.scene.children )[0];
                this.startingCords.z = Math.floor(intersects.point.z)
                this.startingCords.x = Math.floor(intersects.point.x)

                this.lastCords.set(this.startingCords)
                this.createPreviewCube()
                }else{
                    this.addRoom()
                    this.updateList()
                    this.scene.remove(this.previewCube)
                    this.startingCords = new THREE.Vector3()
                }
    }
    placeLampHere(){
        
            this.raycaster.setFromCamera( this.mousePosition, this.camera );
            const intersects = this.raycaster.intersectObjects( this.scene.children );
            if(intersects[0].object.userData.isLamp){
                this.hoverManager.click(intersects)
            } else{
                if(intersects[0].object.userData.isRoom !== true)return
                var rID= intersects[0].object.userData.id //room ID

                const cordX = Math.floor(intersects[0].point.x)
                const cordZ = Math.floor(intersects[0].point.z)

                var light = {
                    state: false,
                    color: 0xFFFFFF,
                    position: new THREE.Vector3(cordX,2,cordZ),
                }
                var placedLamp = this.lightManager.addLight(light)
                placedLamp.object.userData.listPlace = this.placedLamps.length
                this.roomManager.addLightToRoom(rID, placedLamp.id)
                console.log(this.placedLamps)
                this.placedLamps.push(placedLamp)
        }
    }

}