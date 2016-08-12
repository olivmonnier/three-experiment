export class CSS3D {
  constructor(params) {
    const scene = new THREE.Scene();
    const el = this.createElement(params.html, params.pos || {}, params.rot || {});
    const renderer = this.buildRenderer();
    const loop = this.loop(params.camera, scene, renderer);

    scene.add(el);

    return {
      scene,
      renderer,
      loop
    }
  }
  createElement(htmlString, pos, rot) {
    const element = document.createElement('div');
    element.innerHTML = htmlString;
    element.className = 'three-div';

    const div = new THREE.CSS3DObject(element);
    div.position.x = pos.x || 0;
    div.position.y = pos.y || 0;
    div.position.z = pos.z || 0;
    div.rotation.x = rot.x || 0;
    div.rotation.y = rot.y || 0;
    div.rotation.z = rot.z || 0;

    return div;
  }
  buildRenderer() {
    const renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    renderer.domElement.style.bottom = 0;
    document.body.appendChild(renderer.domElement);

    return renderer;
  }
  loop(camera, scene, renderer) {

    const loopRenderer = new WHS.Loop(() => {
      renderer.render(scene, camera);
    });

    return loopRenderer;
  }
}
