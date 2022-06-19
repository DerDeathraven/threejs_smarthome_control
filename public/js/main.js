import * as THREE from "three";
import { OrbitControls } from "orbi";
import { ConnectionManager } from "connectionManager";
import { JqueryManager } from "jqueryManager";
import { SceneStateMachine } from "sceneStateMachine";
import { RoomManager } from "roomManager";
import { LightManager } from "lightManager";
import { UserInputManager } from "userInputManager";
import { DeviceToggleManager } from "deviceToggleManager";
import { InteractionManager } from "interactionManager";
import { DisplayManager } from "displayManager";
import { DoorManager } from "doorManager";

var camera,renderer,controls,ground;


var sceneStateMachine
var jqueryManager 
var displayManager
var deviceToggleManager
var interactionManager

var scene = new THREE.Scene();
var userInputManager = new UserInputManager()
var lightManager = new LightManager(scene);
var roomManager = new RoomManager(lightManager,scene)
var doorManager = new DoorManager(scene)
var connectionManager = new ConnectionManager([lightManager,roomManager,doorManager ]);




connectionManager.init().then(e=>{
    init()
    requestAnimationFrame(animate)
})

function init() {
    //licht
    var ambient =  new THREE.AmbientLight(0xFFFFFF,1)   
    //camera
    camera = new THREE.PerspectiveCamera( 
        45, //Field of view
        window.innerWidth / window.innerHeight, // aspect ratio
        1, // mindest abstand
        10000 // maximal abstand
    )
    camera.position.z = 5;
    camera.position.y = 4;
    
    ground = generateGround()
    ground.position.set(0,-1,0)

   
    //scene add 
    scene.add(ambient)
    scene.add(ground)
    //connect classes
    displayManager = new DisplayManager(scene,camera,lightManager,roomManager,connectionManager,userInputManager)
    interactionManager = new InteractionManager(scene,camera,userInputManager,displayManager)
    lightManager.setInteractionManager(interactionManager)
    roomManager.setInteractionManager(interactionManager)
    doorManager.setInteractionManager(interactionManager)

   
    deviceToggleManager = new DeviceToggleManager(scene,camera,userInputManager,connectionManager)
    sceneStateMachine = new SceneStateMachine(displayManager.getManager("placeModeManager"),deviceToggleManager)
    jqueryManager =  new JqueryManager(sceneStateMachine)
  
    

    //renderer -> die "mach-sichtbar-maschiene"
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xaaaaaa) //hintergrundfarbe
    renderer.shadowMap.enabled = true; //ob schatten erlaubt sind
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementById("threejsHook").appendChild(renderer.domElement)


    renderer.render(scene,camera)
    
    //datGui = new dat.GUI(); //nur für Debug zwecke
    controls =  new OrbitControls(camera, renderer.domElement);

 

}
function animate(){
    requestAnimationFrame(animate)
   
    if(sceneStateMachine.needsUpdate){
        sceneStateMachine.needsUpdate = !sceneStateMachine.needsUpdate
        jqueryManager.updateHud()
       
    }
    displayManager.getManager("placeModeManager").update(camera)
    interactionManager.update()

    connectionManager.update()
    controls.update();
	renderer.render( scene, camera );
    
}
function generateGround(){
    const geometry = new THREE.PlaneGeometry( 10000, 10000 );
    var mat = new THREE.MeshBasicMaterial
         ({
            color: 0xFFFFFF,
            
    
         })

    const plane = new THREE.Mesh( geometry, mat );
    plane.rotation.x = Math.PI *1.5
    plane.receiveShadow = true
    return plane;
    
}


