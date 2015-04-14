//create 3D canvas container
var container = document.querySelector('.viewport');
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

//Setup renderer and append to container
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(WIDTH, HEIGHT);
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMapType = THREE.PCFShadowMap;
renderer.shadowMapAutoUpdate = true;
renderer.setClearColor( 0xffffff, 1);
container.appendChild(renderer.domElement);

// Setup scene
var scene = new THREE.Scene();

//Add camera to see objects in scene
var VIEW_ANGLE = 45;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 1;
var FAR = 10000;
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
camera.position.set(30, 10, 0);
camera.lookAt(scene.position);
scene.add(camera);

//Add default lighting
var light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 300, 0);
light.castShadow = true;
light.shadowCameraLeft = -60;
light.shadowCameraTop = -60;
light.shadowCameraRight = 60;
light.shadowCameraBottom = 60;
light.shadowCameraNear = 1;
light.shadowCameraFar = 1000;
light.shadowBias = -0.0001;
light.shadowMapWidth = light.shadowMapHeight = 1024;
light.shadowDarkness = 0.7;
scene.add(light);

//Add grid helper to show 3D perspective
var size = 10;
var step = 1;
var gridHelper = new THREE.GridHelper( size, step );
gridHelper.position = new THREE.Vector3( 5, -5, 0 );
scene.add( gridHelper );

//Add cube Geometry
//var material = new THREE.MeshBasicMaterial( { color: 0x00FF00 } );
var material = new THREE.MeshLambertMaterial( { color: 0x00FF00 } );
var geometry = new THREE.SphereGeometry(4,20,20);
var mesh = new THREE.Mesh( geometry, material );
mesh.position.set(10, 2, 0);
scene.add( mesh );

//Changing lighting
spotlight = new THREE.SpotLight(0xFFFFFF);
spotlight.position.set(300, 300, 0);
spotlight.lookAt(mesh);
spotlight.angle = Math.PI/3;
spotlight.intensity = 1;
spotlight.distance = 0;
scene.add(spotlight);
material.needsUpdate = true;

//Moving camera
camera.position.set(30, 10, 10);
camera.lookAt(scene.position);

camera.position.set(30, 10, 10);
camera.lookAt(mesh.position);

//Call to render has to be added last 
renderer.render(scene, camera);

//Add animation loop
var pos = 10;
function render() {
	pos = pos + 1;
	//Change any Three.js property 
	camera.position.set(pos, 10, 10);
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}
//render();

