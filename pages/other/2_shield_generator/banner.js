/* testing cloth simulation */
var pinsFormation = [];
var pins = [ 6 ];
pinsFormation.push( pins );
pins = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
pinsFormation.push( pins );
pins = [ 0 ];
pinsFormation.push( pins );
pins = []; // cut the rope ;)
pinsFormation.push( pins );
pins = [ 0, cloth.w ]; // classic 2 pins
pinsFormation.push( pins );
pins = pinsFormation[ 1 ];

function togglePins() {
  pins = pinsFormation[ ~~ ( Math.random() * pinsFormation.length ) ];
}

if ( WEBGL.isWebGLAvailable() === false ) {
  document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

var container, stats;
var camera, scene, renderer;
var clothGeometry;
var debug_1, debug_2, debug_3, debug_4;
var object;

init();
animate();

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  debug_1 = document.getElementById('debug-1');
  debug_2 = document.getElementById('debug-2');
  debug_3 = document.getElementById('debug-3');
  debug_4 = document.getElementById('debug-4');
        
	// scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xfffcf3 );
        
	// camera
	camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set(250, 124, 700);
  camera.rotation.set(-0.11, 0.78, 0.08);
        
	// lights
	scene.add( new THREE.AmbientLight( 0x666666 ) );

	var light = new THREE.DirectionalLight( 0xdfebff, 1 );
	light.position.set( 50, 200, 100 );
	light.position.multiplyScalar( 1.3 );

	light.castShadow = true;

	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;

	var d = 300;

	light.shadow.camera.left = - d;
	light.shadow.camera.right = d;
	light.shadow.camera.top = d;
	light.shadow.camera.bottom = - d;

	light.shadow.camera.far = 1000;

	scene.add( light );

	// cloth material
	var loader = new THREE.TextureLoader();
	var clothTexture = loader.load( 'banner3.png' );
	clothTexture.anisotropy = 16;

	var clothMaterial = new THREE.MeshLambertMaterial( {
		map: clothTexture,
		side: THREE.DoubleSide,
		alphaTest: 0.5
	} );

	// cloth geometry
	clothGeometry = new THREE.ParametricBufferGeometry( clothFunction, cloth.w, cloth.h );

	// cloth mesh
	object = new THREE.Mesh( clothGeometry, clothMaterial );
	object.position.set( 0, 0, 0 );
	object.castShadow = true;
	scene.add( object );
	object.customDepthMaterial = new THREE.MeshDepthMaterial( {
		depthPacking: THREE.RGBADepthPacking,
		map: clothTexture,
		alphaTest: 0.5
	} );

  // ground
	var groundMaterial = new THREE.MeshLambertMaterial( { color: 0xe1a6cb });
	var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
	mesh.position.y = - 250;
	mesh.rotation.x = - Math.PI / 2;
	mesh.receiveShadow = true;
	scene.add( mesh );

	// renderer
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.shadowMap.enabled = true;

	// controls
	var controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.maxPolarAngle = Math.PI * 0.5;
	controls.minDistance = 1000;
	controls.maxDistance = 5000;
	//
	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
    
// animate!

// 24 frames a second
var fps = 24;
var then = Date.now();
var interval = 1000/fps;
var delta = 0;

function animate() {
	requestAnimationFrame( animate );
	var time = Date.now();
  delta = time - then;

  if (delta > interval) {
    var windStrength = Math.cos( time / 7000 ) * 20 + 40;
	  windForce.set( Math.sin( time / 2000 ), Math.cos( time / 3000 ), Math.sin( time / 1000 ) )
	  windForce.normalize()
	  windForce.multiplyScalar( windStrength );
	  simulate( time );
	  render();
    then = time - (delta % interval);
  }
}

function render() {
	var p = cloth.particles;
	for ( var i = 0, il = p.length; i < il; i ++ ) {
		var v = p[ i ].position;
		clothGeometry.attributes.position.setXYZ( i, v.x, v.y, v.z );
	}
	clothGeometry.attributes.position.needsUpdate = true;
	clothGeometry.computeVertexNormals();
  debug_1.innerHTML = `<b>cam.pos</b> ${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}`
  debug_2.innerHTML = `<b>cam.rot</b> ${camera.rotation.x.toFixed(2)}, ${camera.rotation.y.toFixed(2)}, ${camera.rotation.z.toFixed(2)}` 
	renderer.render( scene, camera );
}
