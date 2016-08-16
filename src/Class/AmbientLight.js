export const AmbientLight = new WHS.AmbientLight({
  light: {
    color: 0xffffff,
    intensity: 0.2
  },
  pos: {
    x: 160, // 100,
    y: 120, // 30,
    z: 160 // 100
  },

  target: {
    x: 0,
    y: 10,
    z: 0
  }
});
