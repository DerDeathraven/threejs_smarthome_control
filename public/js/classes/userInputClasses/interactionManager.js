import * as THREE from "three"
/**
 * This Manager is responsible for mouse events
 */
export class InteractionManager{
    constructor(scene,camera,userInputManager,displayManager){
        this.scene = scene;
        this.camera = camera;
        this.userInputManager = userInputManager;
        this.displayManager = displayManager;

        this.mouseEnter = []
        this.mouseLeave = []
        this.click = []


        this.subscribedUuids = []

        this.lastObject = undefined;
        this.interactions = 0;

        this.raycaster = new THREE.Raycaster();
        
    }
    /**
     * Add a subscriber
     * @param {String} variant 
     * @param {Object} object 
     * 
     */
    add(variant,object){
        switch(variant){
            case "hover":
                
                this.mouseEnter = [...this.mouseEnter,object]
                this.mouseLeave = [...this.mouseLeave,object] //ES6 trial,
                break;
            case "mouseenter":
                this.mouseEnter = [...this.mouseEnter,object]
                break;
            case "mouseleave":
                this.mouseLeave = [...this.mouseLeave,object]
                break;
            case "click":
                this.click = [...this.click,object]
                break;
        }
        this.generateSubscribeedUuids()

    }
    /**
     * Function that gets calle each frame
     * 
     */
    update(){
        
        if(this.subscribedUuids.length == 0)return  //Exit when no subscribers are present


        this.raycaster.setFromCamera( this.userInputManager.mousePosition, this.camera );
        var intersects = this.raycaster.intersectObjects( this.scene.children );

        if( intersects.length == 0 ) return; //Exit when no intersects are found

        this.lastObject = this.lastObject || intersects[0].object //for the first object

        
        this.currentContact = intersects[0].object
        
        if(this.currentContact.parent.type === "Group") {
        
            this.currentContact = this.currentContact.parent
        }
        if(this.lastObject.uuid == this.currentContact.uuid) return; //Dont fire multiple times on the same object
        
        
        if(this.subscribedUuids.indexOf(this.lastObject.uuid)!=-1){
            this.fireEvent("mouseleave") //Fire mouseleave when the last object was registered
        }
        if(this.subscribedUuids.indexOf(this.currentContact.uuid)!=-1){
            this.fireEvent("mouseenter") //fire mouseenter when the current object is registered
        }
        this.lastObject = this.currentContact




        
        
    }
    /**
     * @param {String} action Wether to fire mouseleave or mouseenter
     * @todo add event object with information
     */
    fireEvent(action){
        
        this.interactions++
        var object
        switch(action){
            case "mouseleave":
                this.mouseLeave.forEach(e=>{
                    
                    if(e.object.uuid == this.lastObject.uuid){
                        e.mouseLeave()
                        object = e
                    }
                })
            break;
            case "mouseenter":
                this.mouseEnter.forEach(e=>{
                    if(e.object.uuid == this.currentContact.uuid){
                        e.mouseEnter()
                        object = e

                    }
                })
            break;
        }
        this.displayManager.fireEvent(object,action)
    }

    /*Generator helper functions */

    generateSubscribeedUuids(){
        var uuids = []
        var searcher = function(e){
            var object = e.object
            if(uuids.indexOf(object.uuid)==-1){
                uuids.push(object.uuid)
            }
        }
        this.click.forEach(searcher)
        this.mouseEnter.forEach(searcher)
        this.mouseLeave.forEach(searcher)
        this.subscribedUuids = uuids
    }
}