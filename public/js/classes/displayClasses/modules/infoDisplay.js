import {Display} from "display"

export class InfoDisplay extends Display {
    constructor(name,className,domHook,hidden,relatedType,manager){
        super(name,className,domHook,hidden,relatedType,manager);
        this.currentDevice = undefined;
        this.lastDevice = undefined;


    }
    update(device){
        this.generateDomObject(device)
    }
    mouseEnter(device){
        this.update(device)
        this.domHook.show();
    }
    mouseLeave(device){
        this.domHook.hide();
    }
    generateDomObject(device){
        var container = document.createElement("div")
        var header = document.createElement("div")
        var content = this.generateScreenContent(device)

        //fill header
        $(header).text("Light").addClass("infoScreenHeader").appendTo(container)
        $(content).addClass("infoScreenContent").appendTo(container)

        $(container).addClass("infoScreen")
        this.hidden ? this.domHook.hide() : "";
        this.container = $(container)
        this.domHook.html(" ").append(container)

    }
    generateScreenContent(device){
        var container = document.createElement("div")
        var ignoreArr = ["object","position","id","domElement","jlcd"]
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
}