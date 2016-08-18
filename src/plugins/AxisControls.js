let timeout;
let velocity = new THREE.Vector3();

export default function AxisControls(world) {
  const axisUp = document.getElementById('axis-up');
  const axisDown = document.getElementById('axis-down');
  const axisLeft = document.getElementById('axis-left');
  const axisRight = document.getElementById('axis-right');

  axisUp.addEventListener('touchstart', () => {
    timeout = setInterval(function() {
      velocity.z -= 0.3
      world.controls.getObject().translateZ(velocity.z);
      // world.camera._native.position.z -= 0.3;
      // world.camera._native.updateProjectionMatrix();
    }, 100);
  });
  axisUp.addEventListener('touchend', () => {
    clearInterval(timeout);
  });

  axisDown.addEventListener('touchstart', () => {
    timeout = setInterval(function() {
      velocity.z += 0.3
      world.controls.getObject().translateZ(velocity.z);
      // world.camera._native.position.z += 0.3;
      // world.camera._native.updateProjectionMatrix();
    }, 100);
  });
  axisDown.addEventListener('touchend', () => {
    clearInterval(timeout);
  });

  axisLeft.addEventListener('touchstart', () => {
    timeout = setInterval(function() {
      world.camera._native.position.x -= 0.3;
      world.camera._native.updateProjectionMatrix();
    }, 100);
  });
  axisLeft.addEventListener('touchend', () => {
    clearInterval(timeout);
  });

  axisRight.addEventListener('touchstart', () => {
    timeout = setInterval(function() {
      world.camera._native.position.x += 0.3;
      world.camera._native.updateProjectionMatrix();
    }, 100);
  });
  axisRight.addEventListener('touchend', () => {
    clearInterval(timeout);
  });
}
