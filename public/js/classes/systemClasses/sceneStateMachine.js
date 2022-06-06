export class SceneStateMachine{
    constructor(placeModeManager,deviceToggleManager){
        this.isPlaceMode = false;
        this.needsUpdate = false;
        this.placeModeManager = placeModeManager;
        this.deviceToggleManager = deviceToggleManager;
    }
    changeMode(){
        this.isPlaceMode = !this.isPlaceMode;
        this.needsUpdate = true;
        if(this.isPlaceMode){
            this.placeModeManager.startPlaceMode()
            this.deviceToggleManager.endOverwatch()
        }else{
            this.placeModeManager.endPlaceMode()
            this.deviceToggleManager.startOverwatch()
        }
    }
}