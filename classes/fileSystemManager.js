const fs = require('fs');

class FileSystemManager{
    static saveSettings(settings){
        fs.writeFileSync("settings.json", JSON.stringify(settings));
    }
    static getSettings(){
        try{
            var rawSettings = fs.readFileSync("settings.json")
        } catch(err){
            var rawSettings = "{}"
        }
        var settings = JSON.parse(rawSettings);
        return settings;
    }
}
module.exports = FileSystemManager;