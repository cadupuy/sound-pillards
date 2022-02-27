import RAF from "../utils/RAF";

class SoundClass {
  constructor(audioUrl) {
    this.ctx;
    this.audio;
    this.audioSource;
    this.analyser;
    this.fdata;
    this.url = audioUrl;
    this.flag;
    this.bind();
  }

  init() {
    this.ctx = new AudioContext();
    this.audio = new Audio(this.url);
    this.audioSource = this.ctx.createMediaElementSource(this.audio);
    this.analyser = this.ctx.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.8;

    this.audioSource.connect(this.analyser);
    this.audioSource.connect(this.ctx.destination);
    this.fdata = new Uint8Array(this.analyser.frequencyBinCount);
  }

  play() {
    this.audio.play();
    this.flag = true;
    RAF.subscribe("audioUpdate", this.update);
  }

  pause() {
    this.audio.pause();
    this.flag = false;
    RAF.unsubscribe("audioUpdate");
  }

  update() {
    this.analyser.getByteFrequencyData(this.fdata);
  }

  bind() {
    this.update = this.update.bind(this);
    this.init = this.init.bind(this);
  }
}

const _instance = new SoundClass("./assets/music.mp3");
export default _instance;
