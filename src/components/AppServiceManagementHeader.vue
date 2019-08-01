<template>
  <div class="app-service-management-header">
    <div class="title">
      <img :src="backIcon" alt style="margin-right: 10px"  @click="$router.back()">
      Manage {{serviceType}}
    </div>
  </div>

</template>

<script>
export default {
  name: "AppServiceManagementHeader",
  props: {
    serviceType: String
  },
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

  .app-service-management-header {
    background: #053c5e;
    height: 68px;
    width: 100%;
    position: relative;

    .title {
      @include item-position;
      left: 16px;
    }
  }

</style>
