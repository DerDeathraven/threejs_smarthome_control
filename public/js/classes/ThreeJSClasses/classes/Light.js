import * as THREE from "three"


export class Light{
    constructor(id,name,state,color,position){
        this.type = "light";
        this.id = id;
        this.name = name;
        this.state = state;
        this.color = color;
        this.position = position;
        this.object = this.generateObject();
        this.domElement = this.createDomElement()

    }
    generateObject(){
        const color = this.state ? 0xFFA500 : 0x808080;
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( {color: color,transparent: true} );
        const cube = new THREE.Mesh( geometry, material );
        cube.userData.id = this.id
        cube.position.copy(this.position)
        cube.userData.isLamp = true;
        cube.userData.isDevice = true;
        
        return cube;
    }
    createDomElement(){
        var container = document.createElement("div")
        var name = document.createElement("div")
        var button = document.createElement("div")

        //name content
        $(name).text(this.name).addClass("deviceName")
        
        
        //button content
        var deleteButton = document.createElement("div")
        $(deleteButton).addClass("deviceDeleteButton").text("X").data("id",this.id)
        $(button).append(deleteButton).addClass("deviceButtons")
        //container append 

        $(container).append(name).append(button).addClass("device")
        return container
        
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
