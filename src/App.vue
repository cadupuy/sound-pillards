<template>
  <ThreeScene />
  <AudioButton />
  <LoadingScreen />
</template>

<script>
import ThreeScene from "./components/ThreeScene.vue";
import AudioButton from "./components/AudioButton.vue";
import LoadingScreen from "./components/LoadingScreen.vue";

export default {
  name: "App",
  components: {
    ThreeScene,
    AudioButton,
    LoadingScreen,
  },
};
</script>

<style lang="stylus">

@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: 'Dancing Script', cursive;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
</style>
