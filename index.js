const express = require("express");
const path = require("path")
const socketio = require("socket.io");
const mqtt = require("mqtt");
const bodyParser = require("body-parser");


//Node inits
const app = express();
const server = app.listen(3000, () => { console.log("server started on port 3000"); });
const io = socketio(server)


//Express settings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

app.get("/", (req, res) => {
	
	res.sendFile(path.resolve(public + '/index.html'));




});
io.on("connection",socket=>{
    console.log("connection established")

    socket.on("getLights",(e,callback)=>{
        const arr = [
            {
                "id":"küche",
                "state":false,
                "color":"",
                "position": 2
            },
            {
                "id":"flur",
                "state":true,
                "color":"",
                "position": 4,
            },
            {
                "id":"esszimmer",
                "state":false,
                "color":"",
                "position":6,
            },
        ]
        callback(arr)
    })
})
