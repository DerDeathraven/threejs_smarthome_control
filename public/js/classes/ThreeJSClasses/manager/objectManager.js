
/**
 * 
 */
export class ObjectManager{

    constructor(scene){
        this.scene = scene;
        this.idCounter = 0;
        this.findword = "manager";
        this.objects = [];

    }
     //----------------Start Functions--------------------//

    /**
     * Function to import the Objects 
     * @placeholder
     */
    import(){

    }

    /**
     * Function to export and save the Objects and their properties
     * @returns {Array<Object>} Returns the list of Objects
     */
    export(){
        var exportArr = []
        this.objects.forEach((l,i)=>{
            var newObject = {
                id:l.id,
                name:l.name,
                position:l.position,

            }
            exportArr.push(newObject)
        })
        return exportArr
    }

     //----------------Managment Functions--------------------//

    /**
     * 
     * @param {Vector3} position Postion of placedObject
     */
    placeObject(position){
        
        console.warn("Placement Not Defined for "+this.findword)
        // var id = this.counter++
        //var  name = `${this.findword}-${id}`
        // var newLight = new Light(id,name,false,0xFFFFFF,position)
        // this.objects.push(newLight)
        // newLight.loadObject().then(f=>{
        //    this.scene.add(newLight.object)
        //})
        // return newLight
        
    }

    /**
     * 
     * @param {number} id id of the Object 
     */
    deleteObject(id){
        var pos
        this.objects.forEach((l,i)=>{
            if(l.id == id){
                this.scene.remove(l.object)
            }
        })
        this.objects.splice(pos,1)
    }

    /**
     * Register the InteractionManager which is loaded after the class
     * @param {InteractionManager} interactionManager 
     */
    setInteractionManager(interactionManager) {
        this.interactionManager = interactionManager
        
    }

    /**
     * 
     * @param {number} id ID of Object 
     * @returns 
     */
    getObjectbyID(id){
        var buff
        
        this.objects.forEach(e=>{
            if(e.id === id){
                buff = e
            }
        })

        
        return buff
    }

    //----------------Runtime Functions--------------------//

    /**
     * Switch state of the Give Object
     * @param {String} name Name of the Object 
     * @param {Number | Boolean} state  
     */
    switchStates(name,state){
       
        this.objects.find(x=>x.name === name).changeState(state)
    }

    /**
     * Event execuded every frame 
     */
    update(){
        this.objects.forEach(e=>{
            e.update()
        })
    }
}