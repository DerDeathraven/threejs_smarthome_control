# Three.js_smarthome_control

## Scope

This Nodejs Application uses my Smarthome data to build a 3D environment using Three.js in which I can monitor and control these devices

a mockup version is in the works!

## How to Configure

### Installation

Clone the repository
cd into the repository

```
npm install
node index.js
```

open localhost:3000

## Arguments

- -h mqttHostname (optional) defaults to "localhost"
- -p mqttPort (optional) defaults to "1883"

### Configure

the app listens for a MQTT server at localhost:1883

to change that use -h for the MQTT hostname and -p for the port number

when configured the app will accept messages with the syntax deviceType/deviceName -> light/light-0

### Usage

- Rooms can be added by clicking the "Place Mode" button and selecting the area of the room
- Lamps can be placed in the same mode by pressing the "Place Lamp" button and clicking inside a Room
- Leaving the mode will automatically save all placed objects.
- outside of the place-mode lamps can be controlled by clicking on them
- the name of a device can be found by hovering over it
- switching the lamp will trigger a message on the topic switch/deviceID -> switch/0 for lamp-0

## Tech Used

### Backend

- MQTT
- NodeJS
- SocketIO
- Node-Red -> to feed the data into MQTT

### Frontend

- JQuery
- Three.js

## Future Features

- More devices -> Telefones, Motion Sensors ,etc
- expand the room by clicking on it
- turn all devices in a room off
