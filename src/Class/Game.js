export const GAME = new WHS.World({
  stats: 'fps',
  autoresize: true,
  gravity: {
    x: 0,
    y: -100,
    z: 0
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
    color: 0x70DBFF
  },
  fog: {
    type: 'regular',
    far: 200
  }
});
