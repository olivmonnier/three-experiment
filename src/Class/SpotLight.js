export const SpotLight = new WHS.SpotLight({
  light: {
    color: 0xffffff,
    intensity: 0.3,
    distance: 500
  },
  shadowmap: {
    width: 2048,
    height: 2048,
    top: 0,
    fov: 90
  },
  pos: {
    x: 160,
    y: 120,
    z: 160
  },
  target: {
    x: 0,
    y: 10,
    z: 0
  }
});
