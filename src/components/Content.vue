<template>
  <section class="content__container">
    <div class="title__container">
      <h2>
        Sound Pillards.
      </h2>

      <p>An audio visualization experience in WebGL</p>
    </div>

    <div class="bottom__container">
      <div class="left__container">
        <p>Modeling and coding by <span class="developer">Charles-Antoine Dupuy</span></p>
      </div>
      <div class="right__container">
        <p class="music__title">Music by <span class="music__artist">Daft Punk</span></p>
        <p>One More Time</p>
        <div class="audioButton">
          <button v-if="!playFlag" @click="onPlay">Play</button>
          <button v-else @click="onPause">Pause</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SoundClass from "../classes/SoundClass";

export default {
  name: "Content",

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

.content__container {
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  padding: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


.tile__container {
  text-align: left
}

.bottom__container {
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
}

.left__container {
  display: flex;
  flex-direction: column;
}

.right__container {
  display: flex;
  flex-direction: column;
    text-align: right;

}

h2 {
  font-size: 4em;
}

.music__title {
  font-weight: bold;
  font-size: 2em;
}

.music__artist,
.developer {
  text-decoration: underline;
}

.audioButton {
    button {
        background : #bc13fe;
        border-radius: 200px;
        padding: 10px 30px;
        width: 100px;
        height: 50px;
        color: white;
        margin: auto;
        font-weight: bold;
        text-transform: uppercase;
        margin-top: 10px;
        border: none;
        cursor: pointer;
    }
}
</style>
