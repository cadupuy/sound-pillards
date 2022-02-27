import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import RAF from "../utils/RAF";
import config from "../utils/config";
import MyGUI from "../utils/MyGUI";

import SpherePillards from "./SpherePillardsClass";
import Particles from "./ParticlesClass";
import Floor from "./FloorClass";
import Parallax from "./ParallaxClass";
import Spectrum from "./SpectrumClass";

import spectrumFrag from "../shaders/spectrum.frag";
import spectrumVert from "../shaders/spectrum.vert";

class MainThreeScene {
  constructor() {
    this.bind();
    this.camera;
    this.scene;
    this.renderer;
    this.controls;
  }

  init(container) {
    //RENDERER SETUP
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.debug.checkShaderErrors = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(this.renderer.domElement);

    const color = new THREE.Color(0x151515);
    const fog = new THREE.Fog(color, 5, 20);

    //MAIN SCENE INSTANCE
    this.scene = new THREE.Scene();
    this.scene.background = color;
    this.scene.fog = fog;
    //CAMERA AND ORBIT CONTROLLER
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 8);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = config.controls;
    this.controls.maxDistance = 20;
    this.controls.minDistance = 3;
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.2;

    //DUMMY CUBE + SIMPLE GLSL SHADER LINKAGE
    const shaderMat = new THREE.ShaderMaterial({
      vertexShader: spectrumFrag,
      fragmentShader: spectrumVert,
    });

    SpherePillards.init(this.scene);
    Floor.init(this.scene);
    Particles.init(this.scene);
    Spectrum.init(this.scene);
    Parallax.init(this.camera);

    MyGUI.hide();
    if (config.myGui) MyGUI.show();

    const camFolder = MyGUI.addFolder("Camera Folder");
    camFolder.open();
    camFolder
      .add(this.controls, "enabled")
      .onChange(() => {
        if (this.controls.enabled) Parallax.active = false;
      })
      .listen()
      .name("Orbit Controls");
    camFolder
      .add(Parallax, "active")
      .onChange(() => {
        if (Parallax.active) this.controls.enabled = false;
      })
      .listen()
      .name("Cam Parallax");

    camFolder.add(Parallax.params, "intensity", 0.001, 0.01).name("Intensity");
    camFolder.add(Parallax.params, "ease", 0.01, 0.1).name("Ease");

    //RENDER LOOP AND WINDOW SIZE UPDATER SETUP
    window.addEventListener("resize", this.resizeCanvas);
    RAF.subscribe("threeSceneUpdate", this.update);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
    this.scene.rotateY(0.002);
    SpherePillards.update();
    Particles.update();
    Parallax.update();
    Spectrum.update();
  }

  resizeCanvas() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  bind() {
    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.update = this.update.bind(this);
    this.init = this.init.bind(this);
  }
}

const _instance = new MainThreeScene();
export default _instance;
