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

const atmosphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x88ccff,
  side: THREE.BackSide,
  transparent: true,
  opacity: 0.6,
  blending: THREE.AdditiveBlending,
  depthWrite: false
});

const geometry = new THREE.BoxGeometry( 2, 2, 2 );


    const loader = new THREE.TextureLoader();
     

    // the heightmap for the earth
    const colorMap = loader.load('images/backgrounds/earthhrnc2.jpg');
    const displacement = loader.load('images/backgrounds/earthhm3.jpg');

    const colorMapM = loader.load('images/backgrounds/moon.jpg');
    const displacementM = loader.load('images/backgrounds/moonhm.jpg');

    const colorMapS = loader.load('images/backgrounds/sun.jpg');
    const displacementS = loader.load('images/backgrounds/sunhm.jpg');


    colorMap.colorSpace = THREE.SRGBColorSpace;

    const materialhm = new THREE.MeshStandardMaterial({
      map: colorMap,
      displacementMap: displacement,
      displacementScale: 2,
      roughness: 1,
      metalness: 0
    })
    const materialMhm = new THREE.MeshStandardMaterial({
      map: colorMapM,
      displacementMap: displacementM,
      displacementScale: 0.1,
      roughness: 1,
      metalness: 0
    })
    const materialShm = new THREE.MeshStandardMaterial({
      map: colorMapS,
      displacementMap: displacementS,
      displacementScale: 5,
      roughness: 1,
      metalness: 0,
      opacity: 0.99,
      transparent: true,
      side: THREE.DoubleSide
    })

    // wallpaper in the background
    //loader.load('images/backgrounds/stars.jpg', function(texture) { texture.colorSpace = THREE.SRGBColorSpace; scene.background = texture; });


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

//scene.add( cube );


//sphere stuff
const geometryS = new THREE.SphereGeometry(15,256,256); // earth
const geometrySM = new THREE.SphereGeometry(4,256,256); // moon
const geometrySS = new THREE.SphereGeometry(30,256,256); // sun
const geometrySC = new THREE.SphereGeometry(15.8,32,32); // clouds
//const geometrySA = new THREE.SphereGeometry(15.9,32,32); // atmosphere
const geometrySpace = new THREE.SphereGeometry(200,256,256); // space sphere
//const material = new THREE.MeshBasicMaterial({map: loadColorTexture('images/backgrounds/earth3.jpg')});
const materialSpace = new THREE.MeshBasicMaterial({map: loadColorTexture('images/backgrounds/stars.jpg'),transparent: true, side: THREE.DoubleSide});
//const materialMoon = new THREE.MeshBasicMaterial({map: loadColorTexture('images/backgrounds/moon.jpg')});
//const materialA = new THREE.MeshBasicMaterial({color: (0x252ba1), transparent: true, opacity: 0.5});
const cloudsMat = new THREE.MeshLambertMaterial({
  map: loadColorTexture('images/backgrounds/cloudser.png'), 
  transparent: true, 
  opacity: 0.6,
  side: THREE.DoubleSide
});

const atmosphereGeometry = new THREE.SphereGeometry(15.5, 128, 128);
const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);



const sphere = new THREE.Mesh(geometryS,materialhm);
const sphere2 = new THREE.Mesh(geometrySC,cloudsMat);
const sphere3 = new THREE.Mesh(geometrySpace,materialSpace);
const moon = new THREE.Mesh(geometrySM,materialMhm);
const sun = new THREE.Mesh(geometrySS,materialShm);
//const sphere4 = new THREE.Mesh(geometrySA,materialA);

scene.add(sun);
sun.add( sphere );  // earth
sphere.add( sphere2 ); // clouds
scene.add( sphere3 ); // space but sphere
//scene.add( sphere4 ); // atmosphere
sphere.add(moon);
sphere.add(atmosphere);

camera.position.z = 75;

sphere.position.z = -80;

moon.position.z = -30;


// lighting for the scene
const light = new THREE.DirectionalLight(0xffffff, 50);
light.position.set(sun);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040, 50));

//scene.background = new THREE.Color( 0x279ff5 );


//controlls to move and zoom
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 17;
controls.maxDistance = 150;
//controls.mouseButtons.RIGHT = false;
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

    //cube.rotation.x += 0.009;
    //cube.rotation.y += 0.003;

    //sphere.rotation.x += 0.0003;
    sphere.rotation.y -= 0.0003; // earth

    //sphere2.rotation.x += 0.0003;
    sphere2.rotation.y += 0.0003; // clouds

    //sphere3.rotation.x += 0.0003;
    //sphere3.rotation.y += 0.0003; // stars

    moon.rotation.y -= 0.0003; // moon

    sun.rotation.y -= 0.0003; // sun

    controls.update();

    composer.render();
}

renderer.setAnimationLoop( animate );