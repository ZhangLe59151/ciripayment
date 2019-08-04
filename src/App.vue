<template>
  <div id="app">
    <transition name="slide-fade">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
html,
body,
#app {
  position: relative;
  min-height: 100vh;
}
</style>

<script>
export default {
  created() {}
};
</script>
