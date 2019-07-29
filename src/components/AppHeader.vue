<template>
  <van-nav-bar :border="false">
    <div
      slot="title"
      class="header-title"
    >
      <img
        src="../assets/imgs/bank.png"
        class="header-title-img"
      >
      <span>ABC BANK</span>
    </div>
  </van-nav-bar>
</template>

<style lang="scss" scoped>
.header-title {
  box-shadow: 0 3px 8px -4px rgba(0, 0, 0, 0.25);
  .header-title-img {
    width: 20px;
  }
  span {
    font-size: 12px;
    position: relative;
    top: -4px;
    left: 2px;
  }
}
</style>
