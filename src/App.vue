<template>
  <div id="app">
    <!-- use vant transition -->
    <transition :name="transitionStyle">
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
  created() {},
  watch: {
    $route: function(to, from) {
      if (["SIC", "SubSIC", "MCC"].includes(to.name)) {
        this.transitionStyle = "fade";
      } else {
        this.transitionStyle = "van-fade";
      }
    }
  },
  data() {
    return {
      transitionStyle: "van-fade"
    }
  }
};
</script>
