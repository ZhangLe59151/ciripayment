<template>
  <div class="app-fortune-header">
    <div class="title">Daily Fortune</div>
    <van-icon name="cross" class="close" @click="returnHome" size="20px"></van-icon>
  </div>
</template>

<script>
export default {
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
    .close {
      position: absolute;
      right: 16px;
      color: white;
      line-height: 70px;
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
