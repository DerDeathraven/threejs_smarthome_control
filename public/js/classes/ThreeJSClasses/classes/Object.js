import {FileLoader} from "fileLoader"
import {Jlcd} from "jlcdLib"

export class Object {

    /**
     * 
     * @param {String} name name of the object
     * @param {Number} id 
     * @param {Vector3} position 
     * @param {String} file name of the file in Model folder
     */
    constructor(name, id,position,file) {
        this.name = name;
        this.id = id;
        this.position = position;
        this.file = file;
        
        this.jlcd = new Jlcd(this) //Helper class to manage threejs objects
        this.type = "object";
        this.state = false;

        }
        async loadObject(){
        
            var cube = await FileLoader.loadFile(this.file)
       
            
            cube.position.copy(this.position)
            cube.userData.id = this.id
            cube.userData.isDevice = true;
            cube.userData.type = this.type;
            this.object = cube

          

            this.jlcd.setGlobalValue("material.transparent",true)
            
            
            
            return cube;
            
            
        }
        /**
         * 
         * @param {Number | Boolean} state The state of the object
         */
        changeState(state){
            this.state = state;
        }

        /**
         * Events to be fired on mouse Enter
         */
        mouseEnter(){
            this.jlcd.setGlobalValue("material.opacity",0.8)
        
        
        }

        /**
         * Events to be fired on mouse leave
         */
        mouseLeave(){
            this.jlcd.setGlobalValue("material.opacity",0.8)
        }

        /**
         * Events to be fired every frame
         */
        update(){
            
        }
}