<template>
  <div class="app-login-header">
    <div class="title">{{ title }}</div>
    <van-icon
      name="arrow-left"
      class="arrow-left"
      @click="$router.back()"
      v-if="showKLeftIcon"
    />
    <img class="icon" :src="iconNav" />
  </div>
</template>

<script>
export default {
  name: "AppLoginHeader",
  props: {
    title: {
      default: "Login"
    },
    showKLeftIcon: {
      default: true
    }
  },
  data() {
    return {
      iconNav: require("@/assets/imgs/authentication/group6.png")
    };
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.app-login-header {
  height: 70px;
  position: relative;

  .arrow-left {
    position: absolute;
    left: 16px;
    color: black;
    line-height: 70px;
    font-size: 20px;
  }
  .icon {
    position: absolute;
    left: 66px;
    line-height: 70px;
    font-size: 20px;
    width: 58px;
    height: 32px;
    top: 20px;
  }
  .title {
    position: absolute;
    text-align: center;
    line-height: 70px;
    font-size: 24px;
    color: black;
    width: 100%;
  }
}
</style>
