import { GAME } from './Class/Game';
import { AmbientLight } from './Class/AmbientLight';
import { SpotLight } from './Class/SpotLight';
import { Person } from './Class/Person';
import CSS3D  from './plugins/CSS3D';
import Terrain from './plugins/Terrain';
import AxisControls from './plugins/AxisControls';
import toggleFullScreen from './utils/fullscreen';
import isMobile from './utils/mobile';

const blocker = document.getElementById('blocker');
const btnFullscreen = document.getElementById('btnFullscreen');
const terrain = new Terrain({
  camera: Person.getNative(),
  geometry: {
    width: 800,
    height: 800
  }
});
const css3d = new CSS3D(GAME.camera.getNative());

css3d.addElement({
  name: 'hello',
  html: '<h1>Hello World</h1>',
  pos: {
    z: -200
  }
});

AmbientLight.addTo(GAME);
SpotLight.addTo(GAME);
terrain.floor.forEach(ground => ground.addTo(GAME));

if (isMobile()) {
    const axis = document.getElementById('axis');
    const controls = new THREE.DeviceOrientationControls( GAME.camera.getNative() );
    const loopControls = new WHS.Loop(() => {
      controls.update();
    });
    const axisControls = new AxisControls(GAME);

    axis.style.display = "inline-block";
    blocker.style.display = "none";
    GAME.addLoop(loopControls);
    GAME.addLoop(axisControls.loop);
    loopControls.start();
    axisControls.loop.start();
} else {
  GAME.add(Person).then(() => {
    const checker2 = new WHS.Loop(() => {
      if (Person.position.y < -200) {
        Person.position.set(0, 100, 0);
        Person.setAngularVelocity(new THREE.Vector3(0, 0, 0));
        Person.setLinearVelocity(new THREE.Vector3(0, 0, 0));
      }
    });

    GAME.addLoop(checker2);

    checker2.start();
  });

  GAME.setControls(
    WHS.firstPersonControls(Person, {
      speed: 10
    })
  );
}

GAME.addLoop(css3d.loop);
GAME.addLoop(terrain.loop);

css3d.loop.start();
terrain.loop.start();

GAME.start();

btnFullscreen.addEventListener('click', () => {
  toggleFullScreen();
});

document.addEventListener('click', function() {
  if (!!document.pointerLockElement) {
    document.exitPointerLock();
  }
});
