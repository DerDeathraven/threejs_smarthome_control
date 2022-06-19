import * as THREE from "three"


export class DeviceToggleManager{
    constructor(scene,camera,userInputManager,connectionManager){
        this.scene = scene;
        this.camera = camera;


        //managers to comunicate
        this.connectionManager = connectionManager;
        this.userInputManager = userInputManager;

        this.observe = false
        this.raycaster = new THREE.Raycaster();
        
    }

    startOverwatch(){
        this.observe = true;
        this.userInputManager.addClick("left",this)
    }
    endOverwatch(){
        this.observe = false;
        this.userInputManager.removeClick("left",this)

    }
    leftClick(e){
        this.raycaster.setFromCamera( this.userInputManager.mousePosition, this.camera );
        var intersects = this.raycaster.intersectObjects( this.scene.children );
        if(intersects.length > 0){
            var target = intersects[0];
            if(target.object.parent.type ==="Group")target.object = target.object.parent
            if(target.object.userData.isDevice){
              this.connectionManager.switchStateOfDevice(`${target.object.userData.type}-${target.object.userData.id}`)
            }
        }

    }


   
}