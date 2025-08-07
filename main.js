import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 2, 2, 2 );


    const loader = new THREE.TextureLoader();
     

    // the heightmap for the earth
    const colorMap = loader.load('images/backgrounds/earthhrnc2.jpg');
    const displacement = loader.load('images/backgrounds/earthhm3.jpg');

    colorMap.colorSpace = THREE.SRGBColorSpace;

    const materialhm = new THREE.MeshStandardMaterial({
      map: colorMap,
      displacementMap: displacement,
      displacementScale: 2,
      roughness: 1,
      metalness: 0
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
const geometryS = new THREE.SphereGeometry(15,256,256);
const geometrySC = new THREE.SphereGeometry(15.8,32,32);
const geometrySpace = new THREE.SphereGeometry(50,256,256);
//const material = new THREE.MeshBasicMaterial({map: loadColorTexture('images/backgrounds/earth3.jpg')});
const materialSpace = new THREE.MeshBasicMaterial({map: loadColorTexture('images/backgrounds/stars.jpg'),transparent: true, side: THREE.DoubleSide});
const cloudsMat = new THREE.MeshLambertMaterial({
  map: loadColorTexture('images/backgrounds/cloudser.png'), 
  transparent: true, 
  side: THREE.DoubleSide, 
  opacity: 0.7
});


const sphere = new THREE.Mesh(geometryS,materialhm);
const sphere2 = new THREE.Mesh(geometrySC,cloudsMat);
const sphere3 = new THREE.Mesh(geometrySpace,materialSpace);

scene.add( sphere );
scene.add( sphere2 );
scene.add( sphere3 ); // space but sphere

camera.position.z = 35;


// lighting for the scene
const light = new THREE.DirectionalLight(0xffffff, 4);
light.position.set(30,30,30);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040, 4));

//scene.background = new THREE.Color( 0x279ff5 );


//controlls to move and zoom
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 18;
controls.maxDistance = 50;
controls.mouseButtons.RIGHT = false;
controls.rotateSpeed = 0.3;


// remove the weird drag click select picture thing
renderer.domElement.addEventListener('dragstart', function (event) {
  event.preventDefault();
});


function animate() {

    //cube.rotation.x += 0.009;
    //cube.rotation.y += 0.003;

    //sphere.rotation.x += 0.0003;
    sphere.rotation.y -= 0.0003; // earth

    //sphere2.rotation.x += 0.0003;
    sphere2.rotation.y += 0.0003; // clouds

    //sphere3.rotation.x += 0.0003;
    sphere3.rotation.y += 0.0003; // stars

    controls.update();

    renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );