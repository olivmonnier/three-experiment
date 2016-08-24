function Ground(x, y, z, geometry) {
  let texture = WHS.texture('img/hexagon.jpg');
  texture.repeat.set(4, 4);

  return new WHS.Plane({
    geometry: {
      width: geometry.width,
      height: geometry.height
    },
    mass: 0,
    material: {
      kind: 'lambert',
      map: texture
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
    const camPos = params.camera.getNative().position;
    this.floor = [
      Ground(camPos.x, 0, camPos.z, params.geometry),
      Ground(camPos.x + params.geometry.width, 0, camPos.z, params.geometry),
      Ground(camPos.x, 0, camPos.z + params.geometry.height, params.geometry),
      Ground(camPos.x + params.geometry.width, 0, camPos.z + params.geometry.height, params.geometry)
    ];
    this.loop = this.loopRenderer(this.floor, params.camera.getNative(), params.geometry);
  }
  loopRenderer(floor, camera, geometry) {
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
