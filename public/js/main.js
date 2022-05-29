import * as THREE from "three";
import {OrbitControls} from "orbi";
import {LightManager} from "lightManager";
export var camera, scene, renderer,datGui,model,lightManager,animator,controls,ground;
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
var randomCounter = 0
function init() {
    //scene -> 3D raum
    scene = new THREE.Scene();

    lightManager = new LightManager(arr)
    

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
    lightManager.render(scene)
    
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
var secondRandomCounter = 0
function animate(){
    requestAnimationFrame(animate)
    if(randomCounter > 60){
        lightManager.switchStates(arr[secondRandomCounter].id)
        secondRandomCounter >= 2 ? secondRandomCounter =0:secondRandomCounter++
        randomCounter = 0
    }

    randomCounter++
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

init()
requestAnimationFrame(animate)