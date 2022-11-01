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


//controls
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
const glftLoader = new GLTFLoader(loadingManager)
glftLoader.load("./assets/the_king_s_hall/scene.gltf", function (gltf) {
    const modal = gltf.scene;
    scene.add(modal)

    window.addEventListener("mouseup", function () { //mousewheel
        moveCamera(-1.8, 1.6, 5, 3)
        rotateCamera(0, 0.1, 0, 3.2)

    })

    const moveCamera = (x, y, z, duration) => {
        gsap.to(camera.position, { x, y, z, duration })
    }
    const rotateCamera = (x, y, z, duration) => {
        gsap.to(camera.rotation, { x, y, z, duration })
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