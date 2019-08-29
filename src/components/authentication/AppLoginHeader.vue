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
      iconNav: require("@/assets/imgs/authentication/loginIcon.png")
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
    color: white;
    line-height: 70px;
    font-size: 20px;
  }
  .icon {
    position: absolute;
    left: 116px;
    line-height: 70px;
    font-size: 20px;
    width: 34px;
    height: 34px;
    top: 18px;
  }
  .title {
    position: absolute;
    text-align: center;
    line-height: 70px;
    font-size: 24px;
    color: white;
    width: 100%;
  }
}
</style>
