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
        var ending ="jpg"
        
        

        const retPromise = new Promise((resolve, reject) =>{
            var path = `models/${file}/${file}.${ending}`;
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
     static  async checkEnding(file){
    

        var myLog = new File(["String"],`models/${file}/${file}.jpg`);

        // See if the file exists
        if(myLog.exists()){
            ending = "jpg"
            return ending
        }else{
            ending = "png"; 
            return ending
        }
       
        
        
       
    }
}