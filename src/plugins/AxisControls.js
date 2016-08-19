let prevTime = performance.now();
let velocity = new THREE.Vector3();
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

function handlerTouchEvent(world, touch) {
  const el = document.getElementById(touch);
  let timeout;

  el.addEventListener('touchstart', () => {
    switch(touch) {
      case 'axis-up':
        moveForward = true;
        break;
      case 'axis-down':
        moveBackward = true;
        break;
      case 'axis-left':
        moveLeft = true;
        break;
      case 'axis-right':
        moveRight = true;
        break;
    }
  }, false);
  el.addEventListener('touchend', () => {
    switch(touch) {
      case 'axis-up':
        moveForward = false;
        break;
      case 'axis-down':
        moveBackward = false;
        break;
      case 'axis-left':
        moveLeft = false;
        break;
      case 'axis-right':
        moveRight = false;
        break;
    }
  }, false);
}

export default class AxisControls {
  constructor(world) {
    this.loop = this.loopRenderer(world.camera.getNative());
    ['axis-up', 'axis-down', 'axis-left', 'axis-right'].forEach((touch) => {
      handlerTouchEvent(world, touch);
    });
  }
  loopRenderer(camera) {
    return new WHS.Loop(() => {
      let time = performance.now();
      let delta = ( time - prevTime ) / 1000;

      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;

      if ( moveForward ) velocity.z -= 400.0 * delta;
      if ( moveBackward ) velocity.z += 400.0 * delta;

      if ( moveLeft ) velocity.x -= 400.0 * delta;
      if ( moveRight ) velocity.x += 400.0 * delta;

      camera.translateX( velocity.x * delta );
      camera.translateZ( velocity.z * delta );

      prevTime = time;
    });
  }
}
