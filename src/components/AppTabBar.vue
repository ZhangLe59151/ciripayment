<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">Home</van-tabbar-item>
    <van-tabbar-item icon="search">Records</van-tabbar-item>
    <van-tabbar-item icon="friends-o">Services</van-tabbar-item>
    <van-tabbar-item icon="setting-o">Profile</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: "AppTabBar",

  data() {
    return {
      active: 0
    };
  }
};
</script>


<style lang="scss" scoped>
.van-tabbar {
  height: 64px;
}

.van-tabbar-item {
  font-size: 12px;
  color: #a0b4c0;
  letter-spacing: 0;
  line-height: 20px;
  &.van-tabbar-item--active {
    color: #053c5e;
  }
}
</style>

