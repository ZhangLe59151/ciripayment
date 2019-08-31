<template>
  <div class="app-profile-select-bank-header">
    <div class="title">
      <img
        :src="backIcon"
        style="margin-right: 10px"
        @click="$router.back()"
      >
      {{title}}
    </div>
  </div>

</template>

<script>
export default {
  name: "AppProfileSelectBankHeader",
  props: {
    title: {
      default: "Select Bank",
      type: String
    }
  },
  data() {
    return {
      backIcon: require("@/assets/imgs/back.svg")
    };
  }
};
</script>

<style lang="scss" scoped>
@mixin item-position {
  position: absolute;
  top: 24px;
  font-size: 20px;
  color: #ffffff;
  display: inline-block;
}

.app-profile-select-bank-header {
  background: #ffa702;
  height: 68px;
  width: 100%;
  position: relative;

  .title {
    @include item-position;
    left: 16px;
  }
}
</style>
