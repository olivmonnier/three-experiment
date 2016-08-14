export const Plane = new WHS.Plane({
  geometry: {
    width: 1024,
    height: 1024
  },
  mass: 0,
  material: {
    color: 0xCDBF81,//0x5566aa,
    kind: 'basic'
  },
  pos: {
    x: 0,
    y: 0,
    z: 0
  },
  rot: {
    x: -Math.PI / 2
  }
});
