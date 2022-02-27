import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import LoadingManager from "./LoadingClass";
import MyGUI from "../utils/MyGUI";

import spectrumFrag from "../shaders/spectrum.frag";
import spectrumVert from "../shaders/spectrum.vert";

class Example {
  constructor() {
    this.bind();
    this.modelLoader = new GLTFLoader(LoadingManager);
    this.textureLoader = new THREE.TextureLoader();
  }

  init(scene) {
    this.scene = scene;

    this.uniforms = {
      uMatCap: {
        value: this.textureLoader.load("./assets/textures/blackMetal.png"),
      },

      uSpecterSize: {
        value: 0.6,
      },
      uWaveBorder: {
        value: 0.2,
      },
      uWaveSpeed: {
        value: 0.7,
      },
      uBorderColor: {
        value: new THREE.Color("hsl(287, 80%, 80%)"),
      },
      uTime: {
        value: 0,
      },
    };

    const shaderFolder = MyGUI.addFolder("Spectrum Folder");
    shaderFolder.open();
    shaderFolder.add(this.uniforms.uSpecterSize, "value", -1, 1).name("Spectrum Size");
    shaderFolder.add(this.uniforms.uWaveBorder, "value", 0, 1).name("Border Size");
    shaderFolder.add(this.uniforms.uWaveSpeed, "value", 0, 1).name("Wave speed");

    this.shaderMarerial = new THREE.ShaderMaterial({
      fragmentShader: spectrumFrag,
      vertexShader: spectrumVert,
      uniforms: this.uniforms,
      transparent: true,
    });

    this.modelLoader.load("./assets/models/spectrum.glb", (glb) => {
      glb.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = this.shaderMarerial;
          child.scale.multiplyScalar(2.7);
          child.position.y = -3;
        }
      });

      this.scene.add(glb.scene);
    });
  }

  update() {
    this.uniforms.uTime.value += 0.2;
  }

  bind() {}
}

const _instance = new Example();
export default _instance;
