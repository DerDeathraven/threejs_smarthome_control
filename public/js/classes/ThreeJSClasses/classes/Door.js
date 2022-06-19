import * as THREE from "three"
import {FileLoader} from "fileLoader"
import {Object} from "object"

export class Door extends Object{

    /**
     * This adds support for custom door bells
     * @param {number} id  
     * @param {String} name 
     * @param {number} state 
     * @param {Vector3} position 
     */
    constructor(id,name,state,position,file = "door"){
        super(name,id,position,file)

        this.type = "door"
        this.state = state;
        
        this.counter = 0
    }
    async loadObject(){
        
        var object = await super.loadObject()
        object.scale.setScalar(0.5) 
        this.object = object
        //this.changeState()
        
        return
        
        
    }
    changeState(state){
        state =  parseInt(state)
        this.state = state;

        switch(state){
            case 0:
                this.jlcd.setColor(0xFFffff)
                
            break;
            case 1:
                this.jlcd.setColor(0x808080)
                
            break;

        }
       
    }
    mouseEnter(){
        

        this.object.traverse(function (child) {  
            if (child instanceof THREE.Mesh) {
                child.material.opacity = 0.3
                
            }
        });
    }
    mouseLeave(){
        this.object.traverse(function (child) {  
            if (child instanceof THREE.Mesh) {
                child.material.opacity = 1
                
            }
        });
    }
    update(){
       
        this.counter++ 
        if(this.state == 2){
           
            if((this.counter) % 60 < 30){
                this.object.traverse(function (child) {  
                    if (child instanceof THREE.Mesh) {
                        child.material.color.setHex(0xFF0000)
                        
                    }
                });
            }
            if(this.counter % 60 > 30){
                this.object.traverse(function (child) {  
                    if (child instanceof THREE.Mesh) {
                        child.material.color.setHex(0xFFFFFF)
                        
                    }
                });
            }
        }
    }

    
}