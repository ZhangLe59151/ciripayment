<template>
  <div class="app-setting-header">
    <div class="title">
      Welcome
    </div>
  </div>
</template>

<script>
export default {
  name: "AppSettingHeader"
}
</script>

<style lang="scss" scoped>
  @mixin item-position {
    position: absolute;
    top: 24px;
    font-size: 20px;
    line-height: 32px;
    color: #ffffff;
    display: inline-block;
  }

  .app-setting-header {
    background: #053c5e;
    height: 80px;
    width: 100%;
    position: relative;

    .title {
      @include item-position;
      left: 16px;
    }
  }
</style>
