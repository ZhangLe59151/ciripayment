<template>
  <div class="app-login-header">
    <div class="title">
      <img
        class="icon"
        :src="require('@/assets/imgs/authentication/loginIcon.png')"
      />{{ title }}
    </div>
    <van-icon
      name="arrow-left"
      class="arrow-left"
      @click="$router.back()"
      v-if="showLeftIcon"
    />

  </div>
</template>

<script>
export default {
  name: "AppLoginHeader",
  props: {
    title: {
      default: ""
    },
    showLeftIcon: {
      default: true
    }
  },
  data() {
    return {};
  },
  methods: {}
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
    // position: absolute;
    position: relative;
    right: 10px;
    top: 10px;
    font-size: 20px;
    width: 34px;
    height: 34px;
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
