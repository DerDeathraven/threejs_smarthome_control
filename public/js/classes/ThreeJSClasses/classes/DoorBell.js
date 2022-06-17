class DoorBell{
    constructor(id,name,state,position){
        this.type = "doorbell"
        this.id = id;
        this.name = name;
        this.state = state;
        this.position = position;
    }
    generateObject(){
        const color = this.state ? 0xFFA500 : 0x808080;
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( {color: color,transparent: true} );
        const cube = new THREE.Mesh( geometry, material );
        cube.userData.id = this.id
        cube.position.copy(this.position)
        cube.userData.isDoorBell= true;
        cube.userData.isDevice = true;
        
        return cube;
    }
    changeState(state){
        this.state = state;
        if(!this.state){
            this.object.material.color.setHex(0x808080);
        }else{
            this.object.material.color.setHex(0xFFA500) ;
        }
    }
    mouseEnter(){
        this.object.material.opacity = 0.8
    }
    mouseLeave(){
        this.object.material.opacity = 1
    }

    
}