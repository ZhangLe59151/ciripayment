<template>
  <div class="home">
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
  </div>
</template>

<style lang="scss" scoped>
.home {
  text-align: center;

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

  .close {
    text-align: right;
    padding: 10px 10px 0 0;
  }

  .title {
    font-size: 13px;
    padding: 0 20px;
    background-color: #053c5e;
    color: #d8d8d8;
    border: 1px solid #979797;
    vertical-align: middle;
    height: 48px;
    line-height: 48px;
  }

  .tips {
    font-size: 31px;
    padding: 54px 24px 30px;
  }
}
</style>
