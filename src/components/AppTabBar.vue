<template>
  <van-tabbar
    v-model="active"
    class="app-tabbar"
  >
    <van-tabbar-item
      :class="item.class"
      replace
      :to="item.to"
      v-for="item in tabbarList"
      :key="item.label"
    >
      {{item.label}}
    </van-tabbar-item>

  </van-tabbar>
</template>

<script>
export default {
  name: "AppTabBar",
  props: ["activeMenu"],

  data() {
    return {
      active: this.activeMenu || 0,
      tabbarList: [
        {
          to: "/home",
          class: "iconfont iconhome",
          label: "Home"
        },
        {
          to: "/records",
          class: "iconfont iconrecords",
          label: "Records"
        },
        {
          to: "/services",
          class: "iconfont iconservices",
          label: "Services"
        },
        {
          to: "/settings",
          class: "iconfont iconsetting",
          label: "Settings"
        }
      ]
    };
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
      color: #053c5e;
    }

    .van-tabbar-item__text {
      font-size: 12px;
    }
  }
  &.van-tabbar {
    height: 64px;
  }
}
</style>

