export default class CSS3D {
  constructor(camera) {
    this.camera = camera;
    this.scene = new THREE.Scene();
    this.renderer = this.buildRenderer();
    this.loop = this.loopRenderer();

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }, false);
  }
  addElement(params = {}) {
    const element = document.createElement('div');
    element.innerHTML = params.html;
    element.className = 'three-div';

    if (params.geometry) {
      element.style.width = params.geometry.width || 'auto';
      element.style.height = params.geometry.height || 'auto';
    }

    const div = new THREE.CSS3DObject(element);

    if (params.pos) {
      div.position.x = params.pos.x || 0;
      div.position.y = params.pos.y || 0;
      div.position.z = params.pos.z || 0;
    }

    if (params.rot) {
      div.rotation.x = params.rot.x || 0;
      div.rotation.y = params.rot.y || 0;
      div.rotation.z = params.rot.z || 0;
    }

    this.scene.add(div);

    return this;
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
  loopRenderer() {
    const self = this;
    return new WHS.Loop(() => {
      self.renderer.render(self.scene, self.camera);
    });
  }
}
