<template>
  <div class="audioButton">
    <button v-if="!playFlag" @click="onPlay">Play</button>
    <button v-else @click="onPause">Pause</button>
  </div>
</template>

<script>
import SoundClass from "../classes/SoundClass";

export default {
  name: "AudioButton",

  data() {
    return {
      initFlag: false,
      playFlag: false,
    };
  },

  methods: {
    onPlay() {
      if (!this.initFlag) {
        SoundClass.init();
        this.initFlag = true;
      }

      if (!this.playFlag) SoundClass.play();
      this.playFlag = true;
    },

    onPause() {
      if (this.playFlag) SoundClass.pause();
      this.playFlag = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.audioButton {
    position: absolute;
    top: 0;
    left: 0;
    button {
        background : red;
        padding: 20px;
        width: 100px;
        height: 50px;
    }
}
</style>
