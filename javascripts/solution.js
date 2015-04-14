//create 3D canvas - ThreeJs stage setup
var container, scene, renderer, camera, light, loader;
var WIDTH, HEIGHT, VIEW_ANGLE, ASPECT, NEAR, FAR;

container = document.querySelector('.viewport');

WIDTH = window.innerWidth;
HEIGHT = window.innerHeight;

var width = WIDTH ;
var height = HEIGHT ;

VIEW_ANGLE = 45;
ASPECT = WIDTH / HEIGHT;
NEAR = 1;
FAR = 10000;

// Setup scene
scene = new THREE.Scene();

renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(WIDTH, HEIGHT);
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMapType = THREE.PCFShadowMap;
renderer.shadowMapAutoUpdate = true;

container.appendChild(renderer.domElement);

camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

camera.position.set(30, 10, 0);
camera.lookAt(scene.position);
scene.add(camera);

renderer.setClearColor( 0xffffff, 1);

light = new THREE.DirectionalLight(0xffffff);

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

var size = 10;
var step = 1;
var gridHelper = new THREE.GridHelper( size, step );

gridHelper.position = new THREE.Vector3( 5, -5, 0 );
scene.add( gridHelper );



//Add cube
var material = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
var geometry = new THREE.CubeGeometry( 5, 5, 5 );
var mesh = new THREE.Mesh( geometry, material );
mesh.position.set(10, 2, 0);
scene.add( mesh );

//Call to render has to be added last 

renderer.render(scene, camera);

// render();

// function render() {
  
//   // requestAnimationFrame(render);
// }


// var spotlight;
// var currentObj;
// var currentShape = 'cube';
// var currentMaterial = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
// var codeSample = $("#code");

// var globalMaterial;








// //gridHelper.rotation = new THREE.Euler( 15, 0, 0 );




// //add jQuery Doc ready to bind click handlers here

// $(function() {
    
// 	//bind cameras

// 	$("#cameraLeft").bind("click", function(e){
		
// 		camera.position.set(30, 10, 10);
// 		camera.lookAt(scene.position);

// 		swapInCodeSample("camera");

// 		e.preventDefault();
// 	})

// 	$("#cameraRight").bind("click", function(e){
		
// 		camera.position.set(30, 10, -10);
// 		camera.lookAt(scene.position);

// 		e.preventDefault();
// 	})

// 	$("#cameraCenter").bind("click", function(e){
		
// 		camera.position.set(30, 10, 0);
// 		camera.lookAt(scene.position);

// 		e.preventDefault();
// 	})

// 	//bind lighting
// 	$("#spotlight").bind("click", function(e){


// 		spotlight = new THREE.SpotLight(0xFFFFFF);
// 		spotlight.position.set(300, 300, 0);
// 		spotlight.lookAt(currentObj);
// 		spotlight.angle = Math.PI/3;
// 		spotlight.intensity = 10;
// 		spotlight.distance = 0;
// 		scene.add(spotlight);

// 		globalMaterial.needsUpdate = true;
// 		//renderer.render(scene, camera);
// 		swapInCodeSample("lighting");

// 		e.preventDefault();
// 	})

// 	$("#remove").bind("click", function(e){
// 		globalMaterial.needsUpdate = true;
// 		scene.remove(light);
// 		scene.remove(spotlight);
// 		e.preventDefault();
// 	})

// 	$("#ambient").bind("click", function(e){
// 		globalMaterial.needsUpdate = true;
// 		scene.add(light);
// 		e.preventDefault();
// 	})

// 	//bind materials
// 	$("#basic").bind("click", function(e){
// 		createObj(currentShape, 'basic');
// 		e.preventDefault();
// 	});

// 	$("#lambert").bind("click", function(e){
// 		createObj(currentShape, 'lambert');
// 		swapInCodeSample("material");
// 		e.preventDefault();
// 	});

