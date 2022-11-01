import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import gsap from "gsap";




const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10);
camera.position.set(-1.7, 0, 8.7)
camera.lookAt(1.7, 0, 8.7)
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xA3A3A3)


// controls
// const controls =new FirstPersonControls(camera ,renderer.domElement)
// controls.movementSpeed =8
// controls.lookSpeed =0.08


const progressBarContainer = document.querySelector('.progress-bar-container')

//loading progress bar: 
const loadingManager = new THREE.LoadingManager()
const progressBar = document.getElementById('progress-bar')
loadingManager.onProgress = function (url, loaded, total) {
    progressBar.value = (loaded / total) * 100
}
loadingManager.onLoad = function () {
    progressBarContainer.style.display = 'none'
}

//image
let position = 0;
const glftLoader = new GLTFLoader(loadingManager)
glftLoader.load("./assets/the_king_s_hall/scene.gltf", function (gltf) {
    const modal = gltf.scene;
    scene.add(modal)

    window.addEventListener("mouseup", function () { //mousewheel
        console.log(camera.position);
        switch (position) {
            case 0:
                moveCamera(-1.8, 1.6, 5)
                rotateCamera(0, 0.1, 0)
                position = 1;
                break;
            case 1:
                moveCamera(2.8, 0, 3.6)
                rotateCamera(0, -1.6, 0)
                position = 2;
                break;
            case 2:
                moveCamera(2.5, -0.9, 12.2)
                rotateCamera(0.9, 0.6, -0.6)
                position = 3;
                break;
            case 3:
                moveCamera(-2.5, 0.7, 4)
                rotateCamera(0.6, 1.9, -0.6)
                position = 4;
                break;
            case 4:
                moveCamera(-1.7, 0, 8.7)
                rotateCamera(0, 4.7, 0)
                position = 5;
                break;
            case 5:
                moveCamera(0.5, 0.8, 10)
                rotateCamera(0.3, 1.65, -0.3)
                position = 0;

        }


    })

    const moveCamera = (x, y, z) => {
        gsap.to(camera.position, { x, y, z, duration: 3 })
    }
    const rotateCamera = (x, y, z) => {
        gsap.to(camera.rotation, { x, y, z, duration: 3.2 })
    }
})

const clock = new THREE.Clock()
function animate() {
    renderer.render(scene, camera)
    // controls.update(clock.getDelta())
}

renderer.setAnimationLoop(animate)

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});