import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import LoadingManager from "./LoadingClass";

class Floor {
  constructor() {
    this.bind();
    this.modelLoader = new GLTFLoader(LoadingManager);
    this.scene;
    this.floor;
  }

  init(scene) {
    this.scene = scene;

    this.modelLoader.load("./assets/models/floor.glb", (glb) => {
      glb.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          this.floor = child;
        }
      });

      this.floor.translateY(-3.3);
      this.floor.scale.multiplyScalar(1.5);
      this.scene.add(this.floor);
    });
  }

  update() {}

  bind() {}
}

const _instance = new Floor();
export default _instance;
