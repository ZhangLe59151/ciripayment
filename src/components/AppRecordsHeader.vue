<template>
  <div class="app-records-header">
    <div class="title">
      <!-- it decided by application status -->
      Records
    </div>

    <div
      class="icon"
      v-if="$store.state.deviceType === 'APP'"
    >

      <i
        class="iconfont iconQR"
        @click="$router.push({name: 'Qrcode'})"
      />
      <i
        class="iconfont iconscan"
        @click="$router.push({name: 'Scan'})"
      />

    </div>
  </div>
</template>

<script>
export default {
  name: "AppRecordsHeader",
  props: {},
  methods: {
    handleClick() {
      this.$emit("ShowPopup");
    }
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

.app-records-header {
  background: #FF8600;
  height: 68px;
  width: 100%;

  .title {
    @include item-position;
    left: 16px;
  }

  .icon {
    @include item-position;
    right: 16px;
    font-size: 24px;
    i {
      font-size: 24px;
      &:last-child {
        margin-left: 20px;
      }
    }
  }
}
</style>
