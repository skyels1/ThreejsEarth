import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { RenderPass } from 'three/examples/jsm/Addons.js';
import { UnrealBloomPass } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);


const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),5,1,2);
composer.addPass(bloomPass);

const geometry = new THREE.BoxGeometry( 2, 2, 2 );


    const loader = new THREE.TextureLoader();
     

    // wallpaper in the background
    loader.load('images/backgrounds/stars.jpg', function(texture) { texture.colorSpace = THREE.SRGBColorSpace; scene.background = texture; });


    //texture for the rubix cube
    const materials = [
      new THREE.MeshBasicMaterial({map: loadColorTexture('images/blue.png')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('images/yellow.png')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('images/red.png')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('images/white.png')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('images/green.png')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('images/orange.png')}),
    ];
    const cube = new THREE.Mesh(geometry, materials);
     
    function loadColorTexture( path ) {
      const texture = loader.load( path );
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }

scene.add( cube );


camera.position.z = 10;


//scene.background = new THREE.Color( 0x279ff5 );


//controlls to move and zoom
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 150;
controls.mouseButtons.RIGHT = false;
controls.rotateSpeed = 0.3;
//controls.mouseButtons.MIDDLE = false;
//controls.mouseButtons.RIGHT = THREE.MOUSE.DOLLY;


// remove the weird drag click select picture thing
renderer.domElement.addEventListener('dragstart', function (event) {
  event.preventDefault();
});


// fit screen when resizing the tab
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    cube.rotation.x += 0.009;
    cube.rotation.y += 0.003;

    controls.update();

    composer.render();
}

renderer.setAnimationLoop( animate );