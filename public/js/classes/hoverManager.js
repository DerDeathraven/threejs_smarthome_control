export class HoverManager{
    constructor(scene,camera,lightManager){
        this.scene = scene;
        this.camera = camera;
        this.lightManager = lightManager;

    }
    update(intersects){
        if(intersects[0].object.userData.isDevice){
            var id = intersects[0].object.userData.id;
            var light = htis.lightManager.getLightbyID(id)

            this.updateScreen(light);
        }
    }
    updateScreen(device){
        var container = document.createElement("div")
        var header = document.createElement("div")
        var content =  this.generateScreenContent(device)

        //fill header
        $(header).text(device.id).addClass("infoScreenHeader").appendTo(container)
        $(content).addClass("infoScreenContent").appendTo(container)

        $(container).addClass("infoScreen")

        $(".infoScreenContainer").html(" ").append(container)

       
    }
    generateScreenContent(device){
        var container = document.createElement("div")
        Object.keys(device).forEach(k=>{
            var keyPair = document.createElement("div")
            var key = document.createElement("div")
            var value = document.createElement("div")

            $(key).text(k).appendTo(keyPair).addClass("key")
            $(value).text(device[key]).appendTo(keyPair).addClass("value")
            $(keyPair).appendTo(container).addClass("keyPair")

        })
        return container
    }
}