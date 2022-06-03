class DeviceToggleManager{
    constructor(scene,camera,lightManager){
        this.scene = scene;
        this.camera = camera;


        this.lightManager = lightManager;
        this.userDataManager = userDataManager;

        this.observe = false
        this.raycaster = new THREE.Raycaster();
        
    }

    startOverwatch(){
        this.observe = true;
    }
    endOverwatch(){
        this.observe = false;

    }
    click(e){
        
    }


   
}