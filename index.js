

const express = require("express");
const path = require("path")
const socketio = require("socket.io");
const mqtt = require("mqtt");
const bodyParser = require("body-parser");
const MqttManager = require("./classes/mqttManger")
const SocketManager = require("./classes/socketManager")



//Node inits
const app = express();
const server = app.listen(3000, () => { console.log("server started on port 3000"); });




//Express settings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

app.get("/", (req, res) => {
	res.sendFile(path.resolve(public + '/index.html'));
});

//My modules

const mqttManger = new MqttManager()
const socketManager = new SocketManager(server,mqttManger)
