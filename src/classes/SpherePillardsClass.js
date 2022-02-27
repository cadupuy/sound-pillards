import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import SoundClass from "./SoundClass";
import myGui from "../utils/MyGUI";
import LoadingManager from "./LoadingClass";

class SpherePillardsClass {
  constructor() {
    this.bind();
    this.modelLoader = new GLTFLoader(LoadingManager);
    this.textureLoader = new THREE.TextureLoader();
    this.upVec = new THREE.Vector3(0, 1, 0);
    this.pillard = null;
    this.pillards = new THREE.Group();
    this.scene = null;
    this.gMatCap = null;
    this.bMatCap = null;
    this.params = {
      waveSpeed: 1,
      subDiv: 3,
      pillardSize: 0.2,
    };
  }

  init(scene) {
    this.scene = scene;

    const gTexture = this.textureLoader.load("./assets/textures/grayMetal.png");
    const bTexture = this.textureLoader.load("./assets/textures/blackMetal.png");

    this.gMatCap = new THREE.MeshMatcapMaterial({ matcap: gTexture });
    this.bMatCap = new THREE.MeshMatcapMaterial({ matcap: bTexture });
    this.modelLoader.load("./assets/models/pillard.glb", (glb) => {
      glb.scene.traverse((child) => {
        if (child.name === "BASE") {
          this.pillard = child;
          child.material = this.bMatCap;
        }
        if (child.name === "Cylinder") {
          child.material = this.gMatCap;
        }
      });

      this.computePositions();
    });

    const sphereFolder = myGui.addFolder("Sphere Pillards");
    sphereFolder.add(this.params, "waveSpeed", 0.1, 3).name("Wave Speed");
    sphereFolder
      .add(this.params, "subDiv", 1, 5)
      .step(1)
      .name("Ico Subdivisions")
      .onChange(this.computePositions);

    sphereFolder
      .add(this.params, "pillardSize", 0.1, 0.3)
      .name("Pill Size")
      .onChange(this.computePositions);
  }

  computePositions() {
    let ico;
    this.scene.traverse((child) => {
      if (child.name === "ico") {
        ico = child;
      }
    });

    if (ico) this.scene.remove(ico);

    // SPHERE
    const sphereGeometry = new THREE.IcosahedronBufferGeometry(2, this.params.subDiv);
    const sphereMaterial = this.gMatCap;
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.name = "ico";
    this.scene.add(sphere);

    this.pillards.clear();

    // PILLARDS
    const verticesArray = [];
    for (let i = 0; i < sphereGeometry.attributes.position.array.length; i += 3) {
      const x = sphereGeometry.attributes.position.array[i];
      const y = sphereGeometry.attributes.position.array[i + 1];
      const z = sphereGeometry.attributes.position.array[i + 2];

      verticesArray.push({
        x: x,
        y: y,
        z: z,
      });
    }

    let pillardPosition = [];
    for (let i = 0; i < verticesArray.length; i++) {
      let existFlag = false;
      for (let j = 0; j < pillardPosition.length; j++) {
        if (
          pillardPosition[j].x === verticesArray[i].x &&
          pillardPosition[j].y === verticesArray[i].y &&
          pillardPosition[j].z === verticesArray[i].z
        )
          existFlag = !existFlag;
      }

      if (!existFlag) {
        pillardPosition.push({ x: verticesArray[i].x, y: verticesArray[i].y, z: verticesArray[i].z });

        const clone = this.pillard.clone();
        const posVec = new THREE.Vector3(verticesArray[i].x, verticesArray[i].y, verticesArray[i].z);
        clone.position.copy(posVec);
        clone.scale.multiplyScalar(this.params.pillardSize);
        clone.quaternion.setFromUnitVectors(this.upVec, posVec.normalize());
        this.pillards.add(clone);
      }
    }
    this.scene.add(this.pillards);
    this.scene.add(sphere);
  }

  update() {
    if (SoundClass.flag) {
      let count = 0;

      while (count < this.pillards.children.length) {
        this.pillards.children[count].children[0].position.y = (SoundClass.fdata[count] / 255) * 4;

        count++;
      }
    } else {
      let count = 0;

      while (count < this.pillards.children.length) {
        this.pillards.children[count].children[0].position.y =
          (Math.sin(Date.now() * 0.006 * this.params.waveSpeed + this.pillards.children[count].position.z) + 1) * 1.5;

        count++;
      }
    }
  }

  bind() {
    this.computePositions = this.computePositions.bind(this);
  }
}

const _instance = new SpherePillardsClass();
export default _instance;
