import * as THREE from "three"

export class PlaceModeManager{
    constructor(scene,camera){
        this.scene = scene;
        this.camera = camera
        this.placeModeObjects = []
        this.placedObjects = []
        this.placing = false;

        this.mousePosition = new THREE.Vector2();
        this.startingCords = new THREE.Vector3(0,0,0)
        this.lastCords = new THREE.Vector3();
        this.raycaster = new THREE.Raycaster();

        this.isInDiv = false


    }
    startPlaceMode(){
        this.setListners()
        
    }
    endPlaceMode(){
        this.endListners()
    }
    setListners(){
        $(document).on('mousemove',e=>{
            this.mousePosition.x = ( e.clientX / window.innerWidth ) * 2 - 1;
            this.mousePosition.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
        })
        $(document).on("mousedown",e=>{
            if(!this.isInDiv){
                if(e.button === 0){
                
                this.placing = !this.placing
                console.log(this.placing)
                if(this.placing){
                this.raycaster.setFromCamera( this.mousePosition, this.camera );
                const intersects = this.raycaster.intersectObjects( this.scene.children )[0];
                this.startingCords.z = Math.floor(intersects.point.z)
                this.startingCords.x = Math.floor(intersects.point.x)

                this.lastCords.set(this.startingCords)
                this.createPreviewCube()
                }else{
                    this.addPlate()
                    this.updateList()
                    this.scene.remove(this.previewCube)
                    this.startingCords = new THREE.Vector3()
                }
            }
        }
        })
        $(".placeMode").on("mouseenter",e=>{
            this.isInDiv = true
        })
        $(".placeMode").on("mouseleave",e=>{
            this.isInDiv = false
        })
    }
    endListners(){
        $(document).off()
        $(".placeMode").off()
    }
    update(){
       if(this.placing){
        this.raycaster.setFromCamera( this.mousePosition, this.camera );
        
        var intersects = this.raycaster.intersectObjects( this.scene.children );
        if(intersects[0].userData){
            intersects = intersects[1]
        }else{
            intersects = intersects[0]
        }

        var roundedX = Math.floor(intersects.point.x)
        var roundedY = Math.floor(intersects.point.z)

        if(roundedY!=this.lastCords.z || roundedX!=this.lastCords.x){
            this.previewCube.scale.x =roundedX - this.startingCords.x
            console.log(this.startingCords.x)
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
    addPlate(){
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        geometry.translate( 0.5, 0.5, 0.5 );
        const material = new THREE.MeshBasicMaterial( {color: 0x808080} );
        var cube = new THREE.Mesh( geometry, material );
        cube.userData.name =`cube#${this.placedObjects.length}`
        this.placedObjects.push(cube)
        this.scene.add( cube );
        cube.position.x = this.startingCords.x;
        cube.position.z = this.startingCords.z;
        cube.scale.x = this.lastCords.x -this.startingCords.x
        cube.scale.z = this.lastCords.z - this.startingCords.z
    }
    updateList(){
        var me = this
        var container = document.createElement("div")
        this.placedObjects.forEach(o=>{
            $(container).append(me.createDiv(o))
        })
        $(".objectList").html("")
        $(".objectList").append(container)
    }
    createDiv(o){
        var container = document.createElement("div")
        var name = document.createElement("div")
        var button = document.createElement("div")

        //name content
        $(name).text(o.userData.name).addClass("objectName")
        
        
        //button content
        var deleteButton = document.createElement("div")
        $(deleteButton).addClass("objectDeleteButton").text("X")
        $(button).append(deleteButton).addClass("objectButtons")
        //container append 

        $(container).append(name).append(button).addClass("object")

        return container


    }

}