import { GAME } from './Class/Game';
import { AmbientLight } from './Class/AmbientLight';
import { SpotLight } from './Class/SpotLight';
import { Person } from './Class/Person';
import CSS3D  from './Plugins/CSS3D';
import Terrain from './Plugins/Terrain';

const terrain = new Terrain({
  camera: Person._native,
  geometry: {
    width: 800,
    height: 800
  }
});
const css3d = new CSS3D(GAME.camera._native);

css3d.addElement({
  name: 'hello',
  html: '<a href="#">Hello World</a>',
  pos: {
    z: -200
  }
});

AmbientLight.addTo(GAME);
SpotLight.addTo(GAME);
terrain.floor.forEach(ground => ground.addTo(GAME));

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    const controls = new THREE.DeviceOrientationControls( GAME.camera._native );
    const loopControls = new WHS.Loop(() => {
      controls.update();
    });
    const blocker = document.getElementById('blocker');

    blocker.style.display = "none";
    GAME.addLoop(loopControls);
    loopControls.start();
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

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}

document.addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    toggleFullScreen();
  }
}, false);

document.addEventListener('click', () => {
  css3d.removeElement('hello');
});
