if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var clock = new THREE.Clock();
var scene, camera, renderer;
var controls, controlsEnabled;
var moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    canJump;
var velocity = new THREE.Vector3();
var ambientLight, spotLight, terrain;

init();
animate();

function init() {
  initPointerLock();
  initControls();

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xffffff, 10, 500);

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 10;

  controls = new THREE.PointerLockControls(camera);
  scene.add(controls.getObject());

  ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(100, 200, 130);
  spotLight.castShadow = true;
  spotLight.intensity = 2;
  scene.add(spotLight);

  terrain = THREE.Terrain({
    easing: THREE.Terrain.Linear,
    frequency: 5,
    heightmap: THREE.Terrain.DiamondSquare,
    material: new THREE.MeshBasicMaterial({color: 0x5566aa}),
    maxHeight: 50,
    minHeight: -100,
    steps: 1,
    useBufferGeometry: false,
    xSize: 1024,
    ySize: 1024
  });
  terrain.receiveShadow = true;
  scene.add(terrain);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor(new THREE.Color(0xffffff));
  renderer.shadowMap.enabled = true;

  document.getElementById('view').appendChild( renderer.domElement );
}

function animate() {
  updateControls();
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

function checkForPointerLock() {
  return 'pointerLockElement' in document ||
         'mozPointerLockElement' in document ||
         'webkitPointerLockElement' in document;
}

function initPointerLock() {
  var el = document.body;
  var havePointerLock = checkForPointerLock();

  if (havePointerLock) {
    var pointerlockchange = function (event) {
      if (document.pointerLockElement === el ||
          document.mozPointerLockElement === el ||
          document.webkitPointerLockElement === el) {
        controlsEnabled = true;
        controls.enabled = true;
      } else {
        controlsEnabled = false
        controls.enabled = false;
      }
    };

    var pointerlockerror = function (event) {
      el.innerHTML = 'PointerLock Error';
    };

    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('mozpointerlockchange', pointerlockchange, false);
    document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

    document.addEventListener('pointerlockerror', pointerlockerror, false);
    document.addEventListener('mozpointerlockerror', pointerlockerror, false);
    document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

    var requestPointerLock = function(event) {
      el.requestPointerLock = el.requestPointerLock || el.mozRequestPointerLock || el.webkitRequestPointerLock;
      el.requestPointerLock();
    };

    el.addEventListener('click', requestPointerLock, false);
  } else {
    el.innerHTML = 'Bad browser; No pointer lock';
  }
}

function initControls() {
  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);
}

function onKeyDown(e) {
  switch (e.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = true;
      break;
    case 37: // left
    case 65: // a
      moveLeft = true;
      break;
    case 40: // down
    case 83: // s
      moveBackward = true;
      break;
    case 39: // right
    case 68: // d
      moveRight = true;
      break;
    case 32: // space
      if (canJump === true) velocity.y += 350;
      canJump = false;
      break;
  }
}

function onKeyUp(e) {
  switch(e.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = false;
      break;
    case 37: // left
    case 65: // a
      moveLeft = false;
      break;
    case 40: // down
    case 83: // s
      moveBackward = false;
      break;
    case 39: // right
    case 68: // d
      moveRight = false;
      break;
  }
}

function updateControls() {
  if (controlsEnabled) {
    var delta = clock.getDelta();
    var walkingSpeed = 200.0;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;
    velocity.y -= 9.8 * 100.0 * delta;

    if (moveForward) velocity.z -= walkingSpeed * delta;
    if (moveBackward) velocity.z += walkingSpeed * delta;
    if (moveLeft) velocity.x -= walkingSpeed * delta;
    if (moveRight) velocity.x += walkingSpeed * delta;

    controls.getObject().translateX(velocity.x * delta);
    controls.getObject().translateY(velocity.y * delta);
    controls.getObject().translateZ(velocity.z * delta);

    if (controls.getObject().position.y < 10) {
      velocity.y = 0;
      controls.getObject().position.y = 10;
      canJump = true;
    }
  }
}
