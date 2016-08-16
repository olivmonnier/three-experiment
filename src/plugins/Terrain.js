function Ground(x, y, z, tileWidth, tileHeight) {
  return new WHS.Plane({
    geometry: {
      width: tileWidth,
      height: tileHeight
    },
    mass: 0,
    material: {
      color: 0xCDBF81,//0x5566aa,
      kind: 'basic'
    },
    pos: {
      x,
      y,
      z
    },
    rot: {
      x: -Math.PI / 2
    }
  });
}
export class Terrain {
  constructor(params) {
    const floor = [
      Ground(0, 0, 0, params.tileWidth, params.tileHeight),
      Ground(0, 0, params.tileHeight, params.tileWidth, params.tileHeight)
    ];
    const loop = this.loop(floor, params.camera);

    return {
      floor,
      loop
    }
  }
  loop(camera) {
    return new WHS.Loop(() => {
    });
  }
}
