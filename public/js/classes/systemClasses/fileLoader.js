import {OBJLoader}  from 'obj';
import * as THREE from "three"

export class FileLoader{
    
    static async loadFile(file){
        var texture = await this.loadTextures(file)
        

         var retPromise = new Promise((resolve, reject) =>{
            var path = `models/${file}/${file}.obj`
            const loader = new OBJLoader();
            


            loader.load(
                path,
                function (object){
                    object.traverse(function (child) {  
                        console.log(child) // aka setTexture
                        if (child instanceof THREE.Mesh) {
                            child.material.map = texture;
                        }
                    });
                    resolve(object);
                 },
                 function(xhr){
                    
                 },
                 function(err){
                     reject(err)
                 }
        )
        })
        return retPromise
        
        
        
    }
    static async loadTextures(file){
        const retPromise = new Promise((resolve, reject) =>{
            var path = `models/${file}/${file}.jpg`
            const loader = new THREE.TextureLoader();


            loader.load(
                path,
                function (object){
                    resolve(object);
                 },
                 function(xhr){
                    
                 },
                 function(err){
                     reject(err)
                 }
        )
        })
        return retPromise
    }
}