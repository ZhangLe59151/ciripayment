<template>
  <van-tabbar
    v-model="currentTabbar"
    class="app-tabbar"
  >
    <van-tabbar-item
      :class="item.class"
      replace
      :to="item.to"
      v-for="item in tabbar"
      :key="item.label"
    >
      {{item.label}}
    </van-tabbar-item>

  </van-tabbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppTabBar",

  props: {
    active: {
      default: 0,
      type: Number
    }
  },

  data() {
    return {};
  },
  computed: {
    ...mapState({
      tabbar: state => state.Config.tabbar
    }),
    currentTabbar: {
      get() {
        return this.active;
      },

      set(val) {}
    }
  }
};
</script>

<style lang="scss" >
.app-tabbar {
  .van-tabbar-item {
    font-size: 18px;
    color: #a0b4c0;
    letter-spacing: 0;
    line-height: 20px;
    &.van-tabbar-item--active {
      color: #FF8600;
    }

    .van-tabbar-item__text {
      font-size: 10px;
    }

    .van-tabbar-item__icon {
      margin-bottom: 0;
    }
  }
}
</style>
