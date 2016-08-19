function handlerTouchEvent(world, touch) {
  let {el, axis, speed} = touch;
  let timeout;

  el.addEventListener('touchstart', () => {
    timeout = setInterval(function() {
      world.camera.getNative()[axis](speed);
      world.camera.getNative().updateProjectionMatrix();
    }, 100);
  });
  el.addEventListener('touchend', () => {
    clearInterval(timeout);
  });
}

export default function AxisControls(world) {
  [
    {el: document.getElementById('axis-up'), axis: 'translateZ', speed: -0.5},
    {el: document.getElementById('axis-down'), axis: 'translateZ', speed: 0.5},
    {el: document.getElementById('axis-left'), axis: 'translateX', speed: -0.5},
    {el: document.getElementById('axis-right'), axis: 'translateX', speed: 0.5}
  ].forEach((touch) => {
    handlerTouchEvent(world, touch);
  });
}
