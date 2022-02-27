<template>
  <div class="loadingScreen" ref="loadingScreen">
    <div>Loading : {{ progress }}%</div>
    <div>{{ progressUrl }}</div>
  </div>
</template>

<script>
import LoadingClass from "../classes/LoadingClass";
export default {
  name: "LoadingScreen",
  data() {
    return {
      progress: 0,
      progressUrl: "",
    };
  },

  mounted() {
    LoadingClass.onProgress = this.onProgress;
    LoadingClass.onLoad = this.onLoad;
  },

  methods: {
    onProgress(url, loaded, total) {
      this.progressUrl = url;
      this.progress = (loaded / total) * 100;
    },

    onLoad() {
      this.$refs.loadingScreen.classList.add("finished");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.loadingScreen {
    width: 100vw;
    height: 100vh;
    background: #151515
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2
    color: white;
    font-size: 2em;
    transition : opacity 0.5s;

    &.finished {
        opacity : 0;
        pointer-events: none;
    }
}
</style>
