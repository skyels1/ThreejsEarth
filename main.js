import * as THREE from 'three';
//import Background from 'three/src/renderers/common/Background.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 2, 2, 2 );


    const loader = new THREE.TextureLoader();
     

    loader.load('images/backgrounds/space2.jpg', function(texture) { texture.colorSpace = THREE.SRGBColorSpace; scene.background = texture; });

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

const geometryS = new THREE.SphereGeometry(15,32,16);
const material = new THREE.MeshBasicMaterial({map: loadColorTexture('images/backgrounds/earth2.jpg')});

const sphere = new THREE.Mesh(geometryS,material);

scene.add( sphere );

camera.position.z = 40;

//scene.background = new THREE.Color( 0xb5938b );

function animate() {

    cube.rotation.x += 0.009;
    cube.rotation.y += 0.003;

    sphere.rotation.x += 0.009;
    sphere.rotation.y += 0.003;

    renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );