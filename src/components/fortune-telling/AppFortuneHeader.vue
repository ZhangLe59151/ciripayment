<template>
  <div class="app-fortune-header">
    <div class="title">{{title}}</div>
    <van-icon
      name="arrow-left"
      class="arrow-left"
      @click="$router.back()"
      v-if="showKLeftIcon"
    />
    <van-icon
      name="cross"
      class="close"
      @click="returnHome"
      v-if="showRightIcon"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: "Daily Fortune"
    },
    showRightIcon: {
      default: true
    },
    showKLeftIcon: {
      default: false
    }
  },
  methods: {
    returnHome() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-fortune-header {
  height: 70px;
  position: relative;

  .arrow-left {
    position: absolute;
    left: 16px;
    color: white;
    line-height: 70px;
    font-size: 20px;
  }
  .close {
    position: absolute;
    right: 16px;
    color: white;
    line-height: 70px;
    font-size: 20px;
  }
  .title {
    position: absolute;
    text-align: center;
    line-height: 70px;
    font-weight: bold;
    font-size: 24px;
    color: white;
    width: 100%;
  }
}
</style>
