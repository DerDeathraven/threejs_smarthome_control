export class SceneStateMachine{
    constructor(placeModeManager){
        this.isPlaceMode = false;
        this.needsUpdate = false;
        this.placeModeManager = placeModeManager;
    }
    changeMode(){
        this.isPlaceMode = !this.isPlaceMode;
        this.needsUpdate = true;
        if(this.isPlaceMode){
            this.placeModeManager.startPlaceMode()
        }else{
            this.placeModeManager.endPlaceMode()
        }
    }
}