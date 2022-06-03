export class HoverManager{
    constructor(scene,camera,lightManager){
        this.scene = scene;
        this.camera = camera;
        this.lightManager = lightManager;
        this.editMode = false

        this.oldRoom = {}

    }
    update(intersects){
        if(intersects.length > 0){
                this.renderScreen(intersects)
                this.highlightRoom(intersects)  
            }
        
        
    }
    renderScreen(intersects) {
        if(intersects[0].object.userData.isDevice != true)return;
        $(".infoScreenContainer").show()
        var id = intersects[0].object.userData.id;
        var light = this.lightManager.getLightbyID(id)

        this.updateScreen(light);
        
    }
    highlightRoom(intersects){
        if(intersects[0].object.userData.isRoom == true && this.oldRoom.uuid != intersects[0].object.uuid){
        console.log(this.oldRoom)
        var oldColor = intersects[0].object.material.color.getHex()
        intersects[0].object.userData.oldColor = oldColor
        intersects[0].object.material.color.setHex(0xADD8E6);


        if(Object.keys(this.oldRoom).length !== 0){
        
        var oldColor = this.oldRoom.userData.oldColor
        console.log(oldColor)
        this.oldRoom.material.color.set(oldColor)
        }
        this.oldRoom = intersects[0].object
    }
    }
    click(intersects){
        if(this.editMode == false)return;
        $(".infoScreenContainer").show()
        var id = intersects[0].object.userData.id;
        var light = this.lightManager.getLightbyID(id)
        this.updateScreen(light);

    }
    updateScreen(device){
        var container = document.createElement("div")
        var header = document.createElement("div")
        var content =  this.editMode ?this.generateScreenEditMode(device) : this.generateScreenContent(device)

        //fill header
        $(header).text("Light").addClass("infoScreenHeader").appendTo(container)
        $(content).addClass("infoScreenContent").appendTo(container)

        $(container).addClass("infoScreen")

        $(".infoScreenContainer").html(" ").append(container)

       
    }
    generateScreenContent(device){
        var container = document.createElement("div")
        var ignoreArr = ["object","position","id","domElement"]
        Object.keys(device).forEach(k=>{
            if(ignoreArr.indexOf(k)==-1){
                var keyPair = document.createElement("div")
                var key = document.createElement("div")
                var value = document.createElement("div")

                $(key).text(k).appendTo(keyPair).addClass("key")
                $(value).text(device[k]).appendTo(keyPair).addClass("value")
                $(keyPair).appendTo(container).addClass("keyPair")
            }

        })
        return container
    }
    generateScreenEditMode(device) {
        var container = document.createElement("div")
        var ignoreArr = ["object","position","id"]
        Object.keys(device).forEach(k=>{
            if(ignoreArr.indexOf(k)==-1){
                var keyPair = document.createElement("div")
                var key = document.createElement("div")
                var value = document.createElement("input")

                $(key).text(k).appendTo(keyPair).addClass("key")
                $(value).val(device[k]).appendTo(keyPair).addClass("valueInput")
                $(keyPair).appendTo(container).addClass("keyPair")
            }

        })
        return container
    }
}