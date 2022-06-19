import * as THREE from "three";


/**
 * A Helper class that provides methods for managing my other Classes and Threejs
 */
export class Jlcd{

    /**
     * 
     * @param {Object} selector the Object that this Manages
     */
    constructor(selector){
        this.selector = selector;
    }

    /**
     * sets the color of all meshes
     * @param {number} color 
     */
    setColor(color){
        
        this.selector.object.traverse(function (child) {  
            if (child instanceof THREE.Mesh) {
                child.material.color.setHex(color)
                
            }
        });
    }
    setGlobalValue(path,value){
       

        this.selector.object.traverse( (child)=> {  
            if (child instanceof THREE.Mesh) {
                this.setValue(path,value,child)
            }
        });
        
    }
    findProperty(path,obj){

        var buff = path.split('.').reduce(function(prev, curr) {
            var buffer = prev ? prev[curr] : null

            if(typeof buffer != typeof "object" ){
                
                return prev
            }
            
            return buffer
        }, obj || self)

       
        
        return buff
    }
    setValue(path,value,obj){
        var i;
        path = path.split('.');
        for (i = 0; i < path.length - 1; i++)
            obj = obj[path[i]];

         obj[path[i]] = value;
    }
}