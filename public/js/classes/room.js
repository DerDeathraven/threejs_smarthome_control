import * as THREE from "three"

export class Room{
    constructor(roomData){
        this.id = roomData.id;
        this.name = roomData.name;
        this.position = roomData.position;
        this.lights  = []
        this.scaleX = roomData.scaleX
        this.scaleZ = roomData.scaleZ
        this.object = this.createObject();
    }
    createObject(){
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        geometry.translate( 0.5, 0.5, 0.5 );
        const material = new THREE.MeshBasicMaterial( {color: 0xFFDBAC} );
        var cube = new THREE.Mesh( geometry, material );
        cube.userData.id =this.id
        cube.position.copy(this.position)
        cube.scale.x = this.scaleX
        cube.scale.z = this.scaleZ
        return cube;
    }
}