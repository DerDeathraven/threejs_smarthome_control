
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
    import(){

    }
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
    deleteObject(id){
        var pos
        this.objects.forEach((l,i)=>{
            if(l.id == id){
                this.scene.remove(l.object)
            }
        })
        this.objects.splice(pos,1)
    }

   
    setInteractionManager(interactionManager) {
        this.interactionManager = interactionManager
        
    }

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
    switchStates(name,state){
       
        this.objects.find(x=>x.name === name).changeState(state)
    }
    update(){

    }
}