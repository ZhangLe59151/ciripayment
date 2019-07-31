<template>
  <div class="app-setting-profile-header">
    <div class="title">
      <img :src="backIcon" alt style="margin-right: 10px"  @click="$router.back()">
      Profile
    </div>
  </div>

</template>

<script>
export default {
  name: "AppSettingProfileHeader",
  data() {
    return {
      backIcon: require("@/assets/imgs/back.svg")
    }
  }
}
</script>

<style lang="scss" scoped>
  @mixin item-position {
    position: absolute;
    top: 24px;
    font-size: 20px;
    color: #ffffff;
    display: inline-block;
  }

  .app-setting-profile-header {
    background: #053c5e;
    height: 130px;
    width: 100%;
    position: relative;

    .title {
      @include item-position;
      left: 16px;
    }
  }

</style>
