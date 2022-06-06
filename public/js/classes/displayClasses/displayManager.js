import {PlaceModeManager} from "placeModeManager"
import {InfoDisplay} from "infoDisplay"

export class DisplayManager {
    constructor(scene,camera,lightManager,roomManager,connectionManager,userInputManager){
        this.scene = scene;
        this.camera = camera;
        this.lightManager = lightManager;
        this.roomManager = roomManager
        this.connectionManager = connectionManager
        this.userInputManager = userInputManager


        this.displays = []

        this.initManagers()
    }
    initManagers() {
        var placeModeManager = new PlaceModeManager(this)
        var infoDisplay = new InfoDisplay("info","info-display", $(".infoScreenContainer"),true,["light"],this)
        this.displays.push(placeModeManager)
        this.displays.push(infoDisplay)

        
    }
    getManager(name) {
        var manager
        this.displays.forEach(d=>{
            if(d.name == name){
                manager = d
            }
        })
        return manager
    }
    fireEvent(object, event) {
        this.displays.forEach(f=>{
            if(f.relatedType.indexOf(object.type) != -1) {
                switch(event){
                    case "mouseenter":
                        f.mouseEnter(object)
                        break;
                    case "mouseleave":
                        f.mouseLeave(object)
                        break;

                }
            }
        })
    }
}