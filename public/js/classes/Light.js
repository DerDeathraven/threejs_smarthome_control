import * as THREE from "three"


export class Light{
    constructor(id,state,color,position){
        
        this.id = id;
        this.state = state;
        this.color = color;
        this.position = position;
        this.object = this.generateObject();

    }
    generateObject(){
        const color = this.state ? 0xFFA500 : 0x808080
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( {color: color} );
        const cube = new THREE.Mesh( geometry, material );
        
        return cube;
    }
    changeState(){
        if(this.state){
            this.object.material.color.setHex(0x808080);
        }else{
            this.object.material.color.setHex(0xFFA500) ;
        }
        
        
        this.state = !this.state
    }
}
