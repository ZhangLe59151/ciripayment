<template>
  <div class="app-home-header">
    <div class="title">
      <!-- it decided by applcation status -->
      Welcome
    </div>

    <div
      class="icon"
      v-if="$store.state.deviceType === 'APP'"
    >

      <template v-if="canClick">
        <i
          class="iconfont iconQR"
          @click="$router.push({name: 'Qrcode'})"
        />
        <i
          class="iconfont iconscan"
          @click="$router.push({name: 'Scan'})"
        />
      </template>

      <template v-else>
        <i class="iconfont iconQR" />
        <i class="iconfont iconscan" />
      </template>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    canClick: {
      default: true,
      type: Boolean
    }
  },
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

.app-home-header {
  background: #FF8600;
  height: 130px;
  width: 100%;
  position: relative;
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
