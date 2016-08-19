function Ground(x, y, z, geometry) {
  return new WHS.Plane({
    geometry: {
      width: geometry.width,
      height: geometry.height
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
export default class Terrain {
  constructor(params) {
    const camPos = params.camera.position;
    const floor = [
      Ground(camPos.x, 0, camPos.z, params.geometry),
      Ground(camPos.x + params.geometry.width, 0, camPos.z, params.geometry),
      Ground(camPos.x, 0, camPos.z + params.geometry.height, params.geometry),
      Ground(camPos.x + params.geometry.width, 0, camPos.z + params.geometry.height, params.geometry)
    ];
    const loop = this.loop(floor, params.camera, params.geometry);

    return {
      floor,
      loop
    }
  }
  loop(floor, camera, geometry) {
    return new WHS.Loop(() => {
      floor.forEach((f) => {
        let fpos = f.getNative().position;

        if ((fpos.x - geometry.width) > camera.position.x) {
          fpos.x -= geometry.width * 2;
        } else if ((fpos.x + geometry.width) < camera.position.x) {
          fpos.x += geometry.width * 2;
        } else if ((fpos.z - geometry.height) > camera.position.z) {
          fpos.z -= geometry.height * 2;
        } else if ((fpos.z + geometry.height) < camera.position.z) {
          fpos.z += geometry.height * 2;
        }
      });
    });
  }
}
