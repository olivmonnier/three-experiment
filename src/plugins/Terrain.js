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
    const camPos = params.camera.position;
    const floor = [
      Ground(camPos.x, 0, camPos.z, params.tileWidth, params.tileHeight),
      Ground(camPos.x + params.tileWidth, 0, camPos.z, params.tileWidth, params.tileHeight),
      Ground(camPos.x, 0, camPos.z + params.tileHeight, params.tileWidth, params.tileHeight),
      Ground(camPos.x + params.tileWidth, 0, camPos.z + params.tileHeight, params.tileWidth, params.tileHeight)
    ];
    const loop = this.loop(floor, params.camera, params.tileWidth, params.tileHeight);

    return {
      floor,
      loop
    }
  }
  loop(floor, camera, tileWidth, tileHeight) {
    return new WHS.Loop(() => {
      floor.forEach((f) => {
        let fpos = f._native.position;

        if ((fpos.x - tileWidth) > camera.position.x) {
          fpos.x -= tileWidth * 2;
        } else if ((fpos.x + tileWidth) < camera.position.x) {
          fpos.x += tileWidth * 2;
        } else if ((fpos.z - tileHeight) > camera.position.z) {
          fpos.z -= tileHeight * 2;
        } else if ((fpos.z + tileHeight) < camera.position.z) {
          fpos.z += tileHeight * 2;
        }
      });
    });
  }
}
