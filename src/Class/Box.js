export const Box = new WHS.Box({
  geometry: {
    width: 10,
    height: 10,
    depth: 10
  },

  mass: 1,

  softbody: false,

  material: {
    kind: 'basic',
    color: 0xffffff
  },

  pos: {
    x: 50,
    y: 0,
    z: 60
  }
});
