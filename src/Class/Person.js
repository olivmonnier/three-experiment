export const Person = new WHS.Sphere({
  geometry: {
    radius: 2
  },
  mass: 10,
  physics: {
    friction: 1,
    restitution: 0
  },
  material: {
    color: 0xffffff,
    kind: 'lambert',
    rest: 0,
    fri: 1
  },
  pos: {
    x: 0,
    y: 100,
    z: 0
  }
});
