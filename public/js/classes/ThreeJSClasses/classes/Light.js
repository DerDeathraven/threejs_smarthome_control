import * as THREE from "three"
import {FileLoader} from "fileLoader"


export class Light{
    constructor(id,name,state,color,position){
        this.type = "light";
        this.id = id;
        this.name = name;
        this.state = state;
        this.color = color;
        this.position = position;
        this.object  = {}
        this.domElement = this.createDomElement()

    }
    async loadObject(){
        
        var cube = await FileLoader.loadFile("redstone-lamp")
        console.log(cube)
        cube.scale.setScalar(0.02) 
        cube.userData.id = this.id
        cube.position.copy(this.position)
        cube.userData.isLamp = true;
        cube.userData.isDevice = true;
        this.object = cube
        this.changeState()
        
        return
        
        
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
            this.object.traverse(function (child) {  
                if (child instanceof THREE.Mesh) {
                    child.material.color.setHex(0x808080)
                    
                }
            });
        }else{
            this.object.traverse(function (child) {  
                if (child instanceof THREE.Mesh) {
                    child.material.color.setHex(0xFFffff)
                    
                }
            });
        }
        
    }
    mouseEnter(){
        console.log("mouseEnter")
        
        
    }
    mouseLeave(){
        
    }
}
