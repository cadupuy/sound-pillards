<template>
  <ThreeScene />
  <Content />
  <LoadingScreen />
</template>

<script>
import ThreeScene from "./components/ThreeScene.vue";
import Content from "./components/Content.vue";
import LoadingScreen from "./components/LoadingScreen.vue";

export default {
  name: "App",
  components: {
    ThreeScene,
    Content,
    LoadingScreen,
  },
};
</script>

<style lang="stylus">

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap')

body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    }

* {
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
</style>
