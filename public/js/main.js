import * as THREE from "three";
import { OrbitControls } from "orbi";
import { ConnectionManager } from "connectionManager";
import { JqueryManager } from "jqueryManager";
import { SceneStateMachine } from "sceneStateMachine";
import { PlaceModeManager } from "placeModeManager";
import { RoomManager } from "roomManager";
import { LightManager } from "lightManager";

export var camera, scene, renderer,datGui,model,lightManager,animator,controls,ground;
var sceneStateMachine
var connectionManager
var jqueryManager 
var placeModeManager
var roomManager,


scene = new THREE.Scene();
lightManager = new LightManager(scene);
roomManager = new RoomManager(lightManager,scene)
connectionManager = new ConnectionManager([lightManager,roomManager]);
connectionManager.init().then(e=>{
    init()
    requestAnimationFrame(animate)
})

function init() {
    //licht
    var ambient =  new THREE.AmbientLight(0xFFFFFF,0)   
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
    placeModeManager = new PlaceModeManager(scene,camera,lightManager,roomManager,connectionManager)
    sceneStateMachine = new SceneStateMachine(placeModeManager)
    jqueryManager =  new JqueryManager(sceneStateMachine)
    connectionManager.managers.push(roomManager)


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
    placeModeManager.update(camera)
    

  
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