// 	$("#phong").bind("click", function(e){
// 		createObj(currentShape, 'phong');
// 		e.preventDefault();
// 	});

// 	$("#normal").bind("click", function(e){
// 		createObj(currentShape, 'normal');
// 		e.preventDefault();
// 	});



// 	//bind geometry
// 	$("#cube").bind("click", function(e){
// 		createObj('cube', currentMaterial);

// 		swapInCodeSample("geometry");
// 		e.preventDefault();
// 	});

// 	$("#sphere").bind("click", function(e){
// 		createObj('sphere', currentMaterial);
// 		e.preventDefault();
// 	});

// 	$("#torus").bind("click", function(e){
// 		createObj('torus', currentMaterial);
// 		e.preventDefault();
// 	});


// });

// function removeObj(){
// 	if (currentObj) {
//     scene.remove(currentObj);
//   };
// }


// function createObj(shape, material){
// 	//remove current object before inserting new one
// 	if (currentObj) {
//     scene.remove(currentObj);
//   };

// 	var geometry, material;

// 	switch(shape) {
// 		case 'cube':	
// 	 		geometry = new THREE.CubeGeometry( 5, 5, 5 );
// 	 		currentShape = 'cube';
// 	 		break;
// 	 	case 'sphere':	
// 	 		geometry = new THREE.SphereGeometry(4,20,20);
// 	 		currentShape = 'sphere';
// 	 		break;
// 	 	case 'torus':	
// 	 		geometry = new THREE.TorusGeometry(4, 2.5, 20, 20, 6.3);
// 	 		currentShape = 'torus';
// 	 		break;
// 	 	}

// 	 switch(material) {
// 		case 'basic':	
// 	 		material = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
// 	 		currentMaterial = 'basic';
// 	 		break;
// 	 	case 'lambert':	
// 	 		material = new THREE.MeshLambertMaterial( { color: 0x00FF00 } );
// 	 		currentMaterial = 'lambert';
// 	 		break;
// 	 	case 'phong':	
// 	 		material = new THREE.MeshPhongMaterial( { color: 0x0000FF} );
// 	 		currentMaterial = 'phong';
// 	 		break;
// 	 	case 'normal':	
// 	 		material = new THREE.MeshNormalMaterial( );
// 	 		currentMaterial = 'normal';
// 	 		break;
// 	 	}	

// 	 	globalMaterial = material;

// 	var mesh = new THREE.Mesh( geometry, globalMaterial );

// 	mesh.position.set(10, 2, 0);
// 	if (currentShape === 'torus') {
// 	 		mesh.rotation.y += 90;
// 	};
// 	scene.add( mesh );

// 	currentObj = mesh;

// }

// function swapInCodeSample(code){
// 	var codeSampleTxt;

// 	var geometryTxt = "<p>var geometry = new THREE.CubeGeometry( 5, 5, 5 );</p><p>var mesh = new THREE.Mesh( geometry, material );</p><p>mesh.position.set(10, 2, 0);</p>";

// 	var materialTxt = "<p>var material = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );</p><p>var mesh = new THREE.Mesh( geometry, material );</p><p>mesh.position.set(10, 2, 0);</p>";

// 	var lightingTxt = "<p>spotlight = new THREE.SpotLight(0xFFFFFF);</p><p>spotlight.position.set(300, 300, 0);</p><p>spotlight.lookAt(currentObj);</p>";

// 	var	cameraTxt = "<p>camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);</p><p>camera.position.set(30, 10, 0);</p><p>camera.lookAt(scene.position);</p>";

// 	switch(code){
// 		case "geometry":
// 		codeSampleTxt = geometryTxt;
// 		break;
// 		case "material":
// 		codeSampleTxt = materialTxt;
// 		break;
// 		case "lighting":
// 		codeSampleTxt = lightingTxt;
// 		break;
// 		case "camera":
// 		codeSampleTxt = cameraTxt;
// 		break;
// 	}

// 	codeSample.html(codeSampleTxt);
// }
