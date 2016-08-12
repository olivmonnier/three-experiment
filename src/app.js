import { GAME } from './Class/Game';
import { Plane } from './Class/Plane';
import { AmbientLight } from './Class/AmbientLight';
import { SpotLight } from './Class/SpotLight';
import { Person } from './Class/Person';
import { CSS3D } from './Plugins/CSS3D';

let element, div, scene2, renderer2;

Plane.addTo(GAME);
AmbientLight.addTo(GAME);
SpotLight.addTo(GAME);

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
    speed: 5
  })
);

const css3d = new CSS3D({
  camera: GAME.camera._native,
  html: '<a href="#">Hello World</a>',
  pos: {
    z: -200
  }
});

GAME.addLoop(css3d.loop);

css3d.loop.start();

GAME.start();
