import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 2, 2, 2 );


    const loader = new THREE.TextureLoader();
     

    const colorMap = loader.load('images/backgrounds/earth3.jpg');
    const displacement = loader.load('images/backgrounds/earthhm.jpg');

    colorMap.colorSpace = THREE.SRGBColorSpace;

    const materialhm = new THREE.MeshStandardMaterial({
      map: colorMap,
      displacementMap: displacement,
      displacementScale: 3,
      roughness: 1,
      metalness: 0
    })


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

const geometryS = new THREE.SphereGeometry(15,256,256);
const material = new THREE.MeshBasicMaterial({map: loadColorTexture('images/backgrounds/earth3.jpg')});

const sphere = new THREE.Mesh(geometryS,materialhm);

scene.add( sphere );

camera.position.z = 40;

const light = new THREE.DirectionalLight(0xffffff, 4);
light.position.set(30,30,30);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040, 4));

//scene.background = new THREE.Color( 0xb5938b );

function animate() {

    cube.rotation.x += 0.009;
    cube.rotation.y += 0.003;

    sphere.rotation.x += 0.006;
    sphere.rotation.y += 0.002;

    renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );