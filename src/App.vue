<template>
  <div id="app">
    <!-- use vant transition -->
    <transition name="van-fade">
      <router-view :key="$route.fullpath" />
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
