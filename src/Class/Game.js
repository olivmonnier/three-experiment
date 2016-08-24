export const GAME = new WHS.World({
  stats: 'fps',
  autoresize: true,
  gravity: {
    x: 0,
    y: -100,
    z: 0
  },
  helpers: {
    "grid": true,
    "axis": true
  },
  camera: {
    far: 10000,
    y: 10,
    z: 30
  },
  shadowmap: {
    type: THREE.PCFShadowMap
  },
  physics: {
    fixedTimeStep: 1 / 120
  },
  background: {
    color: 0x7ec0ee
  },
  fog: {
    type: 'regular',
    hex: 0x7ec0ee,
    near: 10,
    far: 300
  }
});
